import { Signer } from 'ethers';
import { expect } from 'chai';
import { ethers, network } from 'hardhat';
import { ReputationService } from '../../typechain-types/contracts/ReputationService';
import { DisputeResolution } from '../../typechain-types/contracts/DisputeResolution';

describe("DisputeResolution", function () {
  let owner: Signer;
  let reputationService: ReputationService;
  let drService: DisputeResolution;

  let client: string;
  let executor: string;
  let resolver: string;
  let user: string;

  const interaction = {
    id: 1234,
    interactionReward : 500,
    rewardForResolver: 50,
    reputationFine: 30
  }

  beforeEach("Before each", async () => {
    const [owner, acc1, acc2, acc3, acc4, acc5, acc6] = await ethers.getSigners();
    client = await acc1.getAddress();
    executor = await acc2.getAddress();
    resolver = await acc5.getAddress();
    user = await acc6.getAddress();

    const ReputationService = await ethers.getContractFactory("ReputationService", owner);
    reputationService = await ReputationService.deploy(owner);
    await reputationService.deployed()
    
    const DisputeResolution = await ethers.getContractFactory("DisputeResolution", owner);
    drService = await DisputeResolution.deploy(await reputationService.getAddress());
    await drService.deployed()
  })

  describe(`Dispute resolution service is a service to provide a mechanism of conflicts resolving.
    User can be upset with interaction results. It may be low result quality, or no result at all.
    In the worst scenario, executor just gets money reward for nothing.
    To prevent these cases, the system  will take a money reward on hold for a given time.
    This timefrme is needed for a client to open a dispute.
    Dispute is a situation when client is not satisfied with interaction result and want to return money reward back.
    The decision will make a thirdparty user – resolver.
    Resolver takes task of interaction (expected result) and clients comment (actual result).
    Based on expected and actual results, resolver must decide: does this work worth to be payed?
    To become a resolver, user must have enough reputation in given domain.
  `, () => {

    it(`UC1: There is a timeframe to open a new dispute based on past interaction. TF == 2 days. 
    After that moment, money reward will be sent to executor`, async () => {
      // Given: it has been past 2 days since users interacted
      await network.provider.send("evm_setNextBlockTimestamp", ["+2 days"])
      
      // When: client tries to open a dispute, 
      // Then: they fails
      await expect(
        drService.connect(client).openDispute(interaction.id)
      ).to.be.revertedWith("interaction is closed already");

      // And: the executor will get their reward
      const executorBalance =  await executor.getBalance()
      expect(executorBalance).to.eq(interaction.interactionReward) 
    })

    it("UC2: Resolver can view a list of open disputes and resolve them", async () => {
      // Given: client opens dispute based on existing interaction;
      const disputeId = await drService.connect(client).openDispute(interaction.id)
      
      // And: resolver requests disputes;
      const disputes = await drService.connect(resolver).getOpenDisputes();
      expect(disputes).to.have(disputeId)

      // When: resolver takes a dispute to resolve
      await drService.connect(resolver).takeOnReview(disputeId)

      // Then: dispute gets state ON_REIEW
      const openedDispute = await drService.getDispute(disputeId)
      expect(openedDispute).is.eq("ON_REVIEW")

      // When: resolver resolves the dispute on executor
      await drService.resolveDispute(disputeId, executor)

      // Then: the executor will get their reward
      const executorBalance =  await executor.getBalance()
      expect(executorBalance).to.eq(interaction.interactionReward) 
    })

    it(`UC3: Resolver can resolve dispute on a client. 
    Money reward will back to client, executor will get a reputation fine`, async () => {
      // Given: client opens dispute based on existing interaction;
      const disputeId = await drService.connect(client).openDispute(interaction.id)
      
      // And: resolver requests disputes;
      const disputes = await drService.connect(resolver).getOpenDisputes();
      expect(disputes).to.have(disputeId)

      // When: resolver takes a dispute to resolve
      await drService.connect(resolver).takeOnReview(disputeId)

      // And: resolver resolves the dispute on client
      await drService.resolveDispute(disputeId, client)

      // Then: the executor will get reputation fine and no money reward 
      const executorBalance =  await executor.getBalance()
      expect(executorBalance).to.eq(0) 
      const executorReputation = await reputationService.getReputation(executor)
      expect(executorReputation).to.eq(interaction.reputationFine);

      // And: client will get their payment back
      const clientBalance =  await client.getBalance()
      expect(clientBalance).to.eq(interaction.interactionReward) 
    })

    it("UC4: A client pays for a dispute resolution. Payment goes to resolver", async () => {
      // Given: client opens dispute based on existing interaction;
      const disputeId = await drService.connect(client).openDispute(interaction.id)
      
      // And: resolver requests disputes;
      const disputes = await drService.connect(resolver).getOpenDisputes();
      expect(disputes).to.have(disputeId)

      // When: resolver takes a dispute to resolve
      await drService.connect(resolver).takeOnReview(disputeId)

      // Then: dispute gets state ON_REIEW
      const openedDispute = await drService.getDispute(disputeId)
      expect(openedDispute).is.eq("ON_REVIEW")

      // When: resolver resolves the dispute on executor
      await drService.resolveDispute(disputeId, executor)

      // Then: the executor will get their reward
      const resolverBalance =  await resolver.getBalance()
      expect(resolverBalance).to.eq(interaction.rewardForResolver) 
    })

    it(`UC5: There is a timeframe to open a new dispute based on past interaction. 
    If noone will take the dispute on review, the resolver reward will be increased on 1%.`, async () => {
      // Given: client opens a dispute
      const disputeId = drService.connect(client).openDispute(interaction.id)
        
      // When: it has been past 2 days since users interacted
      await network.provider.send("evm_setNextBlockTimestamp", ["+2 days"])
      
      // And resolver takes and resolves the dispute 
      await drService.connect(resolver).takeOnReview(disputeId)
      await drService.resolveDispute(disputeId, executor)

      // Then: reward will be (100+1)%
      const resolverBalance =  await resolver.getBalance()
      expect(resolverBalance).to.eq(1.01*interaction.rewardForResolver)    
    })  
  })
});