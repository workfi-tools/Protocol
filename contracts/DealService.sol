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


        enum DealState{
            ON_REVIEW,
            REQUEST_PUBLISHED,
            REJECTED,
            INTERACTING,
            FINALIZED
        }

        struct Confirmation {
            uint confirmationId;
            uint dealId;
            uint timestamp;
            address author;
        }
  
        uint[] dealIds;
        uint openDealsAmount = 0;

        mapping(uint => Deal) deals;
        mapping(uint => Confirmation) confirmations;
        mapping(uint => Confirmation[]) confirmationsPerDeal;

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
            dealIds.push(id);
            openDealsAmount++;
            return id;
        }
         
        function approveDeal(uint dealId) external {  
            // config.approvable == true
            deals[dealId].state = DealState.REQUEST_PUBLISHED;
        }

        function confirmDeal(uint dealId, bytes32 answerHash) external returns (uint){
            uint newId = generateId(answerHash);
            Confirmation memory newConfirmation = Confirmation({
                confirmationId: newId,
                dealId: dealId,
                timestamp:block.timestamp,
                author:msg.sender
            });

            confirmations[newId] = newConfirmation;
            confirmationsPerDeal[dealId].push(newConfirmation);
            deals[dealId].confirmationsAmount++;
            deals[dealId].state = DealState.INTERACTING;

            return newId;
        }

        function getDealById(uint dealId) external view returns(Deal memory){
            return deals[dealId];
        }

        function getDeals() external view returns (uint[] memory) {
            return dealIds;
        }

        function getConfirmationsFor(uint dealId) external view returns (Confirmation[] memory){
            return confirmationsPerDeal[dealId];
        }

        function finalizeDeal(uint dealId) external {
            deals[dealId].state = DealState.FINALIZED;     
        }

        function generateId(bytes32 data) internal view returns(uint){
            bytes32 idBytes = keccak256(abi.encodePacked(data, block.timestamp));
            return uint(idBytes);
        }

}