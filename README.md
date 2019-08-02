# dapp-step-3

## Truffle Framework     

truffle을 사용하기 위해서는 basquiat-blockchain으로 이동한다.    

```
$ mkdir truffle
$ cd truffle
```

truffle이라는 폴더를 만들고 안으로 들어간다. 그리고 다음과 같이 명령어를 날린다.     

```
$ truffle init
```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot1.PNG)   

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot2.PNG)   


반드시 basquiat-blockchain폴더 밑에 truffle 폴더를 만들고 그 안에서 init을 날려야 한다.    
truffle framework가 상위 폴더의 geth파일 정보들을 보고 시작하기 때문에 다른 곳에서 하게 되면 아무~~일도 벌어지지 않는다.    

이럴 줄 알았으면 저 폴더를 프로젝트 폴더로 잡을 걸 그랬나 보다.    

일단 생성된 파일들은 지우지 말자.     


vscode를 새창으로 열고 해당 폴더를 열어서 계속 진행해 보기로 하자.    

# 컨트랙트 작성하기    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot3.PNG)   

일단 위의 이미지처럼 contracts 폴더에 새로운 sol파일을 생성한다. 이름은 원하는 이름으로 일단 껍데기만 만들자.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot4.PNG)   

그리고 위의 이미지처럼 migrations폴더안에 있는 1_initial_migration 복사해서 앞에 숫자를 2로 바꾸고 뒤 이름은 자신이 원하는데로 만든 이후에 안에 내용도 바꿔줘야 한다.    

배포할 때 이 파일들을 참조하는데 숫자를 참조해서 배포하게 된다. 따라서 배포할 컨트랙트만큼 이 숫자를 증가시켜서 세팅해주면 된다.    


이미지 참조하자.    


```
pragma solidity >=0.4.21 <0.6.0;

contract BasquiatContract {
    struct Bass {
        string brand;
        string basstype;
        uint stringno;
    }

    mapping(uint256 => Bass) bassInfo;

    function setBassInfo(uint _bassId, string memory _brand, string memory _basstype, uint _stringno) public {
        Bass storage bass = bassInfo[_bassId];
        bass.brand = _brand;
        bass.basstype = _basstype;
        bass.stringno = _stringno;
    }

    function getBassInfo(uint256 _bassId) public view returns (string memory, string memory, uint) {
        return (bassInfo[_bassId].brand, bassInfo[_bassId].basstype, bassInfo[_bassId].stringno);
    }
}

```

삽질기 -> 일단 truffle version과 맞물려 기존에 했던 solidity버전이 업데이트 되면서 몇몇 변화가 생겼는데 뭐랄까... 엄격해진 느낌이 든다.    

명시적으로 변수에 대해서 memory와 storage에 대한 구분을 명확하게 전부 넣게 해서 발생할 손실을 줄였다고 하니 모든 부분에 대해 명시적으로 적는다.     

기존에 테스트용으로 만들었던 버전이 pragma solidity ^0.4.20이였는데 지금 설치한 truffle version을 살펴보니 

```
Truffle v5.0.30 (core: 5.0.30)
Solidity v0.5.0 (solc-js)
Node v10.16.1
Web3.js v^1.2.0
```

이렇다. 많이 올라갔넹~~~ 일단 플러그인을 통해서 warning과 에러를 발생시킨다. 버전이 낮다고 .....

버전 올려주니 문법의 변화로 에러 발생...    

https://remix.ethereum.org 사이트와 구글신으로 결국 다 찾아냄.    

일단 단순한 스마트컨트랙트인데 차후 진행할 부분을 생각하자니.....

위에 솔리디티 파일을 보면 대충 느낌이 오는 분들도 있을 듯하다.

대략적으로 다음과 같다.

1. Bass라는 struct구조체가 하나 있다.    
    - 자바로 치면 도메인 객체라고 생각하면 된다.

