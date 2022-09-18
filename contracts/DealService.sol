// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    import "hardhat/console.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "./IReputationService.sol";

    contract DealService is Ownable{
        IReputationService reputationService;
        // интеракция в сообществе p2p - это вопрос / предложение / лайк профиля
    
        struct Deal {
            uint id;
            uint timestamp;
            address author;
            DealState state;
            uint confirmationsAmount;
        }

        mapping(uint => Deal) deals;
        Deal[] dealsList;

        enum DealState{
            ON_REVIEW,
            REQUEST_PUBLISHED,
            REJECTED,
            INTERACTING,
            FINALIZED
        }

        struct Confirmation {
            uint id;
            uint dealId;
            uint timestamp;
            address author;
        }
        
        uint openDealsAmount = 0;
        uint confirmationsAmount = 0;

        constructor(address reputationServiceAddress){
            reputationService = IReputationService(reputationServiceAddress);
        }

        function initDeal(bytes32 questionHash) external returns(uint){
            uint id = generateId(questionHash);
            Deal memory deal = Deal({
                id: id,
                timestamp: block.timestamp,
                author: msg.sender,
                state: DealState.ON_REVIEW,
                confirmationsAmount: 0
            });
        
            deals[id] = deal;
            openDealsAmount++;
            dealsList.push(deal);
            return id;
        }
         
        function approveDeal(uint dealId) external {  
            // config.approvable == true
            deals[dealId].state = DealState.REQUEST_PUBLISHED;
        }

        function confirmDeal(uint id, bytes32 answerHash) external {
            uint newId = generateId(answerHash);
            Confirmation memory newConfirmation = Confirmation({
                id: newId,
                dealId: id,
                timestamp:block.timestamp,
                author:msg.sender
            });

            deals[id].confirmationsAmount++;
            //deals[id].confirmationsAsArray.push(newConfirmation);
        }

        function getDeals() external view returns (Deal[] memory){
            return dealsList;
        }

        // function getConfirmationsFor(uint dealId) external view returns (Confirmation[] memory){
        //     return deals[dealId].confirmationsAsArray;
        // }

        function finalizeDeal(uint dealId) external {
            deals[dealId].state = DealState.FINALIZED;     
        }

        function generateId(bytes32 data) internal view returns(uint){
            bytes32 idBytes = keccak256(abi.encodePacked(data, block.timestamp));
            return uint(idBytes);
        }

        function registerUser(address userAddress) internal{
            reputationService.register(userAddress);
        }
}