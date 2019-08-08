import truffleContract from 'truffle-contract'
import { async } from 'q';

const BassMarketContract = {
  contract: null,
  instance: null,
  event: null,

  init: async function (contractJson, event) {
    this.contract = truffleContract(contractJson);
    this.contract.setProvider(window.web3.currentProvider);
    this.instance = await BassMarketContract.contract.deployed();
    this.event = event;
    return this.instance;
  },

  account: async () => {
    let accounts = await web3.eth.getAccounts();
    return accounts[0];
  },

  buyBass: async (id, userId, name, phone, seller, buyer, price) => {
    let result = await BassMarketContract.instance.buyBass(id, userId, name, phone, seller, {from: buyer, value:web3.utils.toWei(price.toString(), "ether")});
    return result;
  },
  getSellers: async () => {
    let sellerAddrs = await BassMarketContract.instance.getSellerAddrs.call();
    return sellerAddrs;
  },

  getBuyers: async () => {
    let buyersAddrs = await BassMarketContract.instance.getBuyerAddrs.call();
    return buyersAddrs;
  },

  getBuyerInfo: async (id) => {
    let buyerInfo = await BassMarketContract.instance.getBuyerInfo(id);
    return buyerInfo;
  },

  logEvents: () => {
    BassMarketContract.instance.BuyBassLog({filter: {}, fromBlock: 0}, (error, event) => {
      BassMarketContract.event.$emit('eventLog', event);
    })
  }

}

export default BassMarketContract;