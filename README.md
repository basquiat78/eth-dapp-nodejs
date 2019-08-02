# eth-dapp-nodejs

간만에 이더리움 스마트컨트랙트를 이용한 악기 장터를 구현해볼 생각이다.

기억을 더듬으면서 가나쉬+트러플프레임워크랑 연계해서..

커밍쑨~~~

# Prerequisites

os: window 10    
ide: vscode version 1.36.1    
git version 2.21.0    

# Etheream Installation    
이더리움을 이용한 스마트컨트랙트를 구현하기 위해서는 이더리움 게스를 설치해야한다.    

https://geth.ethereum.org/downloads/    

현재 버전은 지금 이 README.ms를 작성하는 기준으로[] Download Geth – Lucky Leprechaun (v1.9.1) – Release Notes]으로 1.9.1버전이다.     
다운로드를 받자.    

설치 완료 이후에 CMD에서 다음과 같이 잘 설치가 되었는지 확인을 해보자.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot1.PNG)    


## NodeJs Installation    
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
$ node -v
```

6.9.0    
v10.16.1

이라고 뜨면 세팅 완료    


## Ganache Installation    

그 다음에는 가나슈를 설치해야한다.    

https://www.trufflesuite.com/ganache      

다음 사이트로 이동하자. 보니 버전이 당시에 처음 접했을 때보다 높아졌다.    

일단 window버전으로 다운로드 받으면 현 기준으로 Ganache-2.1.0.appx를 받게 된다.    
설치하게 되면 맨 처음 화면에서 Aynaltic어쩌구 저쩌구가 되는데 그냥 Continue를 누르게 되면 다음과 같은 화면을 만나게 된다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot2.PNG)    

그냥 QUICKSTART버튼을 누르자.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot3.PNG)    

다음과 같은 화면이 등장한다.    

문득 '이거 왜 쓰지?' 라고 생각할 수 있다.    

일단 화면을 보면 알겠지만 10개의 계정을 가나슈가 자동으로 생성해 준다.    
그리고 상당을 보면 로컬에 깔려있는 GETH를 인식하고 자동으로 실행한다.    

예전에 스마트컨트랙트 개발 관련 서치를 했을 때 외국인들의 블로그를 통해서 가나슈 사용에 대한 몇가지 코멘트를 남겼는데 이것이 스마트컨트랙트 개발에 있어서 많은 부분을 편하게 해준다고 한다.    

뭐 그렇다고 한다.    

## Truffle Installation    

```
$ npm install -g truffle
```

-g옵션은 글로벌로 설치하겠다는 의미라는 것을 굳이 언급하고 간다.    

설치하고 잘 설치되었는지 확인해 보자.    

```
$ truffle -version
```

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot3.PNG)     


개발을 위한 모든 설정이 준비가 되었다.    