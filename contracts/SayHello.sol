
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SayHello{

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
    }

    Wave[] waves;
    uint256 totalWaves;
    uint256 private seed;
    mapping(address => uint256) public lastWavedAt;

    constructor() payable{
        console.log("constructor log");
        //pseudo random number
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public{
        //cooldown 10 mins
        require(lastWavedAt[msg.sender] + 10 minutes < block.timestamp, "wait 10 mins");

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved", msg.sender);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        //50% chance to win 0.01 eth
        if(seed <= 50 ){
            uint256 prizeAmount = 0.01 ether;
            require(prizeAmount <= address(this).balance, "Trying to withdraw more money than the contract has.");
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns (uint256){
        return totalWaves;
    }
}