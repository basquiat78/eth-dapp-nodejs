# eth-dapp-nodejs

간만에 이더리움 스마트컨트랙트를 이용한 악기 장터를 구현해볼 생각이다.

기억을 더듬으면서 가나쉬+튜플프레임워크랑 연계해서..

커밍쑨~~~

## Prerequisites

os: window 10    
ide: vscode version 1.36.1    
git version 2.21.0    
nodejs

이더리움을 이용한 스마트컨트랙트를 구현하기 위해서는 이더리움 게스를 설치해야한다.    

https://geth.ethereum.org/downloads/    

현재 버전은 지금 이 README.ms를 작성하는 기준으로[] Download Geth – Lucky Leprechaun (v1.9.1) – Release Notes]으로 1.9.1버전이다.     
다운로드를 받자.    

nodeJs를 설치해야하는데 나의 경우에는 nvm를 통한 설치를 더 선호한다. 자세한 설명은 생략한다...이지만     
무엇보다 nvm를 통한 nodejs설치가 차후 버전을 스위치하기가 편하고 버전별로 설치하는 것도 편하다.    

https://github.com/coreybutler/nvm-windows/releases    

다음 사이트에서 nvm-setup.zip을 다운받자. 현 기준으로 [1.1.7 - Maintenance Release]이다.    

설치하고 나서 예전 우분투에서는 

```
$ nvm ls-remote
```

이렇게 하면 목록이 잘 나왔는데 윈도우10에서는 안먹힌다. 인증 문제인지 SSL문제라고 설명이 되어 있는데 귀찮지만 사이트에서 Stable한 버전을 설치해 보자.     

https://nodejs.org/en/    

사이트로 들어가자.    

현재 기준으로 [10.16.1 LTS]버전이 Recommand버전이니 이걸로 설치해 보자.    


```

$ nvm install 10.16.1
```    

설치가 완료되면 다음과 같이 명령어를 더 날려줘야 한다.    

```
$ nvm use 10.16.1

```     

Now using node v10.16.1 (64-bit)이라는 메세지가 뜨면 버전을 확인해서 제대로 뜨는지 확인을 해 보자    

```

$ npm -v
```

6.9.0이라고 뜨면 세팅 완료    

