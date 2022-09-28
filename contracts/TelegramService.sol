// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { Message, Reply, MessageRepository } from "./MessageRepository.sol";

contract TelegramService is Ownable {
    MessageRepository repository;

    constructor(address messageRepository){
        repository = MessageRepository(messageRepository);
    }    

    function startThread(bytes32 messageHash) external returns(uint) {
        Message memory message;
        
        message.timestamp = block.timestamp;
        message.author = msg.sender;
        message.msgHash = messageHash;

        return repository.addMessage(message);
    }

    function replyThread(uint messageId, bytes32 messageHash) external returns(uint){
        Message memory startMessage = repository.getMessageById(messageId);
        require(startMessage.timestamp > 0, "No such message");

        Reply memory reply;
        reply.startThreaMessageId = startMessage.id;
        reply.message.timestamp = block.timestamp;
        reply.message.author = msg.sender;
        reply.message.msgHash = messageHash;

        return repository.addReply(reply);
    }

    function getQuestionById(uint id) external view returns (Message memory) {
        return repository.getMessageById(id);
    }

    function getOpenQuestions() external view returns (Message[] memory) {
        return repository.getMessages();
    }

    function getOpenQuestionsIds() external view returns (uint[] memory) {
        return repository.getMessagesIds();
    }

    function getReplysForMessage(uint id) external view returns (Reply[] memory){
        return repository.getReplysFor(id);
    }
    




}