2. mapping
    - 마치 자바의 Map, 시썁류의 Dictionary같은 구조다. 문법을 잠깐 설명하자면
      mapping(uint256 => Bass) bassInfo
      이거슨 mapping, 즉 맵같은 녀석인데 키값으로 uint256이 되겠으며 밸류는 Bass라는 struct 정보를 담고 있는데 변수명이 bassInfo라는 녀석이야 라는 의미이다.

3. set/get
    - 더 이상 자세한 설명은 생략한다.    
        하지만 이건 설명을 해야겠다. 
        set같은 경우에는 실제 블로체인의 블록에 올라간다. 바꿔 말하면 트랙잭션 발생이 벌어지고 당연히 수수료가 들어간다. (gas비용, 결국 이더가 빠져나감)
        get의 경우에는 view라는 키워드가 들어가는데 이것은 단순하게 view의 의미이다. 쓰여진 정보를 가져오기 때문에 수수료는 안나온다.

        위 코드에서 Bass storage bass = bassInfo[_bassId] 이 부분이 있는데 storage라는 단어가 보이는가?     
        자 이 객체는 생성되고 나서 이 함수가 끝나는 순간 블록체인에 올라간다는 의미를 가지고 있다. --> 수수료 발생    
        이 함수를 호출할 때마다 mapping이라는 맵객체에 담겠지만 어찌되었든 그때마다 수수료가 발생하게 된다.    

4. 버전 명시
    - pragma solidity >=0.4.21 <0.6.0;
      원래는 ^0.5.0으로 해도 된다. 하지만 현재 프로젝트에서 truffle init이후 자동으로 생성된 파일을 보면 Migrations.sol에서는 버전을 저렇게 표현한다.    
      뭐 딱 보면 알겠지만 어디에서 어느 버전까지라는 표현일 테니 틀린 표현은 아니나 마치 jslint처럼 엄격한 문법이 적용받는 듯한데 공백에 대해서 warning이 뜬다.
      warning같은 게 뜨는걸 극도로 싫어하는 성격이라 다 없애자.    

# 일단 배포해볼까?    

일단 테스트로 truffle에서 배포하는 방법을 알아 보자

다음처럼 basquiat-blockchain/truffle로 이동해서

```
$ truffle develop
```

Truffle Develop started at http://127.0.0.1:9545/ <-- 이렇게 테스트를 위해 다른 포트로 이더리움을 띄운다.     
그리고 10개의 주소를 생성한 것을 확인할 수 있다.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot5.PNG)   

VSCODE에서 새로운 터미널을 띄우고 

```
$ truffle develop --log
```
를 치면 이미지에서 볼 수 있듯이 http://127.0.0.1:9545/  <---로 연결되는 것을 확인할 수 있다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot6.PNG)   


그리고 다음과 같이
```
$ truffle(develop)> migrate
```
날리면 밑에 처럼 나온다. (너무 길어서 스크린샷 뜨기 어려워 복사함)
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
> Network name:    'develop'
> Network id:      5777
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xf0245bb34ef3bebdcad4af80662c5fc22e85e5eca2e292ca42aaeca85170999c
   > Blocks: 0            Seconds: 0
   > contract address:    0xa678A8e7aa75714d233ca3A1e63A76Bfd1863A67
   > block number:        1
   > block timestamp:     1564758815
   > account:             0x9e1d2D1B2e132C5Fd6f0D73CbA803E5eD7Cbf3f6
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

   Deploying 'BasquiatContract'
   ----------------------------
   > transaction hash:    0x1d1904a7e55c1da0c278da8c1f8ae7e87a8becf3a8bfd65a497e12411bc01f26
   > Blocks: 0            Seconds: 0
   > contract address:    0x3e169Ab15E5a29f74194f969fd4a931E38AEff3B
   > block number:        3
   > block timestamp:     1564758817
   > account:             0x9e1d2D1B2e132C5Fd6f0D73CbA803E5eD7Cbf3f6
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

truffle(develop)>


