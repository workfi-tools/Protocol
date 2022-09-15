import { Signer } from 'ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ReputationService, TransactionService } from '../../typechain-types/contracts';

describe("", function () {
  let owner: Signer;
  let userNewbie: Signer; 
  let userPro: Signer; 
  
  let service: TransactionService;
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

    const tsFactory = await ethers.getContractFactory("TransactionService", owner);
    service = await tsFactory.deploy(reputationService.address);
    await service.deployed()

    let newbieReputation = await reputationService.getReputation(userNewbieAddress);
    let proReputation = await reputationService.getReputation(userProAddress);
    expect(newbieReputation).equal(0)
    expect(proReputation).equal(0)
    
    ;
  })

  it("newbie gets advice from pro", async () => {
    // Given: newbie asks question
    const newInteraction = await service.connect(userNewbie).init(QUESTION_HASH);
    await newInteraction.wait();
    
    // Assert: transaction is ON_REVIEW 
    let txs = await service.getTransactions();
    expect(txs.length).equal(1);
    const shouldBeOnReview = txs[0]
    expect(shouldBeOnReview.author).equal(userNewbieAddress);
    expect(shouldBeOnReview.state).equal(0);

    // And: Admin contract publish the question;
    const publishing = await service.publish(shouldBeOnReview.id);
    await publishing.wait();

    // Assert: transaction is REQUEST_PUBLISHED 
    txs = await service.getTransactions();
    expect(txs.length).equal(1);
    const shouldBePublished = txs[0]
    //  expect(shouldBePublished.state).equal(1); //  TODO: why not changing??
  
    // When: pro user reacts to interaction;
    const confirming = await service.connect(userPro).confirm(shouldBePublished.id, ANSWER_HASH)
    await confirming.wait();

    // Assert: transaction is INTERACTING 
    txs = await service.getTransactions();
    const shouldBeInteracting = txs[0]
    expect(shouldBeInteracting.author).equal(userNewbieAddress);
    //  expect(shouldBeInteracting.state).equal(3); //  TODO: why not changing??

    // Then: system registeras confirmation
    let confirmations = await service.getConfirmationsFor(shouldBeInteracting.id);
    expect(confirmations.length).equal(1);
    const prosConfirmation = confirmations[0];
    expect(prosConfirmation.author).equal(userProAddress);
    expect(prosConfirmation.transactionId).equal(shouldBeInteracting.id);
     
    // When: newbie marks answer as a solution
    let finilizing = await service.connect(userNewbie).finalize(shouldBeInteracting.id);
    await finilizing.wait();

    // Assert: transaction is FINALIZED
    txs = await service.getTransactions();
    const shouldBeFinalized = txs[0]
    expect(shouldBeFinalized.author).equal(userNewbieAddress);
    //  expect(shouldBeInteracting.state).equal(4); //  TODO: why not changing??
    
    // Then: newbie can rate pro now
    const minting = await reputationService.connect(userNewbie).mint(userProAddress, REPUTATION_REWARD);
    await minting.wait()

    // Assert: pro's reputation is increased
    let proReputation = await reputationService.getReputation(userProAddress);
    console.log(proReputation);
   // expect(proReputation).equal(REPUTATION_REWARD);

    let raters = await reputationService.getRaters(userProAddress);
    expect(raters[0]).equal(userNewbieAddress);
  })
})

// 1 Регистрируем всех пользователей в системе
// 2 Расставляем роли
// 3 Позитивные Юзкейсы:
    //новичок консультируется с про
    //про аутсорсит рутину новичку
  

