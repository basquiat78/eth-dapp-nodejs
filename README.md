# dapp-step-4

## Ganache와 연동하기    

VSCODE를 통해서 basquiat-blockchain의 truffle폴더로 열어서 지금까지 해왔다.    

일단 truffle-config.js을 열어보면 수많은 주석과 함께 껍데기 코드만 있다는 것을 알 수 있다.    

일단 가나슈를 띄운다.    


일단 truffle-config.js의 주석들은 무시하고 다음과 같이 코드를 작성한다.    

```
  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    // development: {
    //  host: "127.0.0.1",     // Localhost (default: none)
    //  port: 8545,            // Standard Ethereum port (default: none)
    //  network_id: "*",       // Any network (default: none)
    // },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    }

```    

코드를 보면 주석은 기존에 생성된 내용들이다.    

주석의 예제로 적혀져 있는 development의 내용을 좀 수정해서 작성한다.    
일단 나는 주석은 그냥 남겨두고 development주석 밑에 ganache라는 이름으로 작성을 했다.    

vscode에서 터미널에 다음과 같이 기존의 만들어 놓은 컨트랙트를 배포해 보자.     

```
PS C:\basquiat-blockchain\truffle> truffle migrate --compile-all --reset --network ganache
```

이 명령어는 다음 https://www.trufflesuite.com/docs/truffle/reference/truffle-commands 링크에서 확인할 수 있다. 옵션 정보는 해당 사이트에서 확인 할 수 있다.    


그러면 다음과 같이 콘솔에 내용을 찍는다.    

```

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
   > block timestamp:     1564806834
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
   > transaction hash:    0x7e28bf1dc5740ff55ce46611694a9c7e8ddb4077849d32e010bdb6256a8ce861
   > Blocks: 0            Seconds: 0
   > contract address:    0xcDe8bB24d67FBCBd66b5DD6ac013041120947f1E
   > block number:        3
   > block timestamp:     1564806835
   > account:             0x5Eab856D2Df4bE1D156eB17F7fca09ABb86323E2
   > balance:             99.98546868
   > gas used:            423150
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.008463 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:            0.008463 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.01369086 ETH

PS C:\basquiat-blockchain\truffle>
```

자 그러면 띄워 논 가나슈에 어떤 일이 벌어졌을까?    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-4/capture/shot1.PNG)   

첫 번째 주소에서 스마트 컨트랙트 배포하면서 가스비가 소모되어 99.98Eht로 변한것을 볼 수 있다.    

블록탭을 클릭하면 나오는 정보    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-4/capture/shot2.PNG)   

트랜잭션 탭을 클릭하면 나오는 정보    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-4/capture/shot3.PNG)    


이제 앞서 dapp-step-3에서 했던 것들을 복기할 시간이다.    

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

account들의 정보를 accounts 변수에 담는다.    

그리고 컨트랙트와 interacting하기 위해 deployed()호출    

```
let instance = await BasquiatContract.deployed()
```

맨처음 했던 방식으로

```
truffle(ganache)> instance.setBassInfo(1, "Fender", "Precision", 4)
{ tx:
   '0xd97a9677690feabda688515e2107a9693569fb3911b9af85302f6c0db00a3166',
  receipt:
   { transactionHash:
      '0xd97a9677690feabda688515e2107a9693569fb3911b9af85302f6c0db00a3166',
     transactionIndex: 0,
     blockHash:
      '0xd32974d096e5c4077bf8598435586d52f040a651b88abdc89ecccd6e77ba6f67',
     blockNumber: 5,
     from: '0x5eab856d2df4be1d156eb17f7fca09abb86323e2',
     to: '0xcde8bb24d67fbcbd66b5dd6ac013041120947f1e',
     gasUsed: 85828,
     cumulativeGasUsed: 85828,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     v: '0x1b',
     r:
      '0x037076d20b978270c6046b34d12f111237f3bfe4fe633ccb0fa0d0466a571832',
     s:
      '0x19ff8e9e3d1fa61fa230626ceeffc4e99a6f62cd6417388538b22cb9f5f5b5cb',
     rawLogs: [] },
  logs: [] }
truffle(ganache)>
```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-4/capture/shot4.PNG)    

가나쉬의 트랜잭션 탭을 보니 txHash의 '0xd97a9677690feabda688515e2107a9693569fb3911b9af85302f6c0db00a3166'가 발생한 것을 확인할 수 있다.    

자 그럼 스마트 컨트랙트를 접근할 때 'coinbase만 가능하냐?' 라고 의문을 가져야 하는게 이쯤 대면 들어야 한다. (아닐수도 있다.)    

자 스마트컨트랙트는 퍼블릭단계에서는 누구나 쓸수 있게 되어 있으니 당연히 다른 주소에서 접근 가능하다.

자 다음과 같이 해보자.

```
truffle(ganache)> instance.setBassInfo(2, "Fodera", "Humbucker", 5, {from: accounts[1]})
{ tx:
   '0xc38e268674bff393f6ae408cbee4196593465f8806eaa453f70e7bbf369c7650',
  receipt:
   { transactionHash:
      '0xc38e268674bff393f6ae408cbee4196593465f8806eaa453f70e7bbf369c7650',
     transactionIndex: 0,
     blockHash:
      '0xa108ad5733198a713676f2494045acf228c140ca845fa4d3ee9d5a78d031bcf4',
     blockNumber: 6,
     from: '0x5f77cf7b308f0d9fdee4dd7364c9c221c15be743',
     to: '0xcde8bb24d67fbcbd66b5dd6ac013041120947f1e',
     gasUsed: 85828,
     cumulativeGasUsed: 85828,
     contractAddress: null,
     logs: [],
     status: true,
     logsBloom:
      '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     v: '0x1b',
     r:
      '0x8a44e31e93368bf2977c620d2133a9426373433db2d1709a35ba675396008aee',
     s:
      '0x76c2871525e2341e9ffd3e0f3e7616bd49e23f8f46fdf761a97b0993bbb73899',
     rawLogs: [] },
  logs: [] }
```

두 번째 계정으로 접근해서 해보면    


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-4/capture/shot5.PNG)   

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-4/capture/shot6.PNG)   

하지만 수수료가 너무 작아서 실제 가나슈에서는 100이더로 보인다.    

하지만 실제 날려보면    

```
truffle(ganache)> web3.eth.getBalance(accounts[1])
'99998283440000000000'
```

깍여 있는 것을 알 수 있다.    

정보 불러오기    

```
truffle(ganache)> instance.getBassInfo(1)
Result { '0': 'Fender', '1': 'Precision', '2': <BN: 4> }
truffle(ganache)> instance.getBassInfo(2)
Result { '0': 'Fodera', '1': 'Humbucker', '2': <BN: 5> }
truffle(ganache)>
```



## 장점    

별다른 장점이 없어 보일 수 있지만 콘솔로 일일이 확인해봐야 하는 트랜잭션, 블록, 어카운트 정보들을 가나슈를 통해서 쉽게 확인할 수 있다는 것이다.    

여기까지 하게 잘 따라왔다면 이제는 dapp를 본격적으로 시작해 볼 준비가 끝났다.    

truffle폴더 역시 올린다. 이전 단계에서 변경된 것은 truffle-config.js의 내용정도 되겠다.     