# dapp-step-8

## Web3 설정    

사실 애초에 이것을 원할하게 하기 위해서는 webpack을 설치해서 리소스 접근에 대한 설정등을 하는게 우선이긴 하지만 일단 진행하다 보니 그냥 하게 되었다.    

만일 제대로 된 웹을 만들기 위해서는 webpack통한 설정들을 좀 세세하게 만져주는 걸 추천한다. 이 프로젝트는 일단 차후에 적용할 예정이다.

먼저 web3 설정은 src폴더 밑에 main.js를 살펴보자.    

```
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3'

Vue.config.productionTip = false

Vue.prototype.$EventBus = new Vue();

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 Load')
    window.web3 = new Web3(window.web3.currentProvider)
  } else {
    console.log('web3 not load')
    // 가나슈로...
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```

전역으로 사용하기 위해 다음과 같이 설정을 해준다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot1.PNG)     


설정이 정확하게 되었다면 이미지처럼 개발자도구에서 web3를 찍었을 때 정보가 생성된 것을 확인할 수 있다.

## truffle-contract 설정 

다시 이전에 했던 것을 기억하면    

```
PS C:\basquiat-blockchain\truffle> truffle migrate --compile-all --reset --network ganache
```
컨트랙트를 배포하게 되면 build/contracts폴더 내부에 json파일이 생성된다. webpack구성을 했다면 일반적으로 @contracts/....json으로 접근할 수 있겠지만 해당 프로젝트는 설정이 없기 때문에 build/contracts폴더의 있는 BasquiatContract.json파일을 복사해서 src/static 폴더 밑으로 복사한다.    

본 프로젝트는 src/static폴더밑의 컨트랙트 json파일을 읽기 때문이다.

src/js폴더 밑에 BassMarketContract.js파일을 보자.    

```
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
```

당연히 프로젝트를 진행하는 본인의 환경에 맞춰서 꼭 이 프로젝트를 따라할 필요는 없다. 다만 어떤 방식이 되었든 해당 파일의 init부분을 참조하면 된다.    

즉 truffle-contract에서 json을 읽어와 web3와 이더리움 노드에 배포된 스마트 컨트랙트와 interacting할 수 있게 도와주는 역할을 하게 된다.


## 화면에 보여줄 제품 리스트 json수정    

당연한 이야기지만 현재 src/static폴더 밑의 basslist.json에 기록된 정보는 내 컴퓨터의 가나슈가 생성한 주소를 기입한 것이기 떄문에 이 프로젝트를 테스트 하기 위해서는 본인 컴퓨터에서 띄운 가나슈가 생상한 주소를 seller에 기입해야 한다.    

이전 브랜치에서도 얘기했지만 실제로는 ajax를 통해서 Back-end쪽에서 rest api를 호출해서 뿌려주는게 맞지만 단순한 테스트 목적이기 때문에 차후 고려 대상임을 기억해 둬야 한다.    


## 시나리오    

이전 브랜치에서도 얘기했지만 버튼을 누르면 모달이 뜨고 사용자 아이디와 이름 전화번호를 입력하고 구입 버튼을 눌려서 구입을 하는 시나리오이다.

좀더 디테일하게 얘기하자면 다음과 같다. 

1. 구입을 한다.
2. 구입후 이벤트를 통해 화면 상당에 로그를 찍을 것이다.
3. sol 내부의 내용을 보면 

```
function getBuyerInfo(uint256 _id) public view returns (uint, string memory, string memory, address) {
        return (buyersInfo[_id].userId, buyersInfo[_id].name, buyersInfo[_id].phone, buyersInfo[_id].addr);
    }
```
이 함수를 통해서 다시 구입할려고 버튼을 누르면 판매된 제품이라고 alert창을 띄울 것이다.    

사실 좀 더 자세하게 구성할려면 구입이후에는 해당 제품의 버튼을 없애던가 [판매완료]체크를 해야하는게 맞다. 하지만 그냥 여기서는 alert창을 띄우고 닫을 것이다.

## 이벤트 등록   

```
logEvents: () => {
    BassMarketContract.instance.BuyBassLog({filter: {}, fromBlock: 0}, (error, event) => {
      BassMarketContract.event.$emit('eventLog', event);
    })
  }
```

web3의 버전이 올라가면서 watch가 사라졌다. 단지 일반 스마트컨트랙트 함수를 호출하듯 변경이 되었는데 위를 참조하자.    

filter에 들어가는 옵션 부분은 공식 사이트를 보자.     

https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html#events

최초로 BassMarketContract이 실행된 이후에 해당 이벤트를 리스너로 등록하는데 옵션 부분에서 fromBlock를 0으로 잡아두었기 때문에 화면이 로딩이 될때마다 해당 이벤트를 읽어와서 화면에 뿌릴 것이다.    

## 테스트     

일단 기존에 테스트했던 것들은 메타마스크에 트랜잭션 정보가 남아있을 수 있고 이것이 가끔 에러를 발생하기 때문에 새로운 기분으로 모든 정보를 초기화 하자.    


그림에서처럼 상당 알록달록한 동그라미를 클릭하면 톱니모양의 설정을 클릭한다.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot2.PNG)     

