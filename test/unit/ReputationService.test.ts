import { Signer, BigNumber } from 'ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ReputationService } from '../../typechain-types/contracts';

describe("Reputation service unit test", function () {
  let service: ReputationService;
  
  let owner: Signer;
  let user1: Signer; 
  let user2: Signer; 

  const reputation_reward = 100;
  
  beforeEach("Deploy service", async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("ReputationService", owner);
    service = await factory.deploy();
    await service.deployed();
  })

  describe("`register` method",async () => {
    it("should be possible to register a new user", async () => {
        const regiserTx = await service.register(user1.getAddress());
        await regiserTx.wait();
    
        const reputation = await service.getReputation(user1.getAddress())
        expect(reputation).equal(0)
      })
    
      it("should not be possible to get a reputation of non-registerd user", async () => {
        await expect(
            service.getReputation(user1.getAddress())
        ).to.be.revertedWith('No such user'); 
      })
    
      it("should not be possible to register user twice",async () => {
        const regiserTx = await service.register(user1.getAddress());
        await regiserTx.wait();
    
        await expect(
            service.register(user1.getAddress())
        ).to.be.revertedWith('User already registered'); 
      })
  })

  describe("`mint` method",async () => {
    beforeEach("Register users", async () => {
        const regiserTx1 = await service.register(user1.getAddress());
        const regiserTx2 = await service.register(user2.getAddress());
        await regiserTx1.wait();
        await regiserTx2.wait();
    })

    it("should be possible to rate registered user", async () => {
        const mint = await service.connect(user1).mint(user2.getAddress(), reputation_reward);
        await mint.wait();

        const reputation = await service.getReputation(user2.getAddress())
        expect(reputation).equal(reputation_reward)
      })

      it("should be possible to get user's raters", async () => {
        const mint = await service.connect(user1).mint(user2.getAddress(), reputation_reward);
        await mint.wait();

        const raters = await service.getRaters(user2.getAddress())
        expect(raters.length).equal(1)
        expect(raters[0]).equal(await user1.getAddress())
      })

      it("should not be possible to mint zero or negative reputation", async () => {
        await expect(
            service.connect(user1).mint(user2.getAddress(), 0)
        ).to.be.revertedWith('Only positive'); 
      })
    
  })

  describe("`getReputation` method",async () => {
    beforeEach("Register users", async () => {
        const regiserTx1 = await service.register(user1.getAddress());
        await regiserTx1.wait();
    })

      it("should be possible to get reputation for registered user (equals 0)", async () => {
        const reputation = await service.getReputation(user1.getAddress())
        expect(reputation).equal(0)
      })

      it("should not be possible to get reputation for non-registered user", async () => {
        await expect(
          service.getReputation(user2.getAddress()))
          .to.be.revertedWith('No such user'); 
      })
  })


})
