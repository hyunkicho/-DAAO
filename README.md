# DAAO
- DAO(Decentrailzed Autonomous Organization) + AA (Acount Abstratction) + AI
- This part of contract is DAAO contract that includes AIRecorder function to check community comments before execution 

* We deployed our own contract compatable with tally so user could on board easily
* Originall user with EOA Could delegate Voting Power through delegate profile that linked with AA wallet
* New user can deploy their own AAwallet that AI can vote with their comments in twitter
* If tally didn'y support some chain don't worry. We have verified all of our contract in block scout so If you deploy it it will be automatically verified in blockscout.

# Flow Chart
``` mermaid
flowchart TD
    %% Subgraph for DAAO
    subgraph DAAO
        direction TB
        AAWallet[AA Wallet]
        AI[AI]
        AAWallet --> AI
    end
    
    %% Subgraph for Governance
    subgraph Governance
        direction TB
        Governor[Governor]
        TimeLock[Timelock]
    end
    
    %% Proposal flow
    Proposal[Proposal] -->|1-1. Vote| AAWallet
    AI -->|2-1. Check| Proposal
    Governor -->|submits| Proposal
    Proposal -->|executes| TimeLock
    Governor -->|2-2. Pause| TimeLock
    
    %% Networks with specific colors
    subgraph Networks
        direction LR
        Optimism["Optimism"]
        style Optimism fill:#ff6666,stroke:#ff0000,stroke-width:2px
        
        Base["Base"]
        style Base fill:#6666ff,stroke:#0000ff,stroke-width:2px
        
        Metall2["Metal l2"]
        style Metall2 fill:#cc99ff,stroke:#800080,stroke-width:2px
    end
    
    %% Network connections
    DAAO -.-> Optimism
    DAAO -.-> Base
    DAAO -.-> Metall2
    Governance -.-> Optimism
    Governance -.-> Base
    Governance -.-> Metall2
    
    %% Tally and Blockscout with distinct colors
    Tally["Tally"]
    style Tally fill:#ffff99,stroke:#ffcc00,stroke-width:2px
    
    Blockscout["Blockscout"]
    style Blockscout fill:#99ff99,stroke:#33cc33,stroke-width:2px
    
    %% Blockscout connected to both AA Wallet and Governor
    Blockscout -->|Explore Transactions| AAWallet
    Blockscout -->|Governance Actions| Governor
    
    %% Tally connected to Governor for governance actions
    Tally -->|Governance Actions| Governor
    
    %% Clickable links (optional)
    click AAWallet "https://blockscout.com" "Interact with AA Wallet on Blockscout"
    click Governor "https://tally.xyz" "Governance actions on Tally"
```

# AI Recorder

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

# How to Deploy each Chain

1. make env file with your owner PK

.env
```
PK={YOUT PRIVATE KEY with Testnet token}
```

2. install with npm
```
npm install
```

1. deploy to your favorite chain (optimism, base, metall2)
```
npx hardhat run scripts/01.deploy-all.ts --network op
npx hardhat run scripts/01.deploy-all.ts --network base
npx hardhat run scripts/01.deploy-all.ts --network metal
```
1. You could get Contract Address And use it in your own DAO page or Use Third party dao tool like tally

```
deployer >> 0x2bA174b105176A1B5098b3A3d2027d63Edf07E6c
DaaoToken contract deployed to: 0xd3631F0ac03Cbee7FeA3ca472064e469385344d1
timelockControllerAddress contract deployed to: 0x97BD38745620387f14e34B3658C316b65da561D1
Daao contract deployed to: 0xAb563D95Aeb44aA2aa4FD49Bb7915E7C55CdEeB9
grantAllRoleToDaoTx tx: 0xcc726621e890fc6de5efe7761ecb5ab3c4a559e55bc1cc378159a5383a6a71af
```


# Optimism Testnet

## Tally in Optimism testnet
https://www.tally.xyz/gov/daao-op

## Treasuary(TimeLock) in Optimism testnet
https://www.tally.xyz/gov/daao-op/treasury

## Delegated Profile in Optimism testnet
https://www.tally.xyz/gov/daao-op/delegates

## optimism 🔗blockscout link

👨‍⚖️ Governor (Daao.sol) : https://optimism-sepolia.blockscout.com/address/0xAb563D95Aeb44aA2aa4FD49Bb7915E7C55CdEeB9

🪙 Token (DaaoToken.sol) : https://optimism-sepolia.blockscout.com/address/0xd3631F0ac03Cbee7FeA3ca472064e469385344d1

⏰Timelock Treasury (DaaoTimelock.sol): https://optimism-sepolia.blockscout.com/address/0x97BD38745620387f14e34B3658C316b65da561D1

# Base Testnet

## Tally in Base testnet
https://www.tally.xyz/gov/daao-base

## Treasuary(TimeLock) in Base testnet
https://www.tally.xyz/gov/daao-base/treasury

## Delegated Profile in Base testnet
https://www.tally.xyz/gov/daao-base/delegates

## base 🔗blockscout link

👨‍⚖️ Governor (Daao.sol) : https://base-sepolia.blockscout.com/address/0x9bEe222fDb28F6AedcD9ab349f0c9DCAFFae9a97

🪙 Token (DaaoToken.sol) : https://optimism-sepolia.blockscout.com/address/0xd3631F0ac03Cbee7FeA3ca472064e469385344d1

⏰Timelock Treasury (DaaoTimelock.sol): https://base-sepolia.blockscout.com/address/0x7De94f71C5d6DB2Cdd87ceFd8984f8178525a0e4


- proposal that passed but cannot execute without recordAI function
https://www.tally.xyz/gov/daao-base/proposal/11141335929866216605553773698272746369487152417525508155983759260517915090325

# Metal L2 Testnet

## Use Block Scout Instead of Tally
Metal L2 didn't support tally but user could use verified contracts in BlockScout.
We have alredy verified it so you don't need any further process

verify script for block scout
```
npx hardhat verify --constructor-args arguments_daaoTimelock.js --network <YoutNetwork> <ContractAddress> 

npx hardhat verify --constructor-args --network <YoutNetwork> <arg1> <arg2>
```

## Metal L2 🔗blockscout link

👨‍⚖️ Governor (Daao.sol) : https://testnet.explorer.metall2.com/address/0xAb563D95Aeb44aA2aa4FD49Bb7915E7C55CdEeB9

🪙 Token (DaaoToken.sol) : https://testnet.explorer.metall2.com/address/0xd3631F0ac03Cbee7FeA3ca472064e469385344d1

⏰Timelock Treasury (DaaoTimelock.sol): https://testnet.explorer.metall2.com/address/0x97BD38745620387f14e34B3658C316b65da561D1
