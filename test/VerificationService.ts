import { Signer } from 'ethers';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { VerificationService } from '../../typechain-types/contracts/VerificationService';
import { ReputationService } from '../../typechain-types/contracts/ReputationService';

describe("VerificationService", function () {
  let owner: Signer;
  let reputationService: ReputationService;
  let verificationService: VerificationService;

  let ageVerificator: string;
  let devVerificator1: string;
  let devVerificator2: string;
  let devVerificator3: string;
  let singVerificator: string;
  let user: string;

  const ageDomain = {
    name: 'AGE',
    scaleLow: 0,
    scaleHigh: 1,
    threshold: 1,
    defaultDecision: 0,
    quorum: 1,
    reward: 7
  }

  const devDomain = {
    name: 'Developer.Angular',
    scaleLow: 0,
    scaleHigh: 100,
    threshold: 75,
    defaulDecision: 75,
    quorum: 3,
    reward: 20
  }

  const singDomain = {
    name: 'Singing',
    scaleLow: 1,
    scaleHigh: 5,
    threshold: 3,
    defaulDecision: 4,
    quorum: 5,
    reward: 20
  }

  let verficationRequestId;

  // VR lifecycle: OPEN => CONFIRMED (has enough confirmations) => SECCEED (mint NFT) | REJECTED (void)
  beforeEach("Before each", async () => {
    const [owner, acc1, acc2, acc3, acc4, acc5, acc6] = await ethers.getSigners();
    ageVerificator = await acc1.getAddress();
    devVerificator1 = await acc2.getAddress();
    devVerificator2 = await acc3.getAddress();
    devVerificator3 = await acc4.getAddress();
    singVerificator = await acc5.getAddress();
    user = await acc6.getAddress();

    const ReputationService = await ethers.getContractFactory("ReputationService", owner);
    reputationService = await ReputationService.deploy(owner);
    await reputationService.deployed()
    
    const VerificationService = await ethers.getContractFactory("VerificationService", owner);
    verificationService = await VerificationService.deploy(await reputationService.getAddress());
    await verificationService.deployed()
  })

  describe(``, () => {

    beforeEach(`
      There is a verification service with several domains: AGE, Angular Developer, Singer. 
      Each domain has a scale to rate user and a threshold (t) to pass verification:
        Age: 0-1 (t=1),
        Developer: 0-100 (t=75),
        Singer: 1-5 (t=3)
      Each domain has a start virificator;
      Each domain has a quorum - the amount of verificators to start verification.
      Each domain has a reward for verification
    `, async () => {
      await verificationService.addDomain(
        ageDomain.name, 
        [ageVerificator], 
        ageDomain.scaleLow, 
        ageDomain.scaleHigh, 
        ageDomain.threshold, 
        ageDomain.quorum,
        ageDomain.reward
      )

      await verificationService.addDomain(
        devDomain.name, 
        [ 
          devVerificator1, 
          devVerificator2, 
          devVerificator3
        ], 
        devDomain.scaleLow, 
        devDomain.scaleHigh, 
        devDomain.threshold, 
        devDomain.quorum,
        devDomain.reward
      )
    })

    it("UC1: User asks to verify his age. Verificator accepts request and gets reward.", async () => {
      // Given: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
      const tx = await verificationService.connect(user).requestVerification("AGE", 1665349200);
      verficationRequestId = tx.id;

      // When: age verificator gets list of open requests for domain
      const reqs = reputationService.connect(ageVerificator).getRequestsList("AGE");

      // And: verificator confirms verification request;
      await verificationService.connect(ageVerificator).confirm(verficationRequestId);

      // And: verificator resolve request
      await verificationService.connect(ageVerificator).resolveRequest(verficationRequestId, 1);

      // Then: userX now has NFT proof of verification passed.
      const res = await verificationService.check('AGE', user)
      expect(res).to.eq(true)

      // And: verificator's reputaion has been increased
      const currentReputation =  await reputationService.getReputation(ageVerificator)
      expect(currentReputation).to.eq(ageDomain.reward) 
    })

    it("UC2: the majority of verificators makes a disicion. 2 of 3 verificators accept request", async () => {
      // Given: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
      const tx = await verificationService.connect(user).requestVerification("Developer.Angular", 1665349200);
      verficationRequestId = tx.id;

      // And: verificators confirmed request
      await verificationService.connect(devVerificator1).confirm(verficationRequestId);
      await verificationService.connect(devVerificator2).confirm(verficationRequestId);
      await verificationService.connect(devVerificator3).confirm(verficationRequestId);

      // When: 2 of 3 verificators vote for approve verification
      await verificationService.connect(devVerificator1).resolveRequest(verficationRequestId, 75);
      await verificationService.connect(devVerificator2).resolveRequest(verficationRequestId, 80);
      await verificationService.connect(devVerificator3).resolveRequest(verficationRequestId, 74); // lower than threshold
      
      // Then: userX now has NFT proof of verification passed.
      const res = await verificationService.check('Developer.Angular', user)
      expect(res).to.eq(true)

      // And: all verificators' reputaion has been increased
      const rep1 =  await reputationService.getReputation(devVerificator1)
      const rep2 =  await reputationService.getReputation(devVerificator2)
      const rep3 =  await reputationService.getReputation(devVerificator3)
      expect(rep1).to.eq(devDomain.reward) 
      expect(rep2).to.eq(devDomain.reward) 
      expect(rep3).to.eq(devDomain.reward) 
    })

    it("UC3: Each reauest has a timeout. When timeout has expired, default decision accepted", async () => {
        // Given: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
        const tx = await verificationService.connect(user).requestVerification("AGE", 1665349200);
        verficationRequestId = tx.id;

        // When: request has timeout
        await network.provider.send("evm_setNextBlockTimestamp", [1665349200 + 1])

        // Then: default decision accepted
        const res = await verificationService.check('AGE', user)
        expect(res).to.eq(false)
    })

    it("UC4: Deployer can change default decision", async () => {
        // Given: deployer changes defaul decision for domain
        await verificationService.changeDefauldDecision("AGE", 1);

        // And: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
        const tx = await verificationService.connect(user).requestVerification("AGE", 1665349200);
        verficationRequestId = tx.id;

        // When: request has timeout
        await network.provider.send("evm_setNextBlockTimestamp", [1665349200 + 1])

        // Then: default decision accepted
        const res = await verificationService.check('AGE', user)
        expect(res).to.eq(true)
    })

    it("UC5: Deployer can change quorum for domain", async () => {
        // Given: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
        const tx = await verificationService.connect(user).requestVerification("Developer.Angular", 1665349200);
        verficationRequestId = tx.id;
  
        // And: verificators confirmed request
        await verificationService.connect(devVerificator1).confirm(verficationRequestId);

        // When: deployer changes quorun
        await verificationService.changeQuorum("Developer.Angular", 1);

        // Then: request is confirmed. No need to wait another verificators
        await verificationService.connect(devVerificator1).resolveRequest(verficationRequestId, 75);
        
        // Then: userX now has NFT proof of verification passed.
        const res = await verificationService.check('Developer.Angular', user)
        expect(res).to.eq(true)
  
        // And: all verificators' reputaion has been increased
        const rep1 =  await reputationService.getReputation(devVerificator1)
        expect(rep1).to.eq(devDomain.reward) 
    })

    it("UC6: Verifier can't resolve before full confirmation", async () => {
        // Given: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
        const tx = await verificationService.connect(user).requestVerification("Developer.Angular", 1665349200);
        verficationRequestId = tx.id;

        // And: verificator confirmed request
        await verificationService.connect(devVerificator1).confirm(verficationRequestId);
        
        // When: verifier fails to resolve request, because request has not quorum 
        await expect(
          verificationService.connect(devVerificator1).resolveRequest(verficationRequestId, 75)
        ).to.be
        .revertedWith("Request if not CONFIRMED yet");
    })

    it("UC7: Deployer can change reward for confirmators", async () => {
      // Given: User requested age verification. Verifier must to verify user' age is 18 or higher. SLA: 10th October, 2022;
      const tx = await verificationService.connect(user).requestVerification("AGE", 1665349200);
      verficationRequestId = tx.id;

      // And: deployer changes reward
      await verificationService.changeReward("AGE", 2*ageDomain.reward);
      
      // When: age verificator gets list of open requests for domain
      const reqs = reputationService.connect(ageVerificator).getRequestsList("AGE");

      // And: verificator confirms verification request;
      await verificationService.connect(ageVerificator).confirm(verficationRequestId);

      // And: verificator resolve request
      await verificationService.connect(ageVerificator).resolveRequest(verficationRequestId, 1);

      // Then: userX now has NFT proof of verification passed.
      const res = await verificationService.check('AGE', user)
      expect(res).to.eq(true)

      // And: verificator's reputaion has been increased
      const currentReputation =  await reputationService.getReputation(ageVerificator)
      expect(currentReputation).to.eq(2*ageDomain.reward) 
    })

    it("UC8: deployer can add new domains", async () => {
      // Given: User can't request verification for unknown domain
      await expect(
        verificationService.connect(user).requestVerification("Singing", 1665349200)
      ).to.be
      .revertedWith("No such domain");

      // When: deployer adds domain
      await verificationService.addDomain(
        singDomain.name, 
        [singVerificator], 
        singDomain.scaleLow, 
        singDomain.scaleHigh, 
        singDomain.threshold, 
        singDomain.quorum,
        singDomain.reward
      )

      // Then: user can request a verification
      const tx = await verificationService.connect(userX).requestVerification("Singing", 1653434634);
      expect(tx).to.not.be.null
    })

    // TODO: describe a scenario, how to bacome a verifier     
  })
});