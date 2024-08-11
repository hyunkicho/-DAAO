import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100000,
      },
    },
  },
  gasReporter: {
    enabled: true
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://sepolia.base.org'
      }
    },
    base: {
      url: 'https://sepolia.base.org',
      chainId: 84532,
      accounts: [process.env.PK!]
    },
    op: {
      url: 'https://sepolia.optimism.io',
      chainId: 11155420,
      accounts: [process.env.PK!]
    },
    metal: {
      url: 'https://testnet.rpc.metall2.com',
      chainId: 1740,
      accounts: [process.env.PK!]
    }
  },
  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      'optimism-sepolia': "abc",
      'base-sepolia': "abc",
      'metall2': "abc"

    },
    customChains: [
      {
        network: "optimism-sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://optimism-sepolia.blockscout.com/api",
          browserURL: "https://optimism-sepolia.blockscout.com/",
        }
      },
      {
        network: "base-sepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://optimism-sepolia.blockscout.com/",
        }
      },
      {
        network: "metall2",
        chainId: 1740,
        urls: {
          apiURL: "https://testnet.explorer.metall2.com/api/",
          browserURL: "https://testnet.explorer.metall2.com/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};

export default config;