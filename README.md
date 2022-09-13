
This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```


# Standards
## Soulbound tokens (EIP-5516)

#### Abstract
This EIP proposes a standard interface for non-fungible double signature Soulbound multi-tokens. Previous account-bound token standards face the issue of users losing their account keys or having them rotated, thereby losing their tokens in the process. This EIP provides a solution to this issue that allows for the recycling of SBTs.

# Tech
## General
### Overview (https://docs.openzeppelin.com/contracts/4.x/)
1. Reputation point is an ERC-20 token without `transfer-like` functions. You can only mint and burn reputation but cannot transfer it.
1. Each account should have a `displayName` atribute. [EIP-4972](https://eips.ethereum.org/EIPS/eip-4972) is not acceptable there: this EIP is not recomended. 
We will implement it by ourself.
1. The ERC-721 standart contains methods we do not need in SBT (i.e. `approve`, `setApprovalForAll` ... ).  
1. [EIP-5192](https://eips.ethereum.org/EIPS/eip-5192) does not provide any information about methods we can use to transfer it. Only `locked` function. 
1. We also researched [EIP-5516](https://eips.ethereum.org/EIPS/eip-5516). As we can see it allows to work with batches. However, this is unclear why `transfer` functions are needed.  
1. A quick look on [EIP-5114](https://eips.ethereum.org/EIPS/eip-5114) showed it links to NFT not to an address. It will be helpful for labels feature. Label will be linked to users' NT NFT.It is important to note that the label is attached to the user regardless of confirmation. For example, if the user is banned, the label 'banned' is hunging without a confirmation request.
1. [EIP-5006](https://eips.ethereum.org/EIPS/eip-5006) and [EIP-5334](https://eips.ethereum.org/EIPS/eip-5334) are good too. These standarts allow to set any roles for a time. Temporary admin, leader of the day and so on.
#### Conclusion
There is no applicable standard for user representation. As a basic solution we are going to take ERC-721 nd ERC-1155 and exclude all of `transfer`-like methods
### Interfaces
### API (Library structure)
[Visit our GitHub](https://github.com/workfi-tools/Protocol/tree/code/code/interface)
#### Error codes
### Architecture and components
#### Smart-contracts
#### SDK (Typescript)
#### Widgets
## Contributor guide
## Principles
1. Actively research and integrate existed standards and going to propose  our own standards
1. Use ERC-721 without `transfer`-like funcitions.
1. [EIP-5484](https://eips.ethereum.org/EIPS/eip-5484) is good for us. It's acceptable for cases when we need to revoke label. 
For example token has been minte by mistake or it's not relevant right now (user is not "Leader" or "banned" anymore).
1. User of the system is a Non-transferable NFT.
1. It's preferable to use [EIP-1261](https://eips.ethereum.org/EIPS/eip-1261) to organize membership mechanics in the project. Usefull extension for ERC-721.
1. [EIP-4973](https://eips.ethereum.org/EIPS/eip-4973) is good to assign labels/roles/certificates/permissons/etc. 
Opened question: who can revoke (call `unequip` function) for minted label? 
The best condition is opportunity for user to unequip 'positive' (teamleader/best player/etc/) labels and only issuer can unequip 'negative' (banned/unreliable/etc.) labels.
1. User has different reputation for several domains: C#-developer, DBA, Project managment, Finance, etc. [EIP-4834](https://eips.ethereum.org/EIPS/eip-4834) is chosen way to organize domain system.  
1. Use [openzeppelin](https://www.openzeppelin.com) solutions as default. Extend it if needed.
1. Implement reputation controller over the above standards (ERC/EIP);
1. Must use: EIP-165 to provide documentation and make the solution more dev-friendly.
## Standards
## Library usage scenarios
###
[Visit our GitHub](https://github.com/workfi-tools/Protocol/tree/code/code/scenario)
### Tools for your platform
#### SC integration 
#### Telegram/Discord bot integration
### Websevice integration
### Backend integration
## Guides