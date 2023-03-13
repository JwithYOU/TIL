# Section3: 기본 개념 이해

## 26.Node 서버 생성

### http 모듈 생성

```js
const http = require("http");
```

createServer에 요청이 들어올 때마다 노드가 안에 있는 함수를 실행시키는데 이것이 Node.js의 이벤트 드리븐 아키텍처(EDA) 입니다.

```js
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
```

그냥 createServer만으로는 서버를 실행시킬 수 없기 때문에 변수로 선언하고 listen 메서드를 사용합니다
listen에 첫번째 인자로 들어가는 값은 포트번호 입나다

## 27.Node의 라이프사이클 및 이벤트루프

Node.js의 라이프사이클

1. 터미널에 node app.js 입력
2. 실행이되면 스크립트가 시작되어 Node.js가 파일 전체를 살핌
3. 코드를 분석한 후 변수와 함수를 등록
4. 이벤트리스너가 종료되지 않는 이상 이벤트루프는 계속 작동됩니다.

Node.js가 이 패턴을 사용하는 이유는 자바스크립트가 단일스레드 방식이기 때문입니다.

## 28.Node.js 프로세스 제어

이미 실행중인 Node.js를 종료하려면 Ctrl + C를 해당 터미널에서 입력하면 됩니다
