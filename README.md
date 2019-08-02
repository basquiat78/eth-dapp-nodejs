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

나는 basquiat라고 비밀번호를 적었다. 뭐 프라이빗이니깐....     

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

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot4.PNG)    

그림처럼 account #0, #1처럼 순서대로 생성된 계정 리스트를 보여준다.    
위에서도 언급했듯이 최초에 먼저 생성한 녀석이 coinbase가 되서 채굴시 보상을 해당 주소가 받게 된다.    

아참! 참고로 주소를 보면 대문자 소문자가 중구난방으로 들어가 있다. 비트코인는 이 대소문자를 모두 구분한다.     
하지만 이더리움은 대소문자를 구분하지 않는다. 이것은 주소 유효성 Checksum하는 부분을 보면 알수 있는데 모두 소문자로 toLowerCase시킨후 체크한다.    

따라서 이더스캔같은 곳을 가보면 주소들이 전부 소문자로 되어 있는 경우를 볼 수 있다.    
정상적인 것이다라는 것을 미리 밝히고 간다.     

## 이더리움 스타트     

```
geth --networkid 1978 --mine --minerthreads 1 --datadir "./" --nodiscover --rpc --rpcport "8545" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock 0 --password "basquiat"
```

자 저것을 vscode의 터미널에서 basquiat-blockchain이라는 폴더 내부로 들어가서 실행하면 되는데 번거롭기 때문에 bat파일을 생성해서 실행하게 하는게 좋을 거 같다.    

보통 확장자는 .bat나 .cmd로 설정해서 만들면 된다.    

나는 basquiat-blockchain폴더 내부에 mybatch라는 파일을 생성했다.    

예전에는 안그랬던거 같은데 버전이 업데이트되면서 스타트 하는 방식이 좀 변경된듯 싶다.

패스워드 부분이 파일을 읽는 것으로 변경된듯 싶다.    

같은 폴더에 mypassword.txt 파일을 하나 생성하고 그 안에 비번을 넣자.     

그리고 생성한 mybatch파일안에 다음 내용을 넣고 저장하자.

```
geth --networkid 1978 --mine --minerthreads 1 --datadir "./" --nodiscover --rpc --rpcport "8545" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock "0x767b5b866a93E1857DefBad95927DF79d3b0b92E" --password "./mypassword.txt" --allow-insecure-unlock

```


버전이 변경되면서 좀 바뀐듯 한데 이렇게 저장하고 vscode 터미널에서 basquiat-blockchain폴더로 들어가 .\mybatch.cmd를 치고 실행해보자.    


아으...여기서 삽질이 좀 상당했는데....   지치넹. ㅎㅎㅎㅎ


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot5.PNG)    

처음에는 무슨 DAG라 해서 무언가가 잔득 올라가다가 어느 순간

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot6.PNG)    

처럼 마이닝이 되기 시작한다.

하지만 저렇게 하면 좀 부담이 되니 mybatch파일에서 miner옵션을 빼고 실행하자.    

```
geth --networkid 1978 --datadir "./" --nodiscover --rpc --rpcport "8545" --rpccorsdomain "*" --nat "any" --rpcapi eth,web3,personal,net --unlock "0x767b5b866a93E1857DefBad95927DF79d3b0b92E" --password "./mypassword.txt" --allow-insecure-unlock

```

아참 저 위의 명령어들중에 rpcapi에서 나열한 저것들은 필히 지정을 해야한다.    
만일 지정하지 않으면 차후 rpc통신중 지정되지 않은 스펙들은 호출이 되지 않는다.    
또한 rpccorsdomain 설정도 마찬가지이다.     


자 이제부터는 vscode에서 터미널을 새로 하나 열자. 

새로운 터미널에 다음 명령어를 날려보자. 이제부터는 geth command를 사용할 차례가 된것이다.    

```
$ geth attach ipc:\\.\pipe\geth.ipc
```

무슨 의미인지는 몰라도 된다. 나도 모르니깐. 다만 이 명령어를 치게 되면 이미지처럼 무언가가 뜨면서 마치 mysql 커맨드라인처럼 무언가 칠수 있게 변한다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot7.PNG)    

1. 채굴 시작
```
$ miner.start(1)
```
위에 숫자는 쓰레드 넘버를 의미하는데 1만 해도 된다.    

어째든 후에 트랜잭션을 생성하고 블록에 싣기 위해서는 채굴을 해야한다.     

채굴하는 순간 당신의 컴터가 느려지기 시작하쥬!?!


2. 채굴 종료
```
$ miner.stop()
```

이것을 날리면 첫번째 터미널에서 채굴이 멈춘 것을 확인할 수 있다.  

3. 코인베이스

```
$ eth.coinbase
```
4. accounts list
```
$ eth.accounts
```

5. account balance
```
$ eth.getBalance(eth.coinbase)
```
이렇게 날리면 숫자가 어마무시하게 나오는데 이더는 웨이라는 단위가 있다. 그래서 이더 단위로 보기 위해서는 다음과 같이 날리면 된다.    

```
$ web3.fromWei(eth.getBalance(eth.coinbase))
```

6. sendTransaction (이더를 보내보자)
위에서 우리는 2개의 주소를 생성했다. 코인베이스에서 다른 주소로 코인을 보내보자.

```
$ eth.sendTransaction({from:eth.coinbase, to:eth.accounts[1], value:web3.toWei(10, "ether")})
```
위의 의미를 설명하자면 sendTransaction 즉 트랜잭션을 생성할 건데 from은 이더가 나가는 주소, 즉 코인베이스이고 to는 이더를 받을 주소가 되겠다. value는 이더인데 toWei로 단위를 ether로 지정한다.    

암튼 저 명령어를 날리면 "0x2dd5607d1d89dc0b1b4564112b9832b40758a3610e18d843875bf077fe357c39"같이 생겨벅은 transactionHash값을 보게 된다.    


자 위에서 우리는 컴터가 느려진다는 이유로 miner.stop()으로 채굴을 종료했다.    

실제로 블록에 올라가 이더가 보내져야하기 때문에 miner.start(1) 명령어를 날리고 미리 열어놨던 터미널로 간다.    

![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot8.PNG)    

이미지를 보면 Submitted transaction이라는 부분에 위에서 내가 받은 txHash가 있는 것을 볼 수 있다.    

자 이제 그러면 eth.accounts[1]의 발란스를 보자. 처음에는 0이였기 때문에 10이 뜨는 것을 확인하면 된다.


![실행이미지](https://github.com/basquiat78/eth-dapp-nodejs/blob/dapp-step-2/capture/shot9.PNG)    
 
 7. 종료
 ```
$ exit
 ```
종료

여기까지 다 하게 되었다면 기본적으로 할 수 있는 것은 다 하게 되었다.     

# Next    

원래는 다음은 솔리디티를 해야하지만 이것은 프로젝트를 따로 만들어서 진행해 볼 예정이다.    
지금까지 예전에 회사에서 진행하면서 정리했던 자료들이 이전 버전이라 현재 버전과 좀 상이한 부분이 있어서 엄청난 삽질을 해 온데다가 일일히 스크린샷으로 떠서 진행할려니 좀 더뎌지는듯 해서....     
