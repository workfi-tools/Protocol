// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

interface ICompetition  {
    struct Competition {
        uint id;
        address owner;
        bytes32 nameHash;
        uint registrationFee;
        uint prizeFund;
        uint endDate;
    }

    function initChampionship(bytes32 competitionNameHash, uint endDate) external payable;

    function getCompetitions() external view returns(uint[] memory);
    
    function getPrizeFundFor(uint competitionId) external view returns(uint);

    function register(uint competitionId) external payable returns(bool);

    function getParticipantsFor(uint competitionId) external view returns(address[] memory);

    function addScores(uint competitionId, address participant, int points) external;

    function getRewardFor(uint competitionId) external;
}