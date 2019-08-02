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


