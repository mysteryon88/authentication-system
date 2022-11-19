require('@nomicfoundation/hardhat-toolbox')
require('hardhat-abi-exporter')
require('dotenv').config()

const privateKey = process.env.PRIVATE_KEY
const endpoint = process.env.URL
const etherscanKey = process.env.ETHERSCAN_KEY
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.17',
  networks: {
    goerli: {
      url: endpoint,
      accounts: [`0x${privateKey}`],
    },
  },
  etherscan: {
    apiKey: {
      goerli: etherscanKey,
    },
  },
}

