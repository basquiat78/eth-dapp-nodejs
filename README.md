# eth-dapp-nodejs

간만에 이더리움 스마트컨트랙트를 이용한 악기 장터를 구현해볼 생각이다.

기억을 더듬으면서 가나쉬+트러플프레임워크랑 연계해서..

커밍쑨~~~

# Prerequisites

os: window 10    
ide: vscode version 1.36.1    
git version 2.21.0    
Truffle v5.0.30 (core: 5.0.30)    
ganache v2.1.0    
Solidity v0.5.0 (solc-js)    
Node v10.16.1    
Web3.js v^1.2.0    
Vue Version 3.10.0    
Python Version 2.7.16
 
# Etheream Installation    
이더리움을 이용한 스마트컨트랙트를 구현하기 위해서는 이더리움 게스를 설치해야한다.    

https://geth.ethereum.org/downloads/    

현재 버전은 지금 이 README.ms를 작성하는 기준으로[] Download Geth – Lucky Leprechaun (v1.9.1) – Release Notes]으로 1.9.1버전이다.     
다운로드를 받자.    

설치할 때는 Tool도 같이 체크해서 설치해줘야 한다.    

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

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot4.PNG)     


## VSCODE solidity Configuration    

VSCODE에서 확장팩을 통해 Solidity를 지원할 수 있게 설정 해 보자.     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot5.PNG)    

이미지에서 볼수 있듯이 좌측 하단에 보이는 네모 모양의 이모티콘을 누르면 Extensions: Marketplace가 보이고 검색할 수 있게 되어 있다.     
solidity로 검색하면 여러개의 확장팩이 뜨는데 맨 위 Juan Blanco의 solidity를 인스톨하자.    

설치가 완료되면 확장탭에 설치된 확장팩이 보인다. IDE를 다시 시작하면 된다.    

## Meatmask Installation    

https://metamask.io/    

사이트로 이동하게 되면 가운데 상단 GET CHROME EXTENSION를 클릭하고 크롬 브라우져 확장에 추가한다.    

추가가 완료되면 다음과 같이 작은 이모티콘이 생성된 것을 확인 할 수 있다.    
이모티콘을 클릭해 보자.    
아래 이미지를 참조하면 된다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot6.PNG)    


시작하기를 누르면 밑에 그림이 뜬다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot7.PNG)    

[지갑가져오기]와 [지갑생성하기] 두가지를 볼 수 있는데 최초 가나슈를 띄웠을 때 화면으로 돌아가 보자.    

가나슈 화면을 보면 MNEMONIC (니모닉)이라 해서 여러개의 단어들이 나열되어 있는 것을 볼 수 있다.    

기존에 생성된 것들이 있기 때문에 이 니모닉을 통해서 지갑을 가져올 생각이다.    

[지갑가져오기]를 클릭하면 동의하는 화면으로 넘어간다. 동의하면 아래 그림처럼 화면으로 넘어간다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot8.PNG)     

비번을 입력하고 생성하자.     

### Ganache 설정 변경    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot9.PNG)   

그림을 보면 메타마스크를 눌렀을 때 상당 중앙에는 메인넷으로 설정되어 있다.    

눌러보면 그림처럼 메타마스크에서 여러 호스트를 설정할 수 있게 되어 있는데 여기에 맞추기 위해서 가나슈의 설정을 좀 변경해야한다.    

가냐슈를 띄우면 우측 상당에 [톱니모양]의 설정 버튼을 누른다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot10.PNG)    

메타마스크에서 로컬호스트의 경우 포트를 8545로 쓰기 때문에 가나슈 역시 저 포트로 설정해 보자.    

그러면 다음처럼 100이더가 내 계정에 있다는 것을 확인할 수 있다.    


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot11.PNG)    


확인해 보면 알겠지만 가나슈 띄울 때 생성한 10개의 계정중 첫 번째 계정과 동일하다는 것을 알 수 있다.    

메타 마스크는 계정을 계속 생성할 수 있기 때문에 다음 이미지를 참조해 보자.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot12.PNG)    

메타마스크를 누르면 상당에 알록달록한 동그라미가 있는데 누르면 위 그림처럼 뜨는 것을 볼 수 있다.    

이 때 계정 생성을 하게 되면 새로운 주소를 발급받는데 이전에 니모닉으로 메타마스크에 계정 생성을 시도 했기 때문에 생성할 때마다 가나슈에 있는 주소들로 하나씩 생성하게 된다.    

나는 10개를 죄다 생성했다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/master/capture/shot13.PNG)   

근데 11개째부터는 가나슈에서 생성한 주소가 아니기 때문에 이더도 0이다. 일단 여기까지 완료하게 되면 기본적인 개발 환경 세팅은 끝났다.


# 진행 완료된 브랜치    
[dapp-step-1](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-1), [dapp-step-2](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-2), [dapp-step-3](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-3), [dapp-step-4](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-4), [dapp-step-5](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-5), [dapp-step-6](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-6), [dapp-step-7](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-7), [dapp-step-8](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-8)


# At A Glance     

심플하지만 이더리움을 이용한 dApp을 한번 구성해 보았다.     

최종 소스는 마지막 브랜치인 [dapp-step-8](https://github.com/basquiat78/eth-dapp-nodejs/tree/dapp-step-8)을 참고하시면 되겠다.    

front-end쪽은 vueJs나 또는 reactJs로 구성할 수도 있고 jQuery를 이용한 어떤 방식으로도 구현할 수 있다.     

다만 이것을 왜 써야 하는지에 대한 의구심이 있을 수 있겠지만 전에도 언급했던 이야기지만 구매 이력에 대한 악의적인 변경이 불가능하다고 할 수 있다.     

그 외에도 이전에 구현했던 것들중 옥션같은 것도 나름 괜찮다.    

이 깃헙을 보는 많은 분들중 dApp을 하고자 하시는 분들에게 많은 도움이 되었으면 좋겠다.     


# Add cmder setting with vscode

https://github.com/cmderdev/cmder/wiki/Seamless-VS-Code-Integration

원래 나의 메인 IDE는 이클립스나 인텔리제이를 주로 쓴다.     

하지만 vscode의 경우에는 저 위에 IDE만큼이나 잘 만들어져 있고 MS가 만든것인만큼 막강한 기능들이 탑제되어 있다.    

주로 node쪽 작업은 vscode를 주로 사용하는데 찾아 보니 vscode의 터미널. powershell을 cmder로 사용할 수 있는 방법이 있어서 한번 따라서 세팅을 해 봤다.

사실 많이 쓸일은 없겠지만 현재 web3 1.2.0버전이 윈도우에서 npm으로 인스톨에 문제가 있으니 (향후 어떻게 변할지 모르겠지만) 당장은 따로 cmder를 띄울 수 있겠으나 만일 이더리움 dApp을 개발하는 입장에서는 아예 vscode의 파워쉘을 cmder로 쓸 수 있게 세팅하는 것도 나름 괜찮아 보여서 해봤다. 

관심있으면 위 링크를 참조하면 좋을 듯 싶다. 