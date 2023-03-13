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

## 29.요청의 이해

앞서 서버를 생성하는 과정에서 createrServer를 사용하는 과정 중에 요청했을 때 해당 값을 console.log로 출력하면
많은 양의 데이터가 객체로 나타납니다. 여러가지 정보들이 있는데 해당 데이터를 알고 싶다면 req뒤에 원하는 데이터를 붙이면 됩니다.

```js
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
});
```

console.log를 다음과 같이 변경했을 때 터미널에는 아래와 같이 출력됩니다.

```js
/ GET {
  host: 'localhost:3000',
  connection: 'keep-alive',
  'sec-ch-ua': '"Google Chrome";v="111", "Not(A:Brand";v="8", "Chromium";v="111"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'sec-fetch-site': 'none',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-user': '?1',
  'sec-fetch-dest': 'document',
  'accept-encoding': 'gzip, deflate, br',
  'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
}
```

url과 메소드 그리고 헤더까지 해당하는 정보가 나타나는것을 확인할 수 있습니다.

## 30.응답 전송

이번에는 요청이 들어왔을 때 그에 해당하는 응답을 주는 코드를 작성해 보겠습니다

```js
const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello World</title></head>");
  res.write("<body><h1>Show me the money!</h1></body>");
  res.write("</html>");
  res.end();
});
```

요청이 들어왔을 때 간단한게 html 양식을 응답하도록 했습니다. 이렇게 하고 크롬에서 개발자도구를 열고 네트워크 탭에 들어갔을 때 작성한대로 Reponse Headers에서 Content-Type: text/html인 것과 작성한 html 내용을 확인할 수 있습니다

## 31.요청과 응답 헤더

아래 링크를 통해서 헤더에 대해서 참고하시면 좋습니다  
[mdn HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
