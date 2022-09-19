// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    import "hardhat/console.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "./IReputationService.sol";

    contract ReputationService is IReputationService, Ownable {
        mapping (address => bool) registered;
        mapping (address => address[]) raters;
      
        /**
        * @notice global storage of reputation per address. 
        */
        mapping (address => uint) reputationStorage;
 
        function register(address user) external {
            require(!registered[user], "User already registered");
             
            reputationStorage[user]=0;
            registered[user] = true;
        }

        function mint(address user, uint points) external returns (uint) {
            require(points > 0, "Only positive");

            reputationStorage[user] = points;
            raters[user].push(msg.sender);
            return reputationStorage[user];
        }

        function getReputation(address user) external view returns (uint){
            require(registered[user], "No such user");

            return reputationStorage[user];
        }

        function getRaters(address _for) external view returns (address[] memory){
            return raters[_for];
        }
      
        function burn(address user, uint points) external returns (uint){}

        function ban(address user) external override {}


    }