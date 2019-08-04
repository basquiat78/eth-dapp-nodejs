# dapp-step-5

## 시나리오    

시나리오라서 다소 엉성할 수 있다. 

1. owner 계정 설정

2. 구입을 하게 되면 제품의 id를 키값으로 구입자 정보에 매핑한다.

3. 구입자와 판매자의 주소를 세팅을 한다.

4. 스마트컨트랙트 배포자의 주소로 수수료를 보낸다.
   - 현재 sol파일에는 10000000000000000을 수수료로 책정.
   - sol파일에서는 wei단위기 때문에 위 수수료는 0.01이더에 해당

5. 판매자에게 수수료를 제외한 이더를 보낸다.

6. event를 발생시켜 해당 로그를 남긴다. 
   - 로그 정보는 구입자, 판매자, 제품의 아이디를 가진다.

밑에 sol파일을 보자.    

각 라인에 주석을 남겼다.

```
pragma solidity >=0.4.21 <0.6.0;

contract BasquiatContract {

    // onwer 변수 설정 payable은 내부에서 transfer와 관련해서 해당 주소가 payable이여야 한다.
    // 예전 버전과는 좀 달라진 부분이다. 이것은 보안 문제와 관련된 부분이라고 한다.
    address payable public owner;

    // 생성자에 처음 해당 컨트랙트가 배포될때 배포한 주소를 owner로 설정한다.
    // 배포시에는 가나슈에서 첫 번째 계정이 되겠다.
    constructor() public {
        owner = msg.sender;
    }

    // 구입자와 판매자의 주소를 배열에 담을 것이다.
    address[] public buyerAddrs;
    address[] public sellerAddrs;

    // 베이스 구입자의 정보를 담는 struct, 즉 객체 정보
    struct BassBuyer {
        uint userId;
        string name;
        string phone;
        address addr;
    }

    // evnet 설정이다. 
    event BuyBassLog(
        address buyerAddr,
        address sellerAddr,
        uint id
    );

    // mapping에 구입자의 정보를 담을 것이다.
    mapping(uint256 => BassBuyer) public buyersInfo;

    // buyBass는 호출 시점에 제품의 아이디와 사용자의 정보, 그리고 판매자의 이더 주소가 넘어온다.
    // public payable은 해당 펑션에서 transfer가 발생하기 때문에 넣어줘야 한다. 이것은 보안 문제와 관련된 부분이라고 한다.
    function buyBass(uint _id, uint _userId, string memory _name, string memory _phone, address payable _seller) public payable {
       // 넘겨받은 정보로 BassBuyer객체를 생성하고 mapping에 키값으로 제품 아이디를 세팅한다.
       buyersInfo[_id] = BassBuyer(_userId, _name, _phone, msg.sender);

       // 배열에 판매자, 구입자의 주소를 넣는다.
       // msg.sender의 의미는 해당 컨트랙트를 호출한 사람의 주소가 되겠다.
       buyerAddrs.push(msg.sender);
       sellerAddrs.push(_seller);
       
       // 해당 컨트랙트를 배포한 소유자에게 0.01이더를 전송한다.
       owner.transfer(10000000000000000);
       // 판매자에게 해당 수수료를 제외한 이더를 전송한다.
       _seller.transfer(msg.value - 10000000000000000);

       // 로그를 남긴다.
       emit BuyBassLog(msg.sender, _seller, _id);
    }

    // 구매자정보 가져오기
    function getBuyerInfo(uint256 _id) public view returns (uint, string memory, string memory, address) {
        return (buyersInfo[_id].userId, buyersInfo[_id].name, buyersInfo[_id].phone, buyersInfo[_id].addr);
    }

    // 구매자들의 주소를 가져온다.
    function getBuyerAddrs() public view returns (address[] memory) {
        return buyerAddrs;
    }

    // 판매자들의 주소를 가져온다.
    function getSellerAddrs() public view returns (address[] memory) {
        return sellerAddrs;
    }

}

```

자 그럼 배포를 해보자.    

1. ganache를 띄운다.

2. basquiat-blockchain폴더를 열은 vscode에서 터미널을 하나 열자.

다음과 같이 실행을 하면 스마트 컨트랙트를 배포한다.

```
PS C:\basquiat-blockchain\truffle> truffle migrate --compile-all --reset --network ganache

Compiling your contracts...
===========================
> Compiling .\contracts\BasquiatContract.sol
> Compiling .\contracts\Migrations.sol
> Artifacts written to C:\basquiat-blockchain\truffle\build\contracts
> Compiled successfully using:
   - solc: 0.5.8+commit.23d335f2.Emscripten.clang


Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x88b1c34a088840d8626821b07642fee4063252a4d4abc4a98cef9a5c00ef67aa
   > Blocks: 0            Seconds: 0
   > contract address:    0x65DE1879b152161432d56cD9d13dA0c2fa9cE89C
   > block number:        1
   > block timestamp:     1564899998
   > account:             0x5Eab856D2Df4bE1D156eB17F7fca09ABb86323E2
   > balance:             99.99477214
   > gas used:            261393
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00522786 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00522786 ETH


2_basquiat_contract.js
======================

   Replacing 'BasquiatContract'
   ----------------------------
   > transaction hash:    0x0fc82591eca6665accde80c428779e3ac15cd5921e8cff589ef6c7333f514e54
   > Blocks: 0            Seconds: 0
   > contract address:    0xcDe8bB24d67FBCBd66b5DD6ac013041120947f1E
   > block number:        3
   > block timestamp:     1564900000
   > account:             0x5Eab856D2Df4bE1D156eB17F7fca09ABb86323E2
   > balance:             99.97184866
   > gas used:            1104151
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.02208302 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.02208302 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.02731088 ETH
```

