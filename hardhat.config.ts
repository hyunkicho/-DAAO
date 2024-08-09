import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
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
    sep: {
      url: 'https://rpc.sepolia.org',
      chainId: 11155111,
      accounts: [process.env.PK!]
    }
  }
};

export default config;