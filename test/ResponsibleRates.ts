import { Signer } from 'ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ResponsibleRates } from '../../typechain-types/contracts/ResponsibleRates';
import { ReputationService } from '../../typechain-types/contracts/ReputationService';

describe("ResponsibleRates", function () {
  let owner: Signer;
  let acc1: Signer; 
  let acc2: Signer; 
  let acc3: Signer; 
  let responsibleRates: ResponsibleRates;
  let reputationService: ReputationService;

  let rater1: string;
  let rater2: string;
  let userGettingRates: string;

  const REWARD = 50;
  const REWARD_SHARE = 0.1;
  const N = 3;
  let inviteId: number;

  beforeEach("Before each", async () => {
    [owner, acc1, acc2, acc3] = await ethers.getSigners();
    rater1 = await acc1.getAddress();
    rater2 = await acc2.getAddress();
    userGettingRates = await acc3.getAddress();

    const ReputationService = await ethers.getContractFactory("ReputationService", owner);
    reputationService = await ReputationService.deploy(owner);
  
    await reputationService.deployed()

    const ResponsibleRates = await ethers.getContractFactory("ResponsibleRates", owner);
    responsibleRates = await ResponsibleRates.deploy(await reputationService.getAddress());
  })

  describe(`Responsible rates is a system of rules which makes users responsible for rates they give.
  In the worst scenario, users can give the highest rates to their friends and organaize attacks against certain person.
  Here reputation becomes a tool to manipulate with someones position.
  To prevent exploiting system, we offer a responible rates system.
  Now user response for a rate they set to other user. 
  If user puts positive rates and other community participants put positive too, this means everybody agree.
  When user puts positive rates and other participants put negative rates, this means user is trying to rate higly not a good player.
  `, () => {
  
    it("UC 1: UserB gets positive rates, so UserA gets positive too", async () => {
      // When: UserC rates UserB positively
      reputationService.connect(otherUser).rateUp(invitedUser, REWARD)
      let reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(REWARD);

      // Then: UserA gets share of UserB's rating
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(0.1*REWARD);
    })

    it("UC 2: UserA receives a negative reputation if community rates UserB to other side", async () => {
      for(let i=1; i<=N; i++){
        // When: UserC rates UserB positively
        reputationService.connect(otherUser).mint(invitedUser, REWARD)
        const userBReputation = await reputationService.getReputation(invitedUser)
        expect(userBReputation).to.eq(i*REWARD);
        
        // Then: UserA gets share of UserB's rating (M*N) 
        const userAReputation = await reputationService.getReputation(inviter)
        expect(userAReputation).to.eq(REWARD_SHARE * i * REWARD);
      }

      // When: UserC rates UserB positively
      reputationService.connect(otherUser).mint(invitedUser, REWARD)
      const userBReputation = await reputationService.getReputation(invitedUser)
      expect(userBReputation).to.eq(N*REWARD);
      
      // Then: UserA gets nothing 
      const userAReputation = await reputationService.getReputation(inviter)
      expect(userAReputation).to.eq(REWARD_SHARE * N * REWARD);
    })

    it("UC 3: UserA rates opositly too many times ", async () => {
      for(let i=1; i<=N; i++){
        // When: UserC rates UserB negatively
        reputationService.connect(otherUser).burn(invitedUser, REWARD)
        const userBReputation = await reputationService.getReputation(invitedUser)
        expect(userBReputation).to.eq(-i*REWARD);
        
        // Then: UserA gets share of UserB's rating (M*N) 
        const userAReputation = await reputationService.getReputation(inviter)
        expect(userAReputation).to.eq(-i * REWARD_SHARE * REWARD);
      }

      // When: UserC rates UserB negatively
      reputationService.connect(otherUser).mint(invitedUser, REWARD)
      const userBReputation = await reputationService.getReputation(invitedUser)
      expect(userBReputation).to.eq(-N*REWARD);
      
      // Then: UserA gets nothing 
      const userAReputation = await reputationService.getReputation(inviter)
      expect(userAReputation).to.eq(-N * REWARD_SHARE * REWARD);
    })
  
  })
});