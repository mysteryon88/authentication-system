import { ethers } from 'ethers'
import { useState } from 'react'

function ConnectWallet() {
  const [walletAddress, setWalletAddress] = useState('')
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const Address = '0xc4248b1B0E57AB7133E78C441925eB3bC05caAF7'
  const abi = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function balanceOf(address) view returns (uint)',
    'function getIdMyPass() external view returns (address)',
    'function transfer(address to, uint amount)',
    'event Transfer(address indexed from, address indexed to, uint indexed tokenId)',
    'function safeMint(address to, string memory uri)',
    'function tokenURI(uint256 tokenId) view returns (string memory)',
  ]
  let balance

  async function requestAccount() {
    console.log('Requesting account...')

    if (window.ethereum) {
      console.log('detected')

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        setWalletAddress(accounts[0])
      } catch (error) {
        console.log('Error connecting...')
      }
    } else {
      alert('Meta Mask not detected')
    }
  }

  return (
    <>
      {' '}
      <div className="App">
        <button onClick={requestAccount}>Request Account</button>
        <h3>Wallet Address: {walletAddress}</h3>
        <h3>balance: {balance}</h3>
      </div>
    </>
  )
}

export default ConnectWallet
