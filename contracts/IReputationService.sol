// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    import "hardhat/console.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";

    abstract contract IReputationService is Ownable {
        /**
        * @notice global storage of reputation per address. 
        */
        mapping (address => uint) reputationStorage;

        /** 
        * @notice adding address to the reputation system. 
        * @param user The address to be added to the system
        */
        function register(address user) external virtual;

        /**  
        * @notice blocks given address. 
        * @param user The address to be block in the system
        */
        function ban(address user) external virtual;

        /**
         * @notice increasing reputation for a giving address.
         * @param user The address whose reputation will be increased
         * @param points Points of reputation will be added to current address reputation
         * @return balance The amount reputation points
        */
        function mint(address user, uint points) external virtual returns (uint);

        /**
         * @notice decreasing reputation for a giving address.
         * @param user The address whose reputation will be decreased
         * @param points Points of reputation will be substructed from current address reputation
         * @return balance The amount reputation points
        */
        function burn(address user, uint points) external virtual returns (uint);

        /**
         * @notice return reputation amount for a giving address.
         * @param user The address whose balance requested
         * @return balance The amount reputation points
        */
        function getReputation(address user) external virtual view returns (uint);

        /**
         * @notice returns list of addresses who rated current adress
         * @param _for addres who was rated
         * @return raters A list of addresses, who rated 
        */
        function getRaters(address _for) external virtual view returns (address[] memory);
    }