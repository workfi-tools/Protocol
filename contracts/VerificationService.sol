// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "contracts/ReputationService.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract VerificationService is Ownable {



    /**
    * @notice creates a new request for vrification in specified domain
    * @param domain name of domain
    * @param dueDateTime time to accept default value
    * @return requestId the new request id
    */
    function verificationRequest(string calldata domain, uint dueDateTime) external virtual returns (uint);

    /**
    * @notice add a new domain to verification system
    * @param name domain name
    * @param verifiers list of addresses who can verify requests
    * @param scaleLow the lower rate user can get after verification
    * @param scaleLow the highest rate user can get after verification
    * @param threshold the value user need to get for succeed decision
    * @param quorum the needed amount of verifiers to resolve request 
    * @param reward the amount of reputation or money verifier gets resolved verification
    */
    function addDomain(
        string calldata name, 
        address[] calldata verifiers, 
        int16 scaleLow, 
        int16 scaleHigh, 
        int16 threshold, 
        uint8 quorum,
        uint reward
    ) external virtual;
  
    /**
    * @notice returns list of open verification requests
    * @param domain domain name
    * @return list 
    * TODO: create struct
    */
    function getRequestsList(string calldata domain) external virtual view returns (uint[] memory);

    /**
    * @notice verifier commits to make a decision about given request
    * @param requestId id of request
    */
    function confirm(uint requestId) external virtual; 

    /**
    * @notice verifier votes for/against request accepting
    * @dev request must be CONFIRMED before
    * @param requestId id of request
    * @param decision value between scaleLow and scaleHigh
    */
    function resolveRequest(uint requestId, int16 decision) external virtual;

    /**
    * @notice check if given user has a succeed verification in a given domain
    * @param domain domain name
    * @param user address under test
    * @return bool true if verification succeed
    */
    function check(string calldata domain, address user) external virtual view returns (bool);

    /**
    * @notice changes decision which will be accepted after request timeout
    * @param domain domain name
    * @param newValue value will be defined as default
    */
    function changeDefauldDecision(string calldata domain, int16 newValue) external virtual;

    /**
    * @notice changes quorum for a given domain. This might be helpful to make passing verification easier or harder 
    * @param domain domain name
    * @param newValue value will be defined as default
    */
    function changeQuorum(string calldata domain, uint8 newValue) external virtual;
    
    /**
    * @notice changes reward which verifierd will get after reqest resolving 
    * @param domain domain name
    * @param newValue value will be defined as default
    */
    function changeReward(string calldata domain, uint newValue) external virtual;
}