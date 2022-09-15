// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    interface IReputationService {
    
        /** 
        * @notice adding address to the reputation system if needed. If user was already registered, the function will do nothing 
        * @param user The address to be added to the system
        */
        function register(address user) external;

        /**  
        * @notice blocks given address. 
        * @param user The address to be block in the system
        */
        function ban(address user) external;

        /**
         * @notice increasing reputation for a giving address.
         * @param user The address whose reputation will be increased
         * @param points Points of reputation will be added to current address reputation
         * @return balance The amount reputation points
        */
        function mint(address user, uint points) external returns (uint);

        /**
         * @notice decreasing reputation for a giving address.
         * @param user The address whose reputation will be decreased
         * @param points Points of reputation will be substructed from current address reputation
         * @return balance The amount reputation points
        */
        function burn(address user, uint points) external returns (uint);

        /**
         * @notice return reputation amount for a giving address.
         * @param user The address whose balance requested
         * @return balance The amount reputation points
        */
        function getReputation(address user) external view returns (uint);

        /**
         * @notice returns list of addresses who rated current adress
         * @param _for addres who was rated
         * @return raters A list of addresses, who rated 
        */
        function getRaters(address _for) external view returns (address[] memory);
    }