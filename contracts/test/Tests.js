const { expect } = require('chai')
const { ethers } = require('hardhat')
const abi = require('../abi/contracts/Passport.sol/Passport.json')

let owner, adm1, adm2, cli1, cli2, authentication, pass

before(async function () {
  const Authentication = await ethers.getContractFactory(
    'Authentication',
    owner,
  )
  authentication = await Authentication.deploy()
  ;[owner, adm1, amd2, cli1, cli2] = await ethers.getSigners()
  const from = authentication.address
  const nonce = 1
  const addrPass = ethers.utils.getContractAddress({ from, nonce })
  pass = new ethers.Contract(addrPass, abi, owner)
})

describe('Passport', function () {
  it('Authentication should be deployed', async function () {
    expect(authentication.address).to.be.properAddress
  })
  it('Mint pass', async function () {
    await authentication.connect(owner).createPass(cli1.address, 'uri')

    expect(await pass.tokenURI(1)).to.eq('uri')
    await expect(
      pass.connect(adm1).safeMintPass(adm1.address, 'uri'),
    ).to.be.revertedWith('You are not owner!')
  })
})

describe('Access', function () {
  it('Authentication should be deployed', async function () {
    await expect(authentication.address).to.be.properAddress
  })
  it('onlyOwner', async function () {
    await expect(
      authentication.connect(adm1).setupAdmin(adm1.address),
    ).to.be.revertedWith('You are not owner!')
  })
  it('setupAdmin', async function () {
    await authentication.connect(owner).setupAdmin(adm1.address)
    expect(await authentication.admins(adm1.address)).to.eq(true)
  })
  it('revokeAdmin', async function () {
    await authentication.connect(owner).revokeAdmin(adm1.address)
    expect(await authentication.admins(adm1.address)).to.eq(false)
  })
  it('setupOwner', async function () {
    await authentication.connect(owner).setupOwner(adm1.address)
    expect(await authentication.owner()).to.eq(adm1.address)
  })
})

describe('Authentication', function () {
  it('sendRequest() + event Request', async function () {
    await expect(authentication.connect(cli1).sendRequest())
      .to.emit(authentication, 'Request')
      .withArgs(0, cli1.address)
  })
})
