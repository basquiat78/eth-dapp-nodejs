# dapp-step-2

## 이더리움 노드 계정 생성    
사실 Mist같은 지갑을 사용하면 이런 고생을 하지 않아도 된다. 그냥 미스트 앱에서 계정 생성하고 하면 되는데 아무래도 커맨드에 익숙해지는게 중요하니...     

브랜치 dapp-step-1에서 생성했던 basquiat-blockchain이라는 폴더로 vscode의 터미널에서 들어가자.    

```
$ geth --datadir . account new
```

라고 커맨드를 날려보자.     

그러면 다음 이미지처럼 Passphrase를 묻는다.    

이 패스워드는 차후 지갑을 unlock또는 lock을 할때 저장될 keystore의 파일과 함께 사용되기 때문에 꼭 기억해야만 한다.

일반적인 사이트처럼 두번 확인하니 아까 적은 패스워드를 또 적어준다.

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot1.PNG)   


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot2.PNG)   

이미지처럼 keystore안에 UTC로 시작하는 파일이 생성된 것을 볼 수 있다.

현재 내가 생성한 계정의 주소는 0x767b5b866a93E1857DefBad95927DF79d3b0b92E 이다.    

위에 것을 반복해서 하나 더 만들어 보자.    


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot3.PNG)   


0x3fCEd2a4b157Bf7403313c75bab58c2540AEE729라는 주소가 하나 더 생겼다.    

다음 커맨드를 날려 보자    
```
$ geth --datadir . account list
```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot3.PNG)    

그림처럼 account #0, #1처럼 순서대로 생성된 계정 리스트를 보여준다.    
위에서도 언급했듯이 최초에 먼저 생성한 녀석이 coinbase가 되서 채굴시 보상을 해당 주소가 받게 된다.    