// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    import "hardhat/console.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "./IReputationService.sol";

    contract DealService is Ownable{
        IReputationService reputationService;

        // интеракция в сообществе p2p - это вопрос / предложение / лайк профиля
    
        struct DealHeader{
            uint id;
            uint timestamp;
            address author;
            DealState state;
        }

        struct Deal {
            DealHeader header;
            uint confirmationsAmount;
            Confirmation[] confirmationsAsArray;
        }

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

        mapping (uint => Deal) deals;

        DealHeader[] dealHeaders;
        Deal[] dealsList;
        
        uint dealsAmount = 0;
        uint confirmationsAmount = 0;

        constructor(address reputationServiceAddress){
            reputationService = IReputationService(reputationServiceAddress);
        }


        function initDeal(bytes32 questionHash) external returns(uint){
            uint id = generateId(questionHash);
            DealHeader memory dealHeader = DealHeader({
                id: id,
                timestamp: block.timestamp,
                author: msg.sender,
                state: DealState.ON_REVIEW
            });

            dealHeaders.push(dealHeader);
            deals[dealsAmount].header = dealHeader;
            dealsAmount++;
            return id;
        }

         
        function approveDeal(uint dealId) external {  
            // config.approvable == true
            deals[dealId].header.state = DealState.REQUEST_PUBLISHED;
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
            deals[id].confirmationsAsArray.push(newConfirmation);
        }

        function getDeals() external view returns (DealHeader[] memory){
            return dealHeaders;
        }

        function getConfirmationsFor(uint dealId) external view returns (Confirmation[] memory){
            return deals[dealId].confirmationsAsArray;
        }

        function finalizeDeal(uint dealId) external {
            deals[dealId].header.state = DealState.FINALIZED;     
        }

        function generateId(bytes32 data) internal view returns(uint){
            bytes32 idBytes = keccak256(abi.encodePacked(data, block.timestamp));
            return uint(idBytes);
        }

        function registerUser(address userAddress) internal{
            reputationService.register(userAddress);
        }
}