```

아까 로그를 보기 위해 새로 띄웠던 터미널로 가보면    

```
Connected to existing Truffle Develop session at http://127.0.0.1:9545/

  develop:ganache net_version +0ms
  develop:ganache eth_getBlockByNumber +95ms
  develop:ganache eth_accounts +87ms
  develop:ganache net_version +93ms
  develop:ganache eth_getBlockByNumber +81ms
  develop:ganache eth_getBlockByNumber +81ms
  develop:ganache net_version +85ms
  develop:ganache eth_getBlockByNumber +83ms
  develop:ganache eth_estimateGas +89ms
  develop:ganache net_version +136ms
  develop:ganache eth_blockNumber +1ms
  develop:ganache eth_getBlockByNumber +3ms
  develop:ganache eth_sendTransaction +84ms
  develop:ganache  +62ms
  develop:ganache   Transaction: 0xf0245bb34ef3bebdcad4af80662c5fc22e85e5eca2e292ca42aaeca85170999c +3ms
  develop:ganache   Contract created: 0xa678a8e7aa75714d233ca3a1e63a76bfd1863a67 +1ms
  develop:ganache   Gas usage: 261393 +1ms
  develop:ganache   Block Number: 1 +0ms
  develop:ganache   Block Time: Sat Aug 03 2019 00:13:35 GMT+0900 (GMT+09:00) +1ms
  develop:ganache  +1ms
  develop:ganache eth_getTransactionReceipt +63ms
  develop:ganache eth_getCode +95ms
  develop:ganache eth_getTransactionByHash +88ms
  develop:ganache eth_getBlockByNumber +90ms
  develop:ganache eth_getBalance +84ms
  develop:ganache eth_getBlockByNumber +93ms
  develop:ganache eth_getBlockByNumber +85ms
  develop:ganache eth_sendTransaction +86ms
  develop:ganache  +51ms
  develop:ganache   Transaction: 0xf493cf9719268ce653f7f55e89d047603c05f6591823c4fa66304807b5f6aa43 +1ms
  develop:ganache   Gas usage: 42023 +1ms
  develop:ganache   Block Number: 2 +1ms
  develop:ganache   Block Time: Sat Aug 03 2019 00:13:36 GMT+0900 (GMT+09:00) +1ms
  develop:ganache  +0ms
  develop:ganache eth_getTransactionReceipt +65ms
  develop:ganache eth_getBlockByNumber +94ms
  develop:ganache eth_accounts +86ms
  develop:ganache net_version +89ms
  develop:ganache eth_getBlockByNumber +83ms
  develop:ganache eth_getBlockByNumber +81ms
  develop:ganache net_version +83ms
  develop:ganache eth_getBlockByNumber +82ms
  develop:ganache eth_estimateGas +84ms
  develop:ganache net_version +111ms
  develop:ganache eth_blockNumber +1ms
  develop:ganache eth_getBlockByNumber +2ms
  develop:ganache eth_sendTransaction +85ms
  develop:ganache  +38ms
  develop:ganache   Transaction: 0x1d1904a7e55c1da0c278da8c1f8ae7e87a8becf3a8bfd65a497e12411bc01f26 +1ms
  develop:ganache   Contract created: 0x3e169ab15e5a29f74194f969fd4a931e38aeff3b +1ms
  develop:ganache   Gas usage: 423150 +1ms
  develop:ganache   Block Number: 3 +0ms
  develop:ganache   Block Time: Sat Aug 03 2019 00:13:37 GMT+0900 (GMT+09:00) +1ms
  develop:ganache  +1ms
  develop:ganache eth_getTransactionReceipt +71ms
  develop:ganache eth_getCode +88ms
  develop:ganache eth_getTransactionByHash +85ms
  develop:ganache eth_getBlockByNumber +91ms
  develop:ganache eth_getBalance +86ms
  develop:ganache eth_getBlockByNumber +98ms
  develop:ganache eth_getBlockByNumber +86ms
  develop:ganache eth_sendTransaction +88ms
  develop:ganache  +40ms
  develop:ganache   Transaction: 0xeda1ccf9e1e4937c4c8803fa0c599e6fca664e95e05108a8ea64c8ded2fcc3dc +2ms
  develop:ganache   Gas usage: 27023 +0ms
  develop:ganache   Block Number: 4 +1ms
  develop:ganache   Block Time: Sat Aug 03 2019 00:13:37 GMT+0900 (GMT+09:00) +2ms
  develop:ganache  +0ms
  develop:ganache eth_getTransactionReceipt +70ms

