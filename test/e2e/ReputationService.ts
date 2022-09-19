import { Signer, BigNumber } from 'ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ReputationService } from '../../typechain-types/contracts';
import { DealService } from '../../typechain-types/contracts/DealService';

describe("", function () {
  let owner: Signer;
  let userNewbie: Signer; 
  let userPro: Signer; 
  
  let service: DealService;
  let reputationService: ReputationService;
  
  let userNewbieAddress: string;
  let userProAddress: string;

  const QUESTION_HASH = ethers.utils.hexZeroPad("0x1234", 32);
  const ANSWER_HASH = ethers.utils.hexZeroPad("0x4567", 32);
  const REPUTATION_REWARD = 100;
  
  beforeEach("Before each", async () => {
    [owner, userNewbie, userPro] = await ethers.getSigners();
    userNewbieAddress = await userNewbie.getAddress();
    userProAddress = await userPro.getAddress();

    const rsFactory = await ethers.getContractFactory("ReputationService", owner);
    reputationService = await rsFactory.deploy();
    await reputationService.deployed();

    const tsFactory = await ethers.getContractFactory("DealService", owner);
    service = await tsFactory.deploy(reputationService.address);
    await service.deployed()

    await reputationService.register(userNewbieAddress);
    await reputationService.register(userProAddress);

    let newbieReputation = await reputationService.getReputation(userNewbieAddress);
    let proReputation = await reputationService.getReputation(userProAddress);
    expect(newbieReputation).equal(0);
    expect(proReputation).equal(0);
  })

  it("newbie gets advice from pro", async () => {
    // Given: newbie asks question
    const newInteraction = await service.connect(userNewbie).initDeal(QUESTION_HASH);
    await newInteraction.wait();
    let ids = await service.getDeals();
    const dealId: BigNumber =  ids[0];
    
    // Assert: deal is ON_REVIEW 
    await assertDealObjectState(dealId, 0, userNewbieAddress);

    // And: Admin contract publish the question;
    const approval = await service.approveDeal(dealId);
    await approval.wait();

    //Assert: deal is REQUEST_PUBLISHED 
    await assertDealObjectState(dealId, 1, userNewbieAddress);
      
    //When: pro user reacts to interaction;
    const confirming = await service.connect(userPro).confirmDeal(dealId, ANSWER_HASH)
    await confirming.wait();

    // Assert: deal is INTERACTING 
    await assertDealObjectState(dealId, 3, userNewbieAddress);
    
    //Assert: system registers confirmation
    await assertConfirmationObjectState(dealId, userProAddress);
     
    // When: newbie marks answer as a solution
    let finilizing = await service.connect(userNewbie).finalizeDeal(dealId);
    await finilizing.wait();

    // Assert: deal is FINALIZED
    await assertDealObjectState(dealId, 4, userNewbieAddress);

    // Then: newbie can rate pro now
    const minting = await reputationService.connect(userNewbie).mint(userProAddress, REPUTATION_REWARD);
    await minting.wait()

    // Assert: pro's reputation is increased
    await assertUserGetsReputationFromUser(userProAddress, userNewbieAddress, REPUTATION_REWARD);
    
  })

  async function assertDealObjectState(id: BigNumber, stateNum: number, addressUser: string) {
    let ids = await service.getDeals();
    expect(ids.length).equal(1);
    
    const deal = await service.getDealById(ids[0]);
    expect(deal.author).equal(addressUser);
    expect(deal.id).equal(id)
    expect(deal.state).equal(stateNum);
  }

  async function assertConfirmationObjectState(dealId: BigNumber, addressUser: string) {
    let confirmations = await service.getConfirmationsFor(dealId);
    
    expect(confirmations.length).equal(1);
    const prosConfirmation = confirmations[0];
    expect(prosConfirmation.author).equal(addressUser);
    expect(prosConfirmation.dealId).equal(dealId);
  }

  async function assertUserGetsReputationFromUser(userTo: string, userFrom: string, reputationAmount: number) {
    let proReputation = await reputationService.getReputation(userTo);
      expect(proReputation).equal(reputationAmount);
  
      let raters = await reputationService.getRaters(userTo);
      expect(raters.length).equal(1);
      expect(raters[0]).equal(userFrom);
  }
})



// 1 Регистрируем всех пользователей в системе
// 2 Расставляем роли
// 3 Позитивные Юзкейсы:
    //новичок консультируется с про
    //про аутсорсит рутину новичку
  

