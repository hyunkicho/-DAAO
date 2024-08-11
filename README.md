# DAAO
- DAO(Decentrailzed Autonomous Organization) + AA (Acount Abstratction) + AI
- This part of contract is DAAO contract that includes AIRecorder function to check community comments before execution 

* We deployed our own contract compatable with tally so user could on board easily
* Originall user with EOA Could delegate Voting Power through delegate profile that linked with AA wallet
* New user can deploy their own AAwallet that AI can vote with their comments in twitter

# Tally in Optimism testnet
https://www.tally.xyz/gov/daao-op

# Treasuary(TimeLock) in Optimism testnet
https://www.tally.xyz/gov/daao-op/treasury

# Delegated Profile in Optimism testnet
https://www.tally.xyz/gov/daao-op/delegates

# optimism scan link

- Governor
🔗blockscout link : https://optimism-sepolia.blockscout.com/address/0xAb563D95Aeb44aA2aa4FD49Bb7915E7C55CdEeB9

- Token
🔗blockscout link : https://optimism-sepolia.blockscout.com/address/0xd3631F0ac03Cbee7FeA3ca472064e469385344d1

- Timelock (Treasury)
🔗blockscout link : https://optimism-sepolia.blockscout.com/address/0x97BD38745620387f14e34B3658C316b65da561D1

# Tally in Base testnet
https://www.tally.xyz/gov/daao-base

# Treasuary(TimeLock) in Base testnet
https://www.tally.xyz/gov/daao-base/treasury

# Delegated Profile in Base testnet
https://www.tally.xyz/gov/daao-base/delegates
# base scan link

- Governor
🔗blockscout link : https://base-sepolia.blockscout.com/address/0x9bEe222fDb28F6AedcD9ab349f0c9DCAFFae9a97

- Token
🔗blockscout link : https://base-sepolia.blockscout.com/address/0xaFcAB3B22E92d925fBbF45ae6FA7d1aa85724487

- Timelock (Treasury)

🔗blockscout link : https://base-sepolia.blockscout.com/address/0x7De94f71C5d6DB2Cdd87ceFd8984f8178525a0e4


- proposal that passed but cannot execute without recordAI function
https://www.tally.xyz/gov/daao-base/proposal/11141335929866216605553773698272746369487152417525508155983759260517915090325

# About AI Recorder

to execute proposal it should be recorded by recordAI function in Daao.sol
Third party or program like chainlink functions could run AI model and trigger this function.

* owner could be changed as AA wallet or Colud change onlyOwner as onlySigner if neccesarry in this case but we used ownable here to show basic cases.

```
    function recordAI(
        uint256 _proposalId,
        string memory _uri,
        bytes memory _prompt,
        bool isPassed
    )
        public onlyOwner
    {
        AIDatas[_proposalId].positivePassed = isPassed;
        AIDatas[_proposalId].uri = _uri;
        AIDatas[_proposalId].prompt = _prompt;
    }
```

it could be checked from checkAI and checkAIPass in Daao.sol

```
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
```

This function is motivated from eip 7007 and used could be the same as erc 7007 difference is just 7007 used nft and Daao didn't make checkLogic in NFT format

https://eips.ethereum.org/EIPS/eip-7007

```
    function mint(
        address to,
        bytes calldata prompt,
        bytes calldata aigcData,
        string calldata uri,
        bytes calldata proof
    ) external returns (uint256 tokenId);

    /**
     * @dev Verify the `prompt`, `aigcData`, and `proof`.
     */
    function verify(
        bytes calldata prompt,
        bytes calldata aigcData,
        bytes calldata proof
    ) external view returns (bool success);
```

