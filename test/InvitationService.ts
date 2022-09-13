import { Signer } from 'ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { InvitationService } from '../../typechain-types/contracts/InvitationService';
import { ReputationService } from '../../typechain-types/contracts/ReputationService';

describe("InvitationService", function () {
  let owner: Signer;
  let acc1: Signer; 
  let acc2: Signer; 
  let acc3: Signer; 
  let invitationService: InvitationService;
  let reputationService: ReputationService;

  let inviter: string;
  let invitedUser: string;
  let otherUser: string;

  const REWARD = 50;
  const REWARD_SHARE = 0.1;
  const N = 3;
  let inviteId: number;

  beforeEach("Before each", async () => {
    [owner, acc1, acc2, acc3] = await ethers.getSigners();
    inviter = await acc1.getAddress();
    invitedUser = await acc2.getAddress();
    otherUser = await acc3.getAddress();

    const ReputationService = await ethers.getContractFactory("ReputationService", owner);
    reputationService = await ReputationService.deploy(owner);
  
    await invitationService.deployed()
    await reputationService.deployed()

    const InvitationService = await ethers.getContractFactory("InvitationService", owner);
    invitationService = await InvitationService.deploy(await reputationService.getAddress());
  })

  describe(`
    The main idea of Invitation service is to provide a responsible invites into system.
    Any participant can invite someone new to the system. 
    And now inviter is responsible for invited participant's behavior.
    If invited participant acts good (he is getting high rates), the inviter will be rewarded too. 
    Because he added a good new member to community. 
    On the other hand if invited participant goes bad (low rate, open disputes), the inviter will be fined. 
    Because he added a 'toxic' memeber to the community.
    As long as the inviter is responsible for invited, they can revoke the invite. 
    This action will block invited user. It's a good choice for inviters who made a mistake and invited the 'wrong' participant.
  `, () => {

    beforeEach("UserA invites UserB. Now UserA is getting affected by the UserB rates.", async () => {
      // Given: UserA invites userB
      inviteId = await invitationService.connect(inviter).invite(invitedUser);
    })
    
    it("UC1: UserA invites UserB", async () => {
      // Then: UserB has a reputation now
      const reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(0);
    })

    it("UC 2: UserB gets positive rates, so UserA gets positive too", async () => {
      // When: UserC rates UserB positively
      reputationService.connect(otherUser).rateUp(invitedUser, REWARD)
      let reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(REWARD);

      // Then: UserA gets share of UserB's rating
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(0.1*REWARD);
    })

    it("UC 3: UserA receives M percent of UserB's rating for next N positive rates (N=3, M=10%)", async () => {
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

    it("UC 4: UserA invites a bad player, so UserA gets negative reputation (N=3)", async () => {
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

    it("UC 5: UserA getting shares of UserB's rating even if UserB goes bad (N=5)", async () => {

      // When: UserC rates UserB positively
      reputationService.connect(otherUser).mint(invitedUser, REWARD)
      let reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(REWARD);

      // Then: UserA gets share of UserB's rating ==> N==5
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(REWARD_SHARE);

      // When: UserC rates UserB negatively
      reputationService.connect(otherUser).burn(invitedUser, REWARD)
      reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(0);

      // Then: UserA gets share of negative rate ==> N==4
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(0);

      // When: UserC rates UserB positively
      reputationService.connect(otherUser).mint(invitedUser, REWARD)
      reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(REWARD);

      // Then: UserA gets share of UserB's rating ==> N==3
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(REWARD_SHARE);

      // When: UserC rates UserB positively
      reputationService.connect(otherUser).mint(invitedUser, REWARD)
      reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(2*REWARD);

      // Then: UserA gets share of UserB's rating ==> N==2
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(2+REWARD_SHARE);

      // When: UserC rates UserB negatively
      reputationService.connect(otherUser).burn(invitedUser, REWARD)
      reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(REWARD);

      // Then: UserA gets share of negative rate ==> N==1
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(REWARD_SHARE);

      // When: UserC rates UserB negatively
      reputationService.connect(otherUser).burn(invitedUser, REWARD)
      reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(0);

      // Then: UserA gets nothing ==> N==0
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(REWARD_SHARE);
    })

    it("UC 6: UserA revoke his own invite", async () => {
      // Given: UserC rates UserB negatively
      reputationService.connect(otherUser).burn(invitedUser, REWARD)
      let reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(REWARD);

      // And: UserA gets share of UserB's rating 
      reputation = await reputationService.getReputation(inviter)
      expect(reputation).to.eq(-REWARD_SHARE);

      // When: UserA reject their invite 
      await invitationService.connect(inviter).revokeInvite(inviteId)
      
      // Then: UserB is blocked now
      reputation = await reputationService.getReputation(invitedUser)
      expect(reputation).to.eq(0);
    })

    it("UC 7: UserA can't reject his own invite if subscription has been ended (N==3)", async() => {
      for(let i=1; i<=N; i++){
        // When: UserC rates UserB negatively
        reputationService.connect(otherUser).burn(invitedUser, REWARD)
        const userBReputation = await reputationService.getReputation(invitedUser)
        expect(userBReputation).to.eq(-i*REWARD);
        
        // Then: UserA gets share of UserB's rating (M*N) 
        const userAReputation = await reputationService.getReputation(inviter)
        expect(userAReputation).to.eq(-i * REWARD_SHARE * REWARD);
      }

      // When: UserA is trying reject their invite 
      // Then: transaction is failed because N == 0
      await expect(
        invitationService.connect(inviter).revokeInvite(inviteId))
      .to.be
      .revertedWith("Can't decline dispute");
    })
  })
});