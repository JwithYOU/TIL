# Section3: 기본 개념 이해

26.Node 서버 생성
--

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

---
