import { HardhatUserConfig } from "hardhat/config";
import '@nomiclabs/hardhat-ethers'
import "@typechain/hardhat"
import "@nomicfoundation/hardhat-chai-matchers"; 
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "@openzeppelin/hardhat-upgrades";
import 'solidity-coverage'


const config: HardhatUserConfig = {
  solidity: "0.8.9",
};

export default config;

