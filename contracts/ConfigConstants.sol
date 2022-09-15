// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract ConfigConstants {    

    
        bool approvable = true;
    

    /**
    * @dev time to dispute auto closing 
    */
    uint AUTO_CLOSE_TIME = 2 days;

    /**
    * @dev number of available invites one address can send
    */
    uint16 MAX_INVITES_FOR_USER = 10;
    
    /**
    * @dev number of rates for user which will affect inviter rating
    */
    uint8 INTERRILATION_NUMER = 10;

    /**
    * @dev reward share for inviter
    */
    uint8 REWARD_SHARE_PERCENT = 10;


}