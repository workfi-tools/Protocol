// SPDX-License-Identifier: MIT
    pragma solidity ^0.8.9;

    import "hardhat/console.sol";
    import "@openzeppelin/contracts/access/Ownable.sol";
    import "./IReputationService.sol";

    contract TransactionService is Ownable{
        IReputationService reputationService;

        constructor(address reputationServiceAddress){
            reputationService = IReputationService(reputationServiceAddress);
        }

        // интеракция в сообществе p2p - это вопрос / предложение / лайк профиля
    
        struct TransactionHeader{
            uint id;
            uint timestamp;
            address author;
            TransactionState state;
        }

        struct Transaction {
            TransactionHeader header;
            uint confirmationsAmount;
            mapping(uint => Confirmation) confirmations;
            Confirmation[] confirmationsAsArray;
        }

        enum TransactionState{
            ON_REVIEW,
            REQUEST_PUBLISHED, // 1е сообщение
            REJECTED, // ответный дизлайк
            INTERACTING, // 1й ответ
            FINALIZED // заблочила 
        }

        struct Confirmation {
            uint id;
            uint transactionId;
            uint timestamp;
            address author;
        }

        mapping (uint => Transaction) transactions;

        TransactionHeader[] transactionHeaders;
        Transaction[] transactionsList;
        
        uint transactionsAmount = 0;
        uint confirmationsAmount = 0;

        function init(bytes32 questionHash) external returns(uint){
            registerUser(msg.sender);

            uint id = generateId(questionHash);
            TransactionHeader memory txHeader = TransactionHeader({
                id: id,
                timestamp: block.timestamp,
                author: msg.sender,
                state: TransactionState.ON_REVIEW
            });

            transactionHeaders.push(txHeader);
            transactions[transactionsAmount].header = txHeader;
            transactionsAmount++;
            return id;
        }

        function publish(uint transactionId) external {  
            console.logUint(uint(transactions[transactionId].header.state));
            transactions[transactionId].header.state = TransactionState.REQUEST_PUBLISHED;
            console.logUint( uint(transactions[transactionId].header.state) );
        }

        function confirm(uint transactionId, bytes32 answerHash) external {
            uint id = generateId(answerHash);
            Confirmation memory newConfirmation = Confirmation({
                id: id,
                transactionId: transactionId,
                timestamp:block.timestamp,
                author:msg.sender
            });

            transactions[transactionId].confirmationsAmount++;
            transactions[transactionId].confirmationsAsArray.push(newConfirmation);
            transactions[transactionId].confirmations[confirmationsAmount++] = newConfirmation;
        }

        function getTransactions() external view returns (TransactionHeader[] memory){
            return transactionHeaders;
        }

        function getConfirmationsFor(uint transactionId) external view returns (Confirmation[] memory){
            return transactions[transactionId].confirmationsAsArray;
        }

        function finalize(uint transactionId) external {
            console.logUint(uint(transactions[transactionId].header.state));
            transactions[transactionId].header.state = TransactionState.FINALIZED;     
            console.logUint( uint(transactions[transactionId].header.state) );
        }

        function generateId(bytes32 data) internal view returns(uint){
            bytes32 idBytes = keccak256(abi.encodePacked(data, block.timestamp));
            return uint(idBytes);
        }

        function registerUser(address userAddress) internal{
            reputationService.register(userAddress);
        }
}