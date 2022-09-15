// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    import "hardhat/console.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "./IReputationService.sol";

    contract ReputationService is IReputationService {
     
 
        function register(address user) external override {}
       
        function ban(address user) external override {}

        function mint(address user, uint points) external override returns (uint) {}
      
        function burn(address user, uint points) external override returns (uint){}

        function getReputation(address user) external override view returns (uint){}

        function getRaters(address _for) external override view returns (address[] memory){}
       

    }