// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "contracts/ReputationService.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract DisputeResolution is Ownable {

    struct Dispute {
        address resolver;
        address client;
        address executor;
    }

    struct UserDisputes {
        address user;
        Dispute[] asResolver;
        Dispute[] asClient;
        Dispute[] asExecutor;
    }

    // TODO: create a resolverOnly modifier;
    // TODO: emit Resolved event and automatically call actions 
    // (money reward, reputation changes, etc.)

    /**
    * @notice open a new dispute based on given interaction
    * @param interactionId The id of interaction - subject of dispute
    * @return disputeId The new disputeId
    */
    function openDispute(uint interactionId) external virtual returns (uint);

    /**
    * @notice returns the amount of open disputes
    * @return amount the amount of open disputes
    */
    function getOpenDisputesAmount() external virtual returns (uint);

    /**
    * @notice returns list of open disputes in given domain
    * @param domain name of domain
    * @param page number of result page
    * @param offset page capacity
    * @param openOnly return only open disputes
    * @return disputes The list of open disputes
    */
    function getDisputes(string calldata domain, uint8 page, uint8 offset, bool openOnly) external virtual returns (Dispute[] memory);

    /**
    * @notice marks dispute as taken. It means there is a someone who is ready to resolve current dispute
    * @dev msg.sender will be accepted as a resolver if they have enough reputation in given domain
    * @param disputeId The address which will be added to the system
    */
    function takeOnReview(uint disputeId) external virtual;

    /**
    * @notice return dispute info 
    * @param disputeId The dispute id
    * @return dispute dispute info
    */
    function getDispute(uint disputeId) external virtual returns(Dispute memory);
    
  
    /**
    * @notice return list of disputes where given user takes part 
    * @param user user address
    * @param page number of result page
    * @param offset page capacity
    * @return disputes A {UserDisputes} instance.
    * It contains 3 lists of disputes: where user is as a resolver, as a client and as an executor 
    * 
    * @dev https://docs.soliditylang.org/en/latest/control-structures.html#assignment
    * @dev Tuples are not proper types in Solidity, they can only be used to form syntactic groupings of expressions.
    */
    function getUserDisputes(address user, uint8 page, uint8 offset) external virtual returns(UserDisputes memory);

    /**
    * @notice close the given dispute on given address side
    * @param disputeId The dispute id
    * @param whoIsRight The address who will get money reward (executor or client)
    */
    function resolveDispute(uint disputeId, address whoIsRight) external virtual;
}