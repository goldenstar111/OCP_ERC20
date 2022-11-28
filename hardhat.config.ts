import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { ethers } from "hardhat";

const { mnemonic } = require("./secrets.json");

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ]

  },

  defaultNetwork: "localhost",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {},
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 10000000000,
      accounts: { mnemonic: mnemonic },
    },
    mainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 5000000000,
      accounts: { mnemonic: mnemonic },
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      chainId: 137,
      gasPrice: 30000000000,
      accounts: { mnemonic: mnemonic },
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com/",
      chainId: 80001,
      gasPrice: 35000000000,
      accounts: { mnemonic: mnemonic },
    },
    goerli: {
      url: "https://ethereum-goerli-rpc.allthatnode.com/",
      chainId: 5,
      gasPrice: 1000000000,
      accounts: { mnemonic: mnemonic },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    gasPriceApi: "https://api.bscscan.com/api?module=proxy&action=eth_gasPrice",
  },
  etherscan: {
    apiKey: "4XUJHMZYB165K3YESM5CNBDJEFXXISDHRK", // bsc
    // apiKey: "47EUCZERJIJ827FJUE684972AZ7AI8899N", // ether
    // apiKey: "VIG1BCW6F6WQP3X9ZYCTZISXVA7VSTX3ZA", // mumbai
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./frontend/src/artifacts",
  },
};

export default config;
