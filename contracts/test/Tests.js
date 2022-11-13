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
    await expect(authentication.connect(owner).createPass(adm1.address, 'uri'))
      .to.emit(pass, 'Transfer')
      .withArgs('0x0000000000000000000000000000000000000000', adm1.address, 0)

    expect(await pass.tokenURI(0)).to.eq('uri')
    await expect(
      pass.connect(adm1).safeMintPass(adm1.address, 'uri'),
    ).to.be.revertedWith('You are not owner!')
  })

  it('transfer prohibition', async function () {
    await expect(
      pass.connect(adm1).transferFrom(adm1.address, cli1.address, 0),
    ).to.be.revertedWith('Passport cannot be transferred!!')

    expect(await pass.balanceOf(adm1.address)).to.eq(1)
    expect(await pass.balanceOf(cli1.address)).to.eq(0)
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