```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot7.PNG)    

이미지처럼 컨트랙트 json파일이 build폴더에 생성된 것을 확인 할 수 있다.     

위에 로그를 보면 알겠지만 컨트랙트를 배포하는 단계에도 수수료가 나간것을 알 수 있다.    

삽질기....truffle의 버전업데이트에 따라 많은 것이 바뀌어서 공식 사이트에서 하나씩 다시 보는 중.

1. 어카운트 리스트 가져오기
```
truffle(develop)> let accounts = await web3.eth.getAccounts()
truffle(develop)> accounts
```

2. 발란스 정보 가져오기

```
truffle(develop)> web3.eth.getBalance(accounts[0])

```

현재 마치 크롬의 개발자 도구의 console창에서 개발하는 듯한 느낌으로 바뀌었다. 게다가 이전과는 다르게 await를 지원한다. 오~~~~ 이전 방식으로는 할 수 없다.

자 그럼 내가 배포한 스마트컨트랙트와 interacting을 할 차례다.

```
truffle(develop)> let instance = await BasquiatContract.deployed()
```

다음과 같이 instance를 생성하자. 일단 문법 자체는 ECMA6 같이 변했다. await로 BasquiatContract -> 배포한 컨트랙트 명.deployed()

이렇게 치면 예전과는 다른 엄청난 로그가 쭉 뜬다.     

```
truffle(develop)> instance
TruffleContract {
  constructor:
   { [Function: TruffleContract]
     _constructorMethods:
      { setProvider: [Function: setProvider],
        new: [Function: new],
        at: [AsyncFunction: at],
        deployed: [AsyncFunction: deployed],
        defaults: [Function: defaults],
        hasNetwork: [Function: hasNetwork],
        isDeployed: [Function: isDeployed],
        detectNetwork: [AsyncFunction: detectNetwork],
        setNetwork: [Function: setNetwork],
        setNetworkType: [Function: setNetworkType],
        setWallet: [Function: setWallet],
        resetAddress: [Function: resetAddress],
        link: [Function: link],
        clone: [Function: clone],
        addProp: [Function: addProp],
        toJSON: [Function: toJSON],
        decodeLogs: [Function: decodeLogs] },
     _properties:
      { contract_name: [Object],
        contractName: [Object],
        gasMultiplier: [Object],
        timeoutBlocks: [Object],
        autoGas: [Object],
        numberFormat: [Object],
        abi: [Object],
        metadata: [Function: metadata],
        network: [Function: network],
        networks: [Function: networks],
        address: [Object],
        transactionHash: [Object],
        links: [Function: links],
        events: [Function: events],
        binary: [Function: binary],
        deployedBinary: [Function: deployedBinary],
        unlinked_binary: [Object],
        bytecode: [Object],
        deployedBytecode: [Object],
        sourceMap: [Object],
        deployedSourceMap: [Object],
        source: [Object],
        sourcePath: [Object],
        legacyAST: [Object],
        ast: [Object],
        compiler: [Object],
        schema_version: [Function: schema_version],
        schemaVersion: [Function: schemaVersion],
        updated_at: [Function: updated_at],
        updatedAt: [Function: updatedAt],
        userdoc: [Function: userdoc],
        devdoc: [Function: devdoc] },
     _property_values: {},
     _json:
      { contractName: 'BasquiatContract',
        abi: [Array],
        metadata:
         '{"compiler":{"version":"0.5.8+commit.23d335f2"},"language":"Solidity","output":{"abi":[{"constant":true,"inputs":[{"name":"_bassId","type":"uint256"}],"name":"getBassInfo","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_bassId","type":"uint256"},{"name":"_brand","type":"string"},{"name":"_basstype","type":"string"},{"name":"_stringno","type":"uint256"}],"name":"setBassInfo","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}],"devdoc":{"methods":{}},"userdoc":{"methods":{}}},"settings":{"compilationTarget":{"/C/basquiat-blockchain/truffle/contracts/BasquiatContract.sol":"BasquiatContract"},"evmVersion":"petersburg","libraries":{},"optimizer":{"enabled":false,"runs":200},"remappings":[]},"sources":{"/C/basquiat-blockchain/truffle/contracts/BasquiatContract.sol":{"keccak256":"0xd44aabc035a5a71fc8424a16769a8f6ba2262d5f545a50954b0bd80e234c3a63","urls":["bzzr://cf2b8aa481fd8129c33e5fd31ec486a834e99c3c801e0ee32e72a02aea443973"]}},"version":1}',
        bytecode:
         '0x608060405234801561001057600080fd5b5061056e806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806312a15f9b1461003b578063c1e5c92714610155575b600080fd5b6100676004803603602081101561005157600080fd5b81019080803590602001909291905050506102bb565b604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b838110156100b1578082015181840152602081019050610096565b50505050905090810190601f1680156100de5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b838110156101175780820151818401526020810190506100fc565b50505050905090810190601f1680156101445780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b6102b96004803603608081101561016b57600080fd5b81019080803590602001909291908035906020019064010000000081111561019257600080fd5b8201836020820111156101a457600080fd5b803590602001918460018302840111640100000000831117156101c657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561022957600080fd5b82018360208201111561023b57600080fd5b8035906020019184600183028401116401000000008311171561025d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610445565b005b606080600080600085815260200190815260200160002060000160008086815260200190815260200160002060010160008087815260200190815260200160002060020154828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103955780601f1061036a57610100808354040283529160200191610395565b820191906000526020600020905b81548152906001019060200180831161037857829003601f168201915b50505050509250818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104315780601f1061040657610100808354040283529160200191610431565b820191906000526020600020905b81548152906001019060200180831161041457829003601f168201915b505050505091509250925092509193909250565b600080600086815260200190815260200160002090508381600001908051906020019061047392919061049d565b508281600101908051906020019061048c92919061049d565b508181600201819055505050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104de57805160ff191683800117855561050c565b8280016001018555821561050c579182015b8281111561050b5782518255916020019190600101906104f0565b5b509050610519919061051d565b5090565b61053f91905b8082111561053b576000816000905550600101610523565b5090565b9056fea165627a7a72305820dbc4882106d7e1ecf2d1a267114111f7fc5c0512fbebf0cdc1722c0831a956530029',
        deployedBytecode:
         '0x608060405234801561001057600080fd5b50600436106100365760003560e01c806312a15f9b1461003b578063c1e5c92714610155575b600080fd5b6100676004803603602081101561005157600080fd5b81019080803590602001909291905050506102bb565b604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b838110156100b1578082015181840152602081019050610096565b50505050905090810190601f1680156100de5780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b838110156101175780820151818401526020810190506100fc565b50505050905090810190601f1680156101445780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b6102b96004803603608081101561016b57600080fd5b81019080803590602001909291908035906020019064010000000081111561019257600080fd5b8201836020820111156101a457600080fd5b803590602001918460018302840111640100000000831117156101c657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561022957600080fd5b82018360208201111561023b57600080fd5b8035906020019184600183028401116401000000008311171561025d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f82011690508083019250505050505050919291929080359060200190929190505050610445565b005b606080600080600085815260200190815260200160002060000160008086815260200190815260200160002060010160008087815260200190815260200160002060020154828054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103955780601f1061036a57610100808354040283529160200191610395565b820191906000526020600020905b81548152906001019060200180831161037857829003601f168201915b50505050509250818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104315780601f1061040657610100808354040283529160200191610431565b820191906000526020600020905b81548152906001019060200180831161041457829003601f168201915b505050505091509250925092509193909250565b600080600086815260200190815260200160002090508381600001908051906020019061047392919061049d565b508281600101908051906020019061048c92919061049d565b508181600201819055505050505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106104de57805160ff191683800117855561050c565b8280016001018555821561050c579182015b8281111561050b5782518255916020019190600101906104f0565b5b509050610519919061051d565b5090565b61053f91905b8082111561053b576000816000905550600101610523565b5090565b9056fea165627a7a72305820dbc4882106d7e1ecf2d1a267114111f7fc5c0512fbebf0cdc1722c0831a956530029',
        sourceMap:
         '36:652:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;36:652:0;;;;;;;',
        deployedSourceMap:
         '36:652:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;36:652:0;;;;;;;;;;;;;;;;;;;;;;;;483:202;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;483:202:0;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;483:202:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;483:202:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;212:263;;;;;;13:3:-1;8;5:12;2:2;;;30:1;27;20:12;2:2;212:263:0;;;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;212:263:0;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;212:263:0;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;212:263:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;212:263:0;;;;;;;;;;;;;;;;;21:11:-1;8;5:28;2:2;;;46:1;43;36:12;2:2;212:263:0;;35:9:-1;28:4;12:14;8:25;5:40;2:2;;;58:1;55;48:12;2:2;212:263:0;;;;;;100:9:-1;95:1;81:12;77:20;67:8;63:35;60:50;39:11;25:12;22:29;11:107;8:2;;;131:1;128;121:12;8:2;212:263:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;30:3:-1;22:6;14;1:33;99:1;93:3;85:6;81:16;74:27;137:4;133:9;126:4;121:3;117:14;113:30;106:37;;169:3;161:6;157:16;147:26;;212:263:0;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;483:202;542:13;557;572:4;597:8;:17;606:7;597:17;;;;;;;;;;;:23;;622:8;:17;631:7;622:17;;;;;;;;;;;:26;;650:8;:17;659:7;650:17;;;;;;;;;;;:26;;;589:88;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;483:202;;;;;:::o;212:263::-;328:17;348:8;:17;357:7;348:17;;;;;;;;;;;328:37;;389:6;376:4;:10;;:19;;;;;;;;;;;;:::i;:::-;;422:9;406:4;:13;;:25;;;;;;;;;;;;:::i;:::-;;458:9;442:4;:13;;:25;;;;212:263;;;;;:::o;36:652::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o',
        source:
         'pragma solidity >=0.4.21 <0.6.0;\r\n\r\ncontract BasquiatContract {\r\n    struct Bass {\r\n        string brand;\r\n        string basstype;\r\n        uint stringno;\r\n    }\r\n\r\n    mapping(uint256 => Bass) bassInfo;\r\n\r\n    function setBassInfo(uint _bassId, string memory _brand, string memory _basstype, uint _stringno) public {\r\n        Bass storage bass = bassInfo[_bassId];\r\n
 bass.brand = _brand;\r\n        bass.basstype = _basstype;\r\n        bass.stringno = _stringno;\r\n    }\r\n\r\n    function getBassInfo(uint256 _bassId) public view returns (string memory, string memory, uint) {\r\n        return (bassInfo[_bassId].brand, bassInfo[_bassId].basstype, bassInfo[_bassId].stringno);\r\n    }\r\n}',
        sourcePath:
         'C:/basquiat-blockchain/truffle/contracts/BasquiatContract.sol',
        ast: [Object],
        legacyAST: [Object],
        compiler: [Object],
        networks: [Object],
        schemaVersion: '3.0.11',
        updatedAt: '2019-08-02T15:33:39.596Z',
        devdoc: [Object],
        userdoc: [Object] },
     setProvider: [Function: bound setProvider],
     new:
      { [Function: bound new] estimateGas: [Function: bound estimateDeployment] },
     at: [AsyncFunction: bound at],
     deployed: [AsyncFunction: bound deployed],
     defaults: [Function: bound defaults],
     hasNetwork: [Function: bound hasNetwork],
     isDeployed: [Function: bound isDeployed],
     detectNetwork: [AsyncFunction: bound detectNetwork],
     setNetwork: [Function: bound setNetwork],
     setNetworkType: [Function: bound setNetworkType],
     setWallet: [Function: bound setWallet],
     resetAddress: [Function: bound resetAddress],
     link: [Function: bound link],
     clone: [Function: bound clone],
     addProp: [Function: bound addProp],
     toJSON: [Function: bound toJSON],
     decodeLogs: [Function: bound decodeLogs],
     web3:
      Web3Shim {
        currentProvider: [Getter/Setter],
        _requestManager: [RequestManager],
        givenProvider: null,
        providers: [Object],
        _provider: [HttpProvider],
        setProvider: [Function],
        BatchRequest: [Function: bound Batch],
        extend: [Function],
        version: '1.2.0',
        utils: [Object],
        eth: [Eth],
        shh: [Shh],
        bzz: [Bzz],
        networkType: 'ethereum' },
     class_defaults:
      { from: '0x9e1d2D1B2e132C5Fd6f0D73CbA803E5eD7Cbf3f6',
        gas: 6721975,
        gasPrice: 20000000000 },
     currentProvider:
      HttpProvider {
        host: 'http://127.0.0.1:9545/',
        httpAgent: [Agent],
        timeout: 0,
        headers: undefined,
        connected: true,
        send: [Function],
        _alreadyWrapped: true },
     network_id: '5777',
     networkType: 'ethereum' },
  methods:
   { 'setBassInfo(uint256,string,string,uint256)':
      { [Function]
        call: [Function],
        sendTransaction: [Function],
        estimateGas: [Function],
        request: [Function] },
     'getBassInfo(uint256)':
      { [Function]
        call: [Function],
        sendTransaction: [Function],
        estimateGas: [Function],
        request: [Function] } },
  abi:
   [ { constant: false,
       inputs: [Array],
       name: 'setBassInfo',
       outputs: [],
       payable: false,
       stateMutability: 'nonpayable',
       type: 'function',
       signature: '0xc1e5c927' },
     { constant: true,
       inputs: [Array],
       name: 'getBassInfo',
       outputs: [Array],
       payable: false,
       stateMutability: 'view',
       type: 'function',
       signature: '0x12a15f9b' } ],
  address: '0x3e169Ab15E5a29f74194f969fd4a931E38AEff3B',
  transactionHash: undefined,
  contract:
   Contract {
     currentProvider: [Getter/Setter],
     _requestManager:
      RequestManager {
        provider: [HttpProvider],
        providers: [Object],
        subscriptions: {} },
     givenProvider: null,
     providers:
      { WebsocketProvider: [Function: WebsocketProvider],
        HttpProvider: [Function: HttpProvider],
        IpcProvider: [Function: IpcProvider] },
     _provider:
      HttpProvider {
        host: 'http://127.0.0.1:9545/',
        httpAgent: [Agent],
        timeout: 0,
        headers: undefined,
        connected: true,
        send: [Function],
        _alreadyWrapped: true },
     setProvider: [Function],
     BatchRequest: [Function: bound Batch],
     extend:
      { [Function: ex]
        formatters: [Object],
        utils: [Object],
        Method: [Function: Method] },
     clearSubscriptions: [Function],
     options: { address: [Getter/Setter], jsonInterface: [Getter/Setter] },
     defaultAccount: [Getter/Setter],
     defaultBlock: [Getter/Setter],
     methods:
      { setBassInfo: [Function: bound _createTxObject],
        '0xc1e5c927': [Function: bound _createTxObject],
        'setBassInfo(uint256,string,string,uint256)': [Function: bound _createTxObject],
        getBassInfo: [Function: bound _createTxObject],
        '0x12a15f9b': [Function: bound _createTxObject],
        'getBassInfo(uint256)': [Function: bound _createTxObject] },
     events: { allEvents: [Function: bound ] },
     _address: '0x3e169Ab15E5a29f74194f969fd4a931E38AEff3B',
     _jsonInterface: [ [Object], [Object] ] },
  setBassInfo:
   { [Function]
     call: [Function],
     sendTransaction: [Function],
     estimateGas: [Function],
     request: [Function] },
  getBassInfo:
   { [Function]
     call: [Function],
     sendTransaction: [Function],
     estimateGas: [Function],
     request: [Function] },
  sendTransaction: [Function],
  send: [Function],
  allEvents: [Function],
  getPastEvents: [Function] }
