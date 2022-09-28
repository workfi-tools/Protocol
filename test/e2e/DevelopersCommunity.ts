import { Signer, BigNumber, BigNumberish } from 'ethers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { MessageRepository, TelegramService } from '../../typechain-types/contracts';
import { MessageStruct } from '../../typechain-types/contracts/MessageRepository';

describe(`
  Scenarios with a consulting community. 
  Users help each others: answering questions, completing tasks and so on`, function () {
  let owner: Signer;
  let userA: Signer;
  let userB: Signer;
  let userC: Signer;

  let service: TelegramService;
  let messageRepository: MessageRepository;

  const QUESTION_HASH = ethers.utils.hexZeroPad("0x1234", 32);
  const ANSWER_HASH_B = ethers.utils.hexZeroPad("0x4567", 32);
  const ANSWER_HASH_C = ethers.utils.hexZeroPad("0x6789", 32);

  const REPUTATION_REWARD = 100;

  beforeEach("Before each", async () => {
    [owner, userA, userB, userC] = await ethers.getSigners();

    const mrFactory = await ethers.getContractFactory("MessageRepository", owner);
    messageRepository = await mrFactory.deploy();
    await messageRepository.deployed();

    const tsFactory = await ethers.getContractFactory("TelegramService", owner);
    service = await tsFactory.deploy(messageRepository.address);
    await service.deployed()
  })

  it("user must answer the questions to receive a reputation", async () => {
    // Given: userA asks question
    const questionId = await askQuestion(userA, QUESTION_HASH);
    
    // And: userB replyes
    const replyBId = await sendReply(userB, questionId, ANSWER_HASH_B)
    let replyList = await service.getReplysForMessage(questionId);
    expect(replyList.length).equal(1);

    // // And: userC replyes
    const replyCId = await sendReply(userC, questionId, ANSWER_HASH_C)
    replyList = await service.getReplysForMessage(questionId);
    expect(replyList.length).equal(2);
    
    // replyList = await service.getReplysForMessage(question.id);
    // expect(replyList.length).equal(2);
    // reply = replyList[1];

    // expect(reply.startThreaMessageId).equal(question.id);
    // expect(reply.message.author).equal(await userC.getAddress());
    // expect(reply.message.msgHash).equal(ANSWER_HASH_C);
    // expect(reply.message.replysAmount).equal(0);


  })

  async function askQuestion(user: Signer, message: string) {
    const sendQuestion = await service.connect(user).startThread(message);
    await sendQuestion.wait();

    let questions = await service.getOpenQuestions();
    expect(questions.length).equal(1);
    let question: MessageStruct = questions[0];

    assertQuestionShouldBe(question, await user.getAddress(), 0, message)

    return question.id;
  }

  async function assertQuestionShouldBe(question: MessageStruct, address: string, replysAmount: number, message: string) {
    expect(question.author).equal(address);
    expect(question.replysAmount).equal(replysAmount);
    expect(question.msgHash).equal(message);
  }
  
  async function sendReply(user: Signer, questionId: BigNumberish, message: string) {
    const sendReply = await service.connect(user).replyThread(questionId, message);
    await sendReply.wait();

    const replyList = await service.getReplysForMessage(questionId);
    const reply = replyList[0];

    expect(reply.startThreaMessageId).equal(questionId);
    await assertQuestionShouldBe(reply.message, await user.getAddress(), 0, message)

    const questions = await service.getOpenQuestions();

    expect(questions.length).equal(2);
    const question = await service.getQuestionById(questionId);
    await assertQuestionShouldBe(question, await userA.getAddress(), 1, QUESTION_HASH)

    return reply.message.id;
  }


})


// Голосовые консультации
// Сообщество. 500 js-разработчиков. Чтобы получить консультацию, необходиом самому ответить на вопросы
// Протокол переписки с голосовухами