// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "contracts/ReputationService.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract InvitationService is Ownable {

    // TODO: struct User
    struct User{
        address _address;
        uint inviteId;
    }

    /**
    * @notice register given user in a Reputation system
    * @dev add given address in all mappings and set reputation = 0
    * @dev may be called only by a registered user
    * @param user The address which will be added to the system
    * @return inviteId The new invite id
    */
    function invite(address user) external virtual returns (uint);

    /** 
    * @notice returns the amount of invites user has. user can spent each of them to invite anyone
    * @dev if amount == 0^ user can't invite anyone
    * @param user The address which right to invite we test
    * @return amount The amount of available invites
    */
    function invitesLeft(address user) external virtual view returns (uint8);

    /**
    * @notice returns chain of inviters (10 max). 
    * The first address is an inviter of {user}. The next address is an inviter of the first and so on. 
    * @param user The address whose inviter requested
    * @return addresses Chain of inviters
    */
    function getInviteChain(address user) external virtual view returns (address[] memory);

    /**
    * @notice returns list of addresses of persons/contracts which was invited by the given address
    * @param user The address whose list requested
    * @return users List of adresses whose been invited by the {for} address
    */
    function getInvitedBy(address user) external virtual view returns (address[] memory);

    /** 
    * @notice revoking an invite leads to exclusion invited person from the System
    * @param user Address of the user who will be excluded
    * @dev Firstly check if interrilation with inviter still works
    */
    function revokeInvite(address user) external virtual;
}