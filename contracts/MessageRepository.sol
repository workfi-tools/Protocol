// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

 struct Message {
    uint id;
    uint timestamp;
    address author;
    bytes32 msgHash;
    uint replysAmount;
}

/**
 * Internal structure. 
 * Includes Message
 * @dev arrayIndex stores index in {messagesArray}
 */
struct _Message {
    Message message;
    uint arrayIndex;
}

/**
 * Reply is a Message. Reply stores a link to previous message.
 * Example:
 *          Message
 *         /       \
 *  Reply-1         Reply-2
 *                 /       \
 *        Reply-2-1         Reply-2-2
 *       /       
 *  Reply-2-1-1
 * 
 */
struct Reply  {
    uint startThreaMessageId;
    Message message;
}

/**
 * Internal structure. 
 * Includes Reply
 * @dev arrayIndex stores index in {replaysArray}
 */
struct _Reply {
    Reply reply;
    uint arrayIndex;
}


contract MessageRepository is Ownable {
    /**
     * Storing collection of messages. 
     * @dev messageId -> Message
     */
    mapping(uint => _Message) messages;
    
    /**
     * Storing array of messages. 
     * @dev message.arrayIndex stores index in this array
     */
    Message[] messagesArray;
   
    /**
     * Storing array of ids. 
     * @dev message.arrayIndex stores index in this array
     */
    uint[] messagesIds;
   
    /**
     * Storing array of messages. 
     * @dev message.arrayIndex stores index in this array
     */
    Reply[] replaysArray;

    /**
     * Storing collection of replys. 
     * @dev replyId -> Reply
     */
    mapping(uint => _Reply) replys;

    /**
     * Storing collection of replys per message. 
     * @dev messageId -> Reply[]
     */
    mapping(uint => Reply[]) replysPerMessage;


    function addMessage(Message memory message) public returns (uint) {
        message.id = generateId(message.msgHash);
        
        messagesArray.push(message);

        _Message memory _message;
        _message.message = message;
        _message.arrayIndex = messagesArray.length-1;
        messages[message.id] = _message;
        messagesIds.push(message.id);

        return message.id;
    }

    function addReply(Reply memory reply) public returns (uint) {
        addMessage(reply.message);
        
        replaysArray.push(reply);

        _Reply memory _reply;
        _reply.reply = reply;
        _reply.arrayIndex = replaysArray.length-1;

        replys[reply.message.id] = _reply;
        replysPerMessage[reply.startThreaMessageId].push(reply);
        
        messages[reply.startThreaMessageId].message.replysAmount++;
        uint index = messages[reply.startThreaMessageId].arrayIndex;
        messagesArray[index].replysAmount++;

        return reply.message.id;
    }

    function getMessageById(uint id) public view returns (Message memory) {
        return messages[id].message;
    }

    function getMessagesIds() public view returns (uint[] memory) {
        return messagesIds;
    }

    function getMessages() public view returns (Message[] memory) {
        return messagesArray;
    }

    function getReplysFor(uint id) public view returns (Reply[] memory) {
        return replysPerMessage[id];
    }

    function generateId(bytes32 data) internal view returns(uint) {
        bytes32 idBytes = keccak256(abi.encodePacked(data, block.timestamp));
        return uint(idBytes);
    }
}