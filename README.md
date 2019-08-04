# dapp-step-6

## vuejs install    

```
npm install -g @vue/cli
npm install -g @vue/cli-service-global
```

지금까지 진행했던 basquiat-blockchain으로 터미널에서 이동한다.

그리고 truffle에 vue project를 만들것이다.

```
cd basquiat-blockchain
PS C:\basquiat-blockchain\truffle> vue create truffle
```

처음에 이미 truffle이라는 폴더가 있기 때문에 3개의 질문이 있을 것이다. overwrite를 하면 다 지워지니 merge를 선택한다.    

그 다음에는 초기 프로젝트의 쓰일 매뉴얼을 선택하게 되는데 맨 처음것은 babel과 eslint가 기본적으로 포함된 manual과 select manual이 있다.    
나는 select manual을 선택하고 babel, vue-router, vuex를 선택했다.    

차후 이때 선택한 사항은 preset으 지정할 수 있어서 다음에 이 세팅으로 프로젝트를 새로 생성할 때 가져다 쓸 수 있다. 나의 경우에는 basquiatSet이라는 이름을 주어 preset를 저장해서 사용하고 있다.    

그러면 필요한 것을 다운로드 받는다.

일단 프로젝트가 세팅이 잘 되었는지 확인해 보자

```
PS C:\basquiat-blockchain\truffle> npm run serve
```

그러면 무언가 진행이 된 이후 

```
 DONE  Compiled successfully in 4377ms                                                                                                                                                                              9:56:52 PM
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://XXX.XXX.XXX.XXX:8080/

  Note that the development build is not optimized.
  To create a production build, run npm run build.

```

이런 로그를 띄운다.    

그러면 http://localhost:8080/ 부분을 ctrl+click을 하면 다음 화면이 뜨게 된다.    


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-6/capture/shot1.PNG)    


vueJs는 vue-cli를 통해서 프로젝트에 필요한 것들을 개발하기 편하도록 미리 설정을 해준다.    

앞으로는 이것을 수정해 가면서 웹페이지를 꾸밀 것이다.     


Vue Version : 3.10.0

현 시점으로 버전이 3.10.0이다.    


## package.json    

해당 json에 스마트컨트랙트를 위해 디펜던시 설정을 해야한다. 

```
  "dependencies": {
    "core-js": "^2.6.5",
    "vue": "^2.6.10",
    "vue-router": "^3.0.3",
    "vuex": "^3.0.1",
    "truffle-contract": "4.0.27",
    "web3": "1.2.0"
  },
```
기존 파일 내용에서 truffle-contract와 web3를 올려야 한다. 현재 시점으로 최신 버전이 위에 언급된 버전이다.    

하지만 npm install을 하면 에러가 발생한다.    

일단 밑에거 실행한다.    
시간이 좀 오래 걸린다.    

```
npm install --global --production windows-build-tools
```

실행이 완료되면 다시 파워셀을 시작해야한다.     

게다가 python 2.7x버전도 요구하네?????    

일단 나는 깔았다.    

https://www.python.org/downloads/    



하지만 여기서 끝나지 않는다.    


무려 4시간의 삽질끝에 web3 1.2.0버전 install중에 설치가 되지 않아 별별 짓을 다 해봤지만 다음과 같은 방법으로 해결했다.    

이건 순전히 web3개발자들의 잘못이라고 본다.    

web3-providers-ws@1.2.0 preinstall 중 발생하는 에러때문인데 이것을 해결하는 가장 쉬운 방법은 그냥 Cmder를 깔아서 설치하는것이다.    

스크립트중에 윈도우10에서 먹히지 않는 명령어가 포함되어 있어서인데 npm 버전업이나 그외 방법은 다 무용지물이다. 그냥 밑에꺼 들어가서 깔자.     

https://github.com/cmderdev/cmder/releases/    


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-6/capture/shot2.PNG)     


그림처럼 생겨먹은 녀석이다. 일단 저게 리눅스 명령어도 윈도우10에서도 먹히게 하는 듯 한다.    

고생하지 말자. 저걸로 그냥 설치해서 끝내자.    


나는 최종적으로 vueJs에서 기본적인 페이지 2개만 쓸 예정이다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-6/capture/shot3.PNG)     

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-6/capture/shot4.PNG)     

삽질의 여파가 너무커서....일단 여기까지....    

지금까지 한 작업물을 truffle에 역시 같이 올린다.     