3. 가나슈 콘솔을 열어보자

```
PS C:\basquiat-blockchain\truffle> truffle console --network ganache
truffle(ganache)>
```

4. instance생성하자.

```
truffle(ganache)> let instance = await BasquiatContract.deployed()
undefined
```

5. account정보를 확인해 보자.

```
truffle(ganache)> let accounts = await web3.eth.getAccounts()
undefined
truffle(ganache)> accounts
[ '0x5Eab856D2Df4bE1D156eB17F7fca09ABb86323E2',
  '0x5f77cf7b308F0D9fDEe4dd7364c9c221c15BE743',
  '0x0eB77EC9AB37BDb9162396B410B0342a5149B14B',
  '0xDeCB4d20181be7D5Da6b780410F223BD5A33feEB',
  '0xFD3c9F190E9F62f95B5eDdb1F5214271251A124c',
  '0xd7CF4f9d393D41B58D8183980a3892c75714a548',
  '0xfb7D1CFe1B4f5Ac51Ac1c1E9d0c5061132d08d0a',
  '0x5Ff774b4d03eE8558ccCe1492244396F4B582c97',
  '0x0e1fE87715E88BBf48452ab197A853fF4fB05313',
  '0x1E965d3e2b0933b71183F0Eb8697F45e45369eAa' ]
```

6. 베이스 구입전에 첫번째 컨트랙트를 배포한 주소의 발란스를 먼저 체크해 보자

```
truffle(ganache)> web3.eth.getBalance(accounts[0])
'99970395060000000000'
```

7. 이제는 구입을 해보자

제품 아이디는 1, 유저 아이디도 1, 이름과 폰번호, 그리고 판매자의 주소를 세팅한다.

뒤에 {from: accounts[4], value:web3.utils.toWei("10", "ether")} 이 부분은 구매자의 정보이다.
순서대로 구매자의 주소는 4번째 인덱스의 주소가 구매자이고 10이더를 지불했다.

```
truffle(ganache)> instance.buyBass(1, 1, "Basquiat78", "010-0000-0000", accounts[5], {from: accounts[4], value:web3.utils.toWei("10", "ether")})
{ tx:
   '0x9689e6975727ad11094100cfe5dc75465a632befd7d84414cddc63a2c459c0c1',
  receipt:
   { transactionHash:
      '0x9689e6975727ad11094100cfe5dc75465a632befd7d84414cddc63a2c459c0c1',
     transactionIndex: 0,
     blockHash:
      '0x16ea341941f7a132eeea2fbfe1d34e34339bceca984bcca55517eb0d13c8dbb7',
     blockNumber: 5,
     from: '0xfd3c9f190e9f62f95b5eddb1f5214271251a124c',
     to: '0xcde8bb24d67fbcbd66b5dd6ac013041120947f1e',
     gasUsed: 206262,
     cumulativeGasUsed: 206262,
     contractAddress: null,
     logs: [ [Object] ],
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000004000000000000000000000000000000000002000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000080000000000000000000000',
     v: '0x1c',
     r:
      '0x295be2270b2950c8fef5af456db981e13f884777756ed576be2e6c4d953ef75f',
     s:
      '0x12c73edd9265493554da9c65f546348872a2be43cdef866c792a7d98910630bb',
     rawLogs: [ [Object] ] },
  logs:
   [ { logIndex: 0,
       transactionIndex: 0,
       transactionHash:
        '0x9689e6975727ad11094100cfe5dc75465a632befd7d84414cddc63a2c459c0c1',
       blockHash:
        '0x16ea341941f7a132eeea2fbfe1d34e34339bceca984bcca55517eb0d13c8dbb7',
       blockNumber: 5,
       address: '0xcDe8bB24d67FBCBd66b5DD6ac013041120947f1E',
       type: 'mined',
       id: 'log_475aa1d4',
       event: 'BuyBassLog',
       args: [Result] } ] }
```
위에 로그 부분을 보면 BuyBassLog라고 event부분이 생성된것을 볼 수 있다.

차후 이것을 통해서 알림같은 것을 설정할 것이다.     


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-5/capture/shot1.PNG)    

자 이미지에서 알 수 있듯이 구매자인 4번째 인덱스 즉 5번째 주소에서 10이더가 빠져나갔다. 실제로 발란스를 찍으면 90이더보다 작을 것이다.     
수수료때문에 근데 가나슈에서 반올림하는듯 하다.

그리고 판매자인 5번째 인덱스 즉 6번째 주소에는 9.99이더가 들어왔다. 수수료 0.01이더가 빠졌으니 정확하게 입금이 완료되었다.

그럼 스마트 컨트랙트 주소의 잔금을 확인해 보자.     

```
truffle(ganache)> web3.eth.getBalance(accounts[0])
'99980395060000000000'
```

처음에 발란스를 가져왔을 때는 '99970395060000000000'인데 '99980395060000000000'로 바꼈다.     


이제부터는 web3j와 nodejs을 연계해서 웹페이지를 만들고 실제로 구입하는 것을 만들어 볼 예정이다.     