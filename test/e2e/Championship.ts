import { Signer, BigNumber, BigNumberish } from 'ethers';
import { time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ICompetition } from '../../typechain-types/contracts';

describe(`
  Scenarios with a real tournament engine. 
  Users can co-operate to organize a new championship or competition`, function () {
  let owner: Signer;
  let organizer: Signer; 
  let organizerAddress: string;
  let willBeWinner: Signer; 
  let winnerAddress: string;
  let regularParticipant1: Signer; 
  let regular1Address: string;
  let regularParticipant2: Signer; 
  let regular2Address: string;
  let userList: Signer[];

  let service: ICompetition;

  const chmpnshpName = ethers.utils.formatBytes32String("Chess tournament");
  const competitionInfo = {
    registrationFee : 15000,
    winScore: 1000,
    reg1Score: 900,
    reg2Score: 800,
    orgScore: 100,
    duration: 3600 // 1 hour
  }
  

  beforeEach("Before each", async () => {
    [owner, organizer, willBeWinner, regularParticipant1, regularParticipant2] = await ethers.getSigners();
    [organizerAddress, winnerAddress, regular1Address, regular2Address] = await Promise.all([organizer.getAddress(), willBeWinner.getAddress(), regularParticipant1.getAddress(), regularParticipant2.getAddress()]);
    userList = [willBeWinner, regularParticipant1, regularParticipant2];


    const factory = await ethers.getContractFactory("CompetitionWith3Winners", owner);
    service = await factory.deploy();
    await service.deployed();
  })

  it("users can organize championship", async () => {
    // Given: user init a new championship
    const now =  (await ethers.provider.getBlock('latest')).timestamp;
    const endDate = now+competitionInfo.duration;
    
    const newChmpnshp = await service.connect(organizer).initChampionship(chmpnshpName, endDate , {value: competitionInfo.registrationFee});
    await newChmpnshp.wait();

    const ids = await service.getCompetitions(); 
    expect(ids.length).equals(1)
    const competitionId = ids[0];
      
    // When: 3 another users register on the competition
    const reg1 = await service.connect(willBeWinner).register(competitionId, {value: competitionInfo.registrationFee});
    const reg2 = await service.connect(regularParticipant1).register(competitionId, {value: competitionInfo.registrationFee});
    const reg3 = await service.connect(regularParticipant2).register(competitionId, {value: competitionInfo.registrationFee});
    Promise.all([reg1.wait(), reg2.wait(), reg3.wait()])
    

    // Then: prize fund will be 4*registration fees
    const participants = await service.getParticipantsFor(competitionId);
    expect(participants.length).equals(4);

    const fund = await service.getPrizeFundFor(competitionId);
    expect(fund).equals(4 * competitionInfo.registrationFee);

    // When: users get scores
    const score1 = await service.connect(organizer).addScores(competitionId, winnerAddress , competitionInfo.winScore);
    const score2 = await service.connect(organizer).addScores(competitionId, regular1Address , competitionInfo.reg1Score);
    const score3 = await service.connect(organizer).addScores(competitionId, regular2Address , competitionInfo.reg2Score);
    const score4 = await service.connect(organizer).addScores(competitionId, organizerAddress , competitionInfo.orgScore);
    Promise.all([score1.wait(), score2.wait(), score3.wait(), score4.wait()]);
    

    // And: championship ends
    await time.increase(competitionInfo.duration);

    // Then: 3 leaders can get their reward in share 50:35:15
    await expect(await service.connect(willBeWinner).getRewardFor(competitionId))
    .to.changeEtherBalances([willBeWinner, service], [30000, -30000]);
   
    await expect(await service.connect(regularParticipant1).getRewardFor(competitionId))
    .to.changeEtherBalances([regularParticipant1, service], [21000, -21000]);
    
    await expect(await service.connect(regularParticipant2).getRewardFor(competitionId))
      .to.changeEtherBalances([regularParticipant2, service], [9000, -9000]);
    
    // And: other users can't get reward
    await expect(service.connect(organizer).getRewardFor(competitionId))
      .to.be.revertedWith('You are not in leaderboard');
  })
})


// Голосовые консультации
// Сообщество. 500 js-разработчиков. Чтобы получить консультацию, необходиом самому ответить на вопросы
// Протокол переписки с голосовухами

// самоорганизующийся чемпионат. Формируем фонд - делим между победителями
  // learn2earn
  // лотерея
  // турнир по покеру
// чемпионат, спонсируемый кем-то
// чемпионат, где на кону не деньги
  // хакатон
  // олимпиада
// активность, где должен быть результат

// in
// размер фонда
// количество участников на старте
// модель финансирования

// out
// правила распределния между победителями

// notes:
// мотивация. Награждать не только лидера 
// описание, что ожидает "гугл"
// 4й кейс как формат занятости 
