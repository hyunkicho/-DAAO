// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AIRecorder {
    struct AIData {
        bool positivePassed;
        string uri;
        bytes prompt;
    }
    mapping(uint256 proposalId => AIData) public AIDatas;
    constructor()
    {}

    function checkAI(
        uint256 _proposalId
    ) public view returns (AIData memory){
        return AIDatas[_proposalId];
    }

    function checkAIPass(
        uint256 _proposalId
    ) public view returns (bool){
        return AIDatas[_proposalId].positivePassed;
    }
}