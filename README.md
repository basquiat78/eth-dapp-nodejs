# dapp-step-1

## Ethereum Setting    

일단 이더리움을 실행할 때 아무 옵션을 주지 않고 실행하게 되면 블록체인 관련 정보들이 다음 C:\Users\basquiat\AppData\Roaming쪽으로 생성되게 되어 있다.    

이것은 상당히 불편하기 때문에 이 경로 및 프라이빗 네트워크를 구성하기 위한 Genesis Block생성부터 전반적인 세팅을 함께 진행해 나갈 생각이다.    

사실 이 과정은 구글신에서 찾으면 전부 나오는 정보들이지만 나 자신부터 일단 리마인드 하는 과정이기 때문에 일일히 기록을 남겨볼 생각이다.    
간만에 하니 버벅 버벅....

* 처음 GETH를 다운받고 설치할 때 노드만 설치하면 해당 Tool기능을 사용할 수 없다. 따라서 설치시 Tool관련 체크박스도 체크해서 전체 설치를 해준다.    2

1. 폴더 생성

나의 경우에는 C:// 에 basquiat-blockchain이라는 폴더를 생성했다.

```
$ mkdir basquiat-blockchain
$ cd basquiat-blockchain

```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-1/capture/shot1.PNG)      

이미지처럼    
```
$ puppeth

```    
를 치면 console에 이모지를 띄우고 네트워크 이름을 지으라고 나온다.    

여러개를 했는데 아마도 보안문제로 리젝.... 단순하게 나는 basquiat라는 이름으로 네트워크 이름을 지었다.

추가 --> 살펴보니 대문자도 안되는듯 하다...많이 바꼈넹....

그 이후로는 What would you like to do? (default = stats)라는 질문을 던지는데 일단은 프라이빗 네트워크를 위한 제네시스를 생성해야하기에 2를 입력한다.

What would you like to do? (default = create) 질문에는 새로 생성할 것이기 때문에 1을 입력하고 그 이후 합의 엔진 선택이 나오는데 clique는 잘 모르겠다. ㅎㅎㅎㅎㅎ     
원래 POW였기 때문에 (부테린이 POS하고 싶어 한다지??) 1. Ethash를 선택한다.


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-1/capture/shot2.PNG)     

Which accounts should be pre-funded? (advisable at least one) 이 질문에는 그냥 엔터로 패쓰    

Should the precompile-addresses (0x1 .. 0xff) be pre-funded with 1 wei? (advisable yes) 이 질문은 첨인데 아마 바뀐듯....그냥 엔터로 패쓰    

Specify your chain/network ID if you want an explicit one (default = random) 이 질문에는 네트워크 아이디를 설정하는 질문이다.

나는 나의 생년인 1978을 선택했다. 하지만 여기서 주의할 점은 실제 메인넷, 테스트넷에서 사용하고 있는 아이디는 사용할 수가 없다.    


https://medium.com/@piyopiyo/list-of-ethereums-major-network-and-chain-ids-2bc58e928508    

위 링크에서 알 수 있듯이 1, 3, 4, 42 는 이미 사용되고 있기 때문에 사용하지 않는다.    

어째든 위 과정이 끝나면 해당 폴더에 다음과 같은 파일이 생성된다. 이것도 좀 바뀐듯.... 예전에는 json하나만 생성되었는데 처음보는 3개의 파일도 보인다.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-1/capture/shot3.PNG)     


자 이제는 Genesis Block을 생성할 차례이다.

위에서 만든 폴더로 들어가자...

```    
geth --datadir . init basquiat.json
```    

그리고 위 명령어를 실행하자.. basquiat.json은 위 과정에서 생성된 정보이다.  

완료가 되면 아래 그림처럼 로그를 띄운다.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-1/capture/shot4.PNG)     

성공했다면 해당 폴더를 보면 이미지처럼 geth와 keystore 폴더가 생성된 것을 볼 수 있다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-1/capture/shot5.PNG)    


## Next    

일단 프라이빗 네트워크에서 coinbase를 생성할 예정이다.     

이더리움에 대해서 전부 설명하려면 많이 힘들다.    

심플하게 얘기하자면 coinbase는 보통 자신의 노드에서 최초로 계정을 생성했을 때 coinbase가 된다.     

이것은 노드가 채굴시 채굴 보상인 이더리움이 들어가는 계정이 되기도 하고 노드에서 명령어로 여러개의 계정을 생성했을 경우 이 coinbase를 변경할 수도 있다.    

어찌 되었든 다음 스텝은 coinbase를 생성하고 여분으로 2,3개의 계정을 생성해 볼 생각이다.    

무엇보다 이더리움을 활용해 스마트 컨트랙트를 개발하기 위해서는 이런 command에 좀 익숙해질 필요가 있다. 예전에는 수도없이 해봤는데 안해본지 오래되보니 전부 까먹었다.     

리마인드 차원에서 하나씩 소개해가며 해 볼 생각이다.     