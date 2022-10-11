// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ICompetition.sol";

contract CompetitionWith3Winners is ICompetition, Ownable {
    struct WinnerList {
        uint competitionId;
        address place1;
        address place2;
        address place3;
        uint8 place1Share;
        uint8 place2Share;
        uint8 place3Share;
    }

    mapping(uint => Competition) competitions;
    mapping(uint => WinnerList) winnerList;
    mapping(uint => address[]) participants;
    mapping(address => mapping (uint => bool)) usersOnCompetitions;
    mapping(uint => mapping (address => int)) scores;
    uint[] competitionsList;

    modifier knownCompetition(uint competitionId) {
            require(competitions[competitionId].id != 0, "No such competition");
            _;
    }

    modifier userTakesPartOnCompetition(uint competitionId, address user) {
        require(usersOnCompetitions[user][competitionId] , "No participation in competition");
        _;
    }

    modifier organizerOnly(uint competitionId){
        require(competitions[competitionId].owner == msg.sender , "Organizer only");
        _;
    }

    function initChampionship(bytes32 competitionNameHash, uint endDate) external payable{
        require(msg.value >= 0);
        require(endDate > block.timestamp, "Invalid end date");

        uint id = generateId(competitionNameHash);
        Competition memory competition = Competition({
            id: id,
            owner: msg.sender,
            nameHash: competitionNameHash,
            registrationFee: msg.value,
            prizeFund: msg.value,
            endDate: endDate
        });
        
        WinnerList memory wList;
        wList.competitionId = id;
        wList.place1Share = 50;
        wList.place2Share = 35;
        wList.place3Share = 15;
        
        winnerList[id] = wList;
        competitions[id] = competition;
        competitionsList.push(id);
        participants[id].push(msg.sender);
        usersOnCompetitions[msg.sender][id] = true;
    }

    function register(uint competitionId) external payable knownCompetition(competitionId) returns(bool){
        require(!usersOnCompetitions[msg.sender][competitionId] , "Already registered");
        require(msg.value >= competitions[competitionId].registrationFee, "Insufficient funds");

        participants[competitionId].push(msg.sender);
        usersOnCompetitions[msg.sender][competitionId] = true;
        competitions[competitionId].prizeFund += msg.value;
        return true;        
    }

    function getCompetitions() external view override returns(uint[] memory){
        return competitionsList;
    }

    function getPrizeFundFor(uint competitionId) external view override knownCompetition(competitionId) returns(uint){
        return competitions[competitionId].prizeFund;
    }

    function getParticipantsFor(uint competitionId) external view returns(address[] memory){
        return participants[competitionId];
    }

    function addScores(uint competitionId, address participant, int points) external 
        knownCompetition(competitionId)
        userTakesPartOnCompetition(competitionId, participant)
        organizerOnly(competitionId)
    {
            scores[competitionId][participant] += points;
            WinnerList memory list = winnerList[competitionId];
            
            int currentPoints = scores[competitionId][participant];

            int place1Scores = scores[competitionId][list.place1];
            int place2Scores = scores[competitionId][list.place2];
            int place3Scores = scores[competitionId][list.place3];

            if (currentPoints > place1Scores){
                list.place3 = list.place2;
                list.place2 = list.place1;
                list.place1 = participant;
            } else if (currentPoints > place2Scores) {
                list.place3 = list.place2;
                list.place2 = participant;
            } else if (currentPoints > place3Scores){
                list.place3 = participant;
            }

            winnerList[competitionId] = list;
    }

    // TODO: reentrancy 
    function getRewardFor(uint competitionId) external 
        knownCompetition(competitionId)
        userTakesPartOnCompetition(competitionId, msg.sender)
    { 
        require(block.timestamp >= competitions[competitionId].endDate, "Competition is in progress now. Try later");
        
        WinnerList memory info = winnerList[competitionId];

        if (info.place1 == msg.sender){
            payShare(competitionId, info.place1Share);
        } else if (info.place2 == msg.sender){
            payShare(competitionId, info.place2Share);
        } else if (info.place3 == msg.sender){
            payShare(competitionId, info.place3Share);
        } else {
            revert("You are not in leaderboard");
        }
    }

    function generateId(bytes32 data) internal view returns(uint) {
        bytes32 idBytes = keccak256(abi.encodePacked(data, block.timestamp));
        return uint(idBytes);
    }

    function payShare(uint competitionId, uint8 share) internal{
            Competition memory competiotion = competitions[competitionId];
            
            uint totalFund = competiotion.prizeFund;
            uint sum = totalFund * share / 100;
            payable(msg.sender).transfer(sum);
    }
}