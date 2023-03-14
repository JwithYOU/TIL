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

## 32.라우터 요청

url에 따라서 다른화면은 보여줄 수 있도록 할 수 있습니다

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  if(url === '/') {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body><form action="/message"><input type="text" name="message"></input></form></body>");
    res.write("</html>");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello World</title></head>");
  res.write("<body><h1>Show me the money!</h1></body>");
  res.write("</html>");
  res.end();
});
```

이런식으로 url이 / 일 때와 아닐 때는 각각 다른 내용을 볼 수 있도록 하였습니다. if문 안에 return을 넣은 이유는 res.end() 뒤에는 res.write나 res.setHeader 가 오면 안되기 때문에 함수를 종료하기 위해서 return을 추가해줍니다.

## 33.요청 리디렉션

```js
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello World</title></head>");
  res.write("<body><h1>Show me the money!</h1></body>");
  res.write("</html>");
  res.end();
});
```

input태그로 텍스트를 입력해서 버튼을 클릭했을 때 POST요청을 보내는 코드를 작성했습니다. input에 아무 내용을 담아서 버튼을 클릭하면 두번째 if문으로 넘어가게 됩니다.

## 34.요청 분문 분석

input에 텍스트를 넣었을 때 어떤 식으로 데이터가 작도잉 되는지 가볍게 보겠습니다.

```js
if (url === "/message" && method === "POST") {
  const body = [];
  req.on("data", (chunk) => {
    console.log(chunk);
    body.push(chunk);
  });
  req.on("end", () => {
    const parseBody = Buffer.concat(body).toString();
    const message = parseBody.split("=")[1];
    fs.writeFileSync("message.txt", message);
  });
  res.statusCode = 302;
  res.setHeader("Location", "/");
  return res.end();
}
```

위에 작성된대로 코드를 변경하고 input에 hello를 입력하게되면 터미널에 이런 내용이 나타납니다

```js
<Buffer 6d 65 73 73 61 67 65 3d 68 65 6c 6c 6f>
```

그리고 작성되어있는대로 과정을 거치면 message.txt가 정상적으로 생성이됩니다.  
이 과정이 복잡해서 어려워 보일 수 있으나 향후에 사용하게될 Express.js를 쓰게 된다면 조금 더 단순하게 사용할 수 있습니다. 지금은 그저 흐름만 파악하고 넘어가는게 좋습니다.
