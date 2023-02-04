const { expect } = require('chai');
const { ethers } = require('hardhat')

describe('Counter', () => {
  let counter
  let count = 0

  beforeEach( async () => {
    const Counter = await ethers.getContractFactory('Counter')
    counter = await Counter.deploy('My Counter', 1)
  })

  describe('Deployment', () => {
    it('Should set the initial count', async () => {
      count = await counter.count()
      expect(count).to.equal(1)
    })
  
    it('Should set the initial name', async () => {
      const name = await counter.name()
      expect(name).to.equal('My Counter')
    })
  })

  describe('Counting', () => {
    let transaction

    it('Should read the count from the "count" public variable', async () => {
      expect(await counter.count()).to.equal(1)
    })

    it('Should read the count from the "getCount()" function', async () => {
      expect(await counter.getCount()).to.equal(1)
    })

    it('Should increment the count', async () => {
      transaction = await counter.increment()
      await transaction.wait()

      expect(await counter.count()).to.equal(parseInt(count) + 1)
      console.log('count in increment', count);
    })

    it('Should decrement the count', async () => {
      transaction = await counter.decrement()
      await transaction.wait()

      expect(await counter.count()).to.equal(parseInt(count) - 1)
      console.log('count in decrement', count);

      // Cannot decrement count below 0
      await expect(counter.decrement()).to.be.reverted
    })

    it('Should read the name from the "name" public variable', async () => {
      expect(await counter.name()).to.equal('My Counter')
    })

    it('Should read the name from the "getName()" function', async () => {
      expect(await counter.getName()).to.equal('My Counter')
    })

    it('Should update the name', async () => {
      transaction = await counter.setName('New Name')
      await transaction.wait()
      expect(await counter.name()).to.equal('New Name')
    })
  })
})