그러면 몇가지 리스트가 있는데 그중에 [고급]을 클릭하고 스크롤을 아래로 좀 내려보면 아래 그림과 같은 [계정 초기화]버튼이 있다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot3.PNG)     

과감하게 눌러주자. 각 주소마다 있을 수 있기에 귀찮지만 10개 모두 확인하고 다 지워주자.    

참고로 메타마스크가 업데이트가 되면서 정책이 살짝 변경되서 어카운트 계정을 읽어오는데 문제가 발생할 수 있다.    

그럴때는 위와 설정으로 들어가서 [고급] 밑에 있는 [Sercurity & Privacy]를 누르면    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot4.PNG)     

개인정보보호 모드를 왼쪽으로 땡겨서 끄자.    


## 새로 시작하는 테스트

가나슈를 먼저 띄우고 나서 밑에 명령어를 날리자.    

```
PS C:\basquiat-blockchain\truffle> truffle migrate --compile-all --reset --network ganache
```
컨트랙트를 다시 배포하고 생성된 json파일을 src/static폴더 밑으로 복사해서 넣자.    

```
PS C:\basquiat-blockchain\truffle> npm run serve
```
웹페이지를 띄우자.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot5.PNG)     

나는 미리 메타마스크를 띄워놨다.    

위 이미지를 보면 알겠지만 처음 주소에서는 배포한 가스비용이 빠져나갔다.    

일단 나는 3번째 계정으로 악기를 구입할 생각이다.    

메타마스크에서 3번째 계정으로 들어가자.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot6.PNG)     

첫번째 베이스치는 사람이라면 꿈의 베이스라 하는 포데라 베이스를 구입하겠다.   

userId는 현재 3번째 계정으로 했으니 userId는 3/basquiat78/010-000-0000을 입력하고 구입을 하겠다.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot7.PNG)     

기입하고 버튼을 누르면 메타마스크가 다음과 같이 뜨는 것을 알수 있다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot8.PNG)     

사실 트랜잭션이 발생하는 부분이기 때문에 구입자 입장에서는 수수료를 아끼기 위해서 가스비를 줄여야 한다.     
가스비의 의미는 여러 의미가 있는데 만일 가스비를 사용자가 지불하지 않으면 악의적인 스팸 공격이 올 수 있기 때문에 수수료가 발생한다.    

또한 우리는 트랜잭션을 발생한다는 의미는 노드를 운영하는 운영집단에게 일종의 사용료를 지불한다는 의미를 지니고 있다.     

수수료를 높게 책정하면 트랜잭션이후 블록이 생성될 때 수수료가 높은 트랜잭션을 먼저 포함시키고 수수료가 낮은 트랜잭션은 네트워크 상황에 따라 뒤로 밀릴 수 있다.    

하지만 적정한 수수료를 지불하면 솔직히 그렇게 늦어지지 않기 때문에 여기서는 수수료를 조정을 해보자.     

위 이미지 보면 Gas Fee위에 edit라는 부분이 있다. 클릭을 하자.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot9.PNG)     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot10.PNG)     

위 이미지처럼 두가지가 있다. basic과 고급.    

처음 basic은 기본적인 세팅으로 보통은 이미지처럼 수수료가 높게 책정되어 있다.    
basic은 낮-고-저 로 세팅이 되어 있고 고급의 경우에는 직접 설정할 수 있는데 너무 낮아도 안된다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot11.PNG)     

고급탭을 눌러 기본적으로 20 wei로 잡혀있는 것을 10으로 낮춰서 구입을 하겠다.    

저장 버튼을 누르고 승인을 눌러보자    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot12.PNG)     

화면에 뭔가 액션이 이뤄지면 모달 창이 닫히고 위 이미지처럼 리스트 위에 이벤트 로그가 남게 되었다.     

이 상태에서 다시 한번 같은 제품을 구입을 해보자.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot13.PNG)     

이미 판매된 제품이기 때문에 alert창을 띄운다.     

자 그럼 이제 실제로 판매자의 이더가 늘었는지 보자.     


이미지에서 보면 판매자의 주소는 0xfb7D1CFe1B4f5Ac51Ac1c1E9d0c5061132d08d0a이다.    

0.0.1이더는 수수료로 빠졌으니 54.99가 늘어나야 한다.


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot14.PNG)     


구입한 3번째 계정에서는 이더가 빠져나가고 구입한 0xfb7D1CFe1B4f5Ac51Ac1c1E9d0c5061132d08d0a은 154.99로 이더가 늘어났다.     


이제는 메타마스크에서 다른 계정으로 들어가서 다른 악기를 구입해 보자.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot15.PNG)     

10번째 계정으로 들어가자.    

그리고 Spector베이스를 구입해 보겠다.    

userId는 10/basquiat78/010-000-0000

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot16.PNG)     


구입을 완료하면 이미지처럼 맨 위 이벤트 로그 남기는 곳에 정보가 추가되었다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-8/capture/shot17.PNG)     

이미지를 보면 알겠지만 이더가 제대로 넘어가고 줄어든 것을 확인할 수 있다.

완료된 truffle폴더도 함께 공유한다.    