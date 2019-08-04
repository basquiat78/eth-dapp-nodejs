pragma solidity >=0.4.21 <0.6.0;

contract BasquiatContract {
    address payable public owner;
    constructor() public {
        owner = msg.sender;
    }

    address[] public buyerAddrs;
    address[] public sellerAddrs;


    struct BassBuyer {
        uint userId;
        string name;
        string phone;
        address addr;
    }

    event BuyBassLog(
        address buyerAddr,
        address sellerAddr,
        uint id
    );

    mapping(uint256 => BassBuyer) public buyersInfo;


    function buyBass(uint _id, uint _userId, string memory _name, string memory _phone, address payable _seller) public payable {
       buyersInfo[_id] = BassBuyer(_userId, _name, _phone, msg.sender);
       buyerAddrs.push(msg.sender);
       sellerAddrs.push(_seller);
       owner.transfer(10000000000000000);
       _seller.transfer(msg.value - 10000000000000000);

       emit BuyBassLog(msg.sender, _seller, _id);
    }

    function getBuyerInfo(uint256 _userId) public view returns (uint, string memory, string memory, address) {
        return (buyersInfo[_userId].userId, buyersInfo[_userId].name, buyersInfo[_userId].phone, buyersInfo[_userId].addr);
    }

    function getBuyerAddrs() public view returns (address[] memory) {
        return buyerAddrs;
    }

    function getSellerAddrs() public view returns (address[] memory) {
        return sellerAddrs;
    }

}