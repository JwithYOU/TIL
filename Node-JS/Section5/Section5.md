# Section5: Express.js

## 58. Express.js란?

Express.js에 대해서 이야기 하기전에 이 전에 작업했던 것을 보면 바디를 추출하기 위해 직접 데이터 이벤트와 엔드 이벤트를 확인하고 마지막에는 버퍼를 문자열로 생성했습니다. 이런 식으로 여러 유형의 데이터에 따라서 새로운 논리를 작성해야 하는데 이러면 정말로 많은 양의 작업을 하게 될 것입니다.  
Express.js는 유연성, 대중성, 확장성 등의 장점이 있기 때문에 Express.js를 사용하면 작업을 좀 더 수얼하게 진행할 수 있습니다. 사실 Express.js를 대체할 수 있는 수단은 존재하지만 많은 사람들이 이용하고 널리 사용되고 있기 때문에 Express.js를 사용하도록 하겠습니다.

## 60. 미들웨어 추가

use()를 통해서 미들웨어 함수를 다룰 수 있습니다.

```js
const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("In the middleware");
});

const server = http.createServer(app);

server.listen(3000);
```

이렇게 app.js를 수정하고 실행하면 브라우저에서는 별다른 반응은 없지만 터미널에서는 작성한 콘솔로그가 나타나는 걸 확인할 수 있습니다. 여기서 next가 눈에 띄는데 next는 애플리케이션의 요청-응답 주기 중 다음 미들웨어 함수에 대한 참조를 나타내는 콜백함수 입니다
