const BasquiatContract = artifacts.require("BasquiatContract");

module.exports = function(deployer) {
  deployer.deploy(BasquiatContract);
};