truffle(develop)>

```

뭔지 모르지만 위에서 내가 배포한 BasquiatContract.sol의 내용도 보인다.     
일단 블록체인에 정보를 올리기 전에 coinbase의 발란스 먼저 체크해보자.    

```
truffle(develop)> web3.eth.getBalance(accounts[0])
'99984928220000000000'
```    

맨 처음 배포하면서 빠진 가스비용으로 100이 아니다.     
이게 참 거시기한데 이전에는 fromWei로 이더단위로 볼 수 있었는데 이건 그게 안먹혀서 답답함. 일단 방법은 난중에 찾고....

이제부터 실제 정보를 써보자.    
위에 처럼 instance라는 객체에 내가 올린 스마트 컨트랙트를 대입했으니 instance로 접근하자.    

```
truffle(develop)> instance.setBassInfo(1, "Fender", "Precision", 4)
```

맨처음이니깐 아이디는 1로 세팅하고 브랜드명은 펜더, 타입은 프레시젼, 현수는 4현으로 세팅을 했다.    
그리고 올리면 밑에 그림처럼 내용이 주륵 뜬다.    


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot8.PNG)    

txHash정보도 보인다.     

아까 다른 터미널로 띄워논 truffle log를 보면     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot9.PNG)    

트랜잭션 정보와 블록 생성 시간도 나온다.     

이제는 스마트컨트랙트로 올라간 정보를 가져오기만 하면 된다. 아 그전에 발란스 체크한번 하고 가자.    

```
truffle(develop)> web3.eth.getBalance(accounts[0])
'99983211660000000000'
```

99984928220000000000 -> 99983211660000000000으로 줄어들었다. 이유는 위에 다 언급되어 있다.     

다음 명령어로 정보를 가져오자.    
아이디를 1로 했으니 아이디가 1인 bassInfo정보를 가져오자    

```
truffle(develop)> let bassInfo = instance.getBassInfo(1);
undefined
truffle(develop)> bassInfo
```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-3/capture/shot10.PNG)    


흐유...여기까지 버전 업으로 인한 사소한 변경으로 삽질도 엄청 해됬다.... 일단 여기서 ....그만하고  

벌써부터 앞으로의 난항이 예상된다. 삽질이 될듯...    
생각같아서는 당시 했던 버전으로 하고 싶은데 안타깝게.... 버전를 체크하지 못한 나의 잘못이 크다.    
하지만 최신 버전으로 해보는것도 나름 나쁘지 않을 거 같다.    

개발자는 해당 오피셜 사이트에서 많은 정보를 얻으면서 하는게 최고다.    

https://www.trufflesuite.com/docs/truffle/overview


https://remix.ethereum.org <--- 아 이거 엄청 변했는데????   

# Next    
이 브랜치에 다 할려고 하니 엄청 길어져서 브랜치 따로 땀.     
가나슈를 깐 이유는 최대한 개발하는데 편하게 하기 위해서이다.     

이번에 한 것은 적어도 내가 만든 스마트컨트랙트가 배포가 되고 제대로 작동하는지 확인차 한것으로 일단 여기까지 잘 왔으면 그것만으로 엄청난 의미를 가지고 있다.    
또한 소스도 올려놨으니 안된다면 확인차 보는것도 괜찮다.    