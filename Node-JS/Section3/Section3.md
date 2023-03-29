# Section3: 기본 개념 이해

## 26. Node 서버 생성

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

## 27. Node의 라이프사이클 및 이벤트루프

Node.js의 라이프사이클

1. 터미널에 node app.js 입력
2. 실행이되면 스크립트가 시작되어 Node.js가 파일 전체를 살핌
3. 코드를 분석한 후 변수와 함수를 등록
4. 이벤트리스너가 종료되지 않는 이상 이벤트루프는 계속 작동됩니다.

Node.js가 이 패턴을 사용하는 이유는 자바스크립트가 단일스레드 방식이기 때문입니다.

## 28. Node.js 프로세스 제어

이미 실행중인 Node.js를 종료하려면 Ctrl + C를 해당 터미널에서 입력하면 됩니다

## 29. 요청의 이해

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

## 30. 응답 전송

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

## 31. 요청과 응답 헤더

아래 링크를 통해서 헤더에 대해서 참고하시면 좋습니다  
[mdn HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

## 32. 라우터 요청

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

## 33. 요청 리디렉션

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

## 34. 요청 분문 분석

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

## 35. 이벤트 기반 코드 실행의 이해

작성한 코드가 동작하는데에 있어서 초심자가 오해하기 쉬운 부분이 작성 순서대로 실행이 될거 같다는 부분입니다.

```js
if (url === "/message" && method === "POST") {
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

작성한 이 코드를 봤을 때 req.on 안에 있는 코드는 res.end 다음에 실행이 됩니다. 여기에 중요한 두 가지 의미가 있는데 먼저 response 발송 했다고 해서 이벤트 리스너가 끝났다는 의미는 아닙니다. 발송 된 후에도 이벤트 리스너는 계속 실행이 됩니다. 그리고 이벤트 리스너에 영향을 줄 수 있는 어떠한 처리를 하는 건 잘못된 처리입니다. 그래서 응답 코드 안에 이벤트 리스너를 넣어햐 합니다.

```js
if (url === "/message" && method === "POST") {
  req.on("end", () => {
    const parseBody = Buffer.concat(body).toString();
    const message = parseBody.split("=")[1];
    fs.writeFileSync("message.txt", message);
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  });
}
```

내부적으로 requsest 분석이 완료되면 req.on의 end 이벤트가 자동으로 실행됩니다. 하지만 이렇게 등록할 경우에는 한 가지 문제점이 발생하게 됩니다. 이 문제점은 바로 이어서 설명하도록 하겠습니다.

## 36. 블로킹 & 논블로킹 코드

fs.writeFileSync를 통해서 입력한 테스트 내용이 message.txt 파일에 담겨서 만들어 지는걸 확인했습니다. 하지만 fs.writeFileSync는 한가지 특징이 있는데 바로 동기적으로 작동 된다는 것입니다.  
동기적으로 작동이 된다면 어떠한 작업이 끝나지 않으면 다음 작업으로 넘어갈 수 없습니다.

```js
fs.writeFileSync("message.txt", message);
res.statusCode = 302;
res.setHeader("Location", "/");
return res.end();
```

작성된 코드에서 텍스트를 몇 가지 입력하는 정도는 작업시간이 많이 소요되지 않습니다.  
하지만 만약 처리시간이 오래 걸리는 작업이라면 굉장히 비효율적이게 됩니다.
그래서 비동기 처리방식인 fs.writeFile이 있습니다.  
여기서는 파일이 정상적인 과정이 지나고 나서 다음 코드를 진행하고 싶다면  
writeFile 세번째 인자에다가 함수를 넣어주면 됩니다.

```js
fs.writeFile("message.txt", message, (err) => {
  res.statusCode = 302;
  res.setHeader("Location", "/");
  return res.end();
});
```

이렇게 작성하면 txt파일 작성이되고 나서 응답코드를 실행할 수 있습니다.

## 37. Node.js 백그라운드 확인

자바스크립트는 싱글스레드로 작동됩니다.
Node.js 코드가 실행이되면 이벤트루프가 작동됩니다. 이벤트루프는 이벤트콜백을 다룹니다. 특정 이벤트가 발생했을 때 이벤트루프가 해당 코드를 실행합니다.  
하지만 이벤트루프는 파일 연산과 같이 작업이 오래 걸리는 작업을 다루지 않습니다.  
오직 작업이 완료된 콜백에 대한 코드들만 다룹니다. 즉 이벤트루프는 빨리 끝낼 수 있는 코드를 포함한 콜백만을 다룹니다.  
파일시스템 같이 오래 걸리는 연산에 대해서 Worker Pool(워커풀)로 보내집니다.  
무거운 작업을 담당하는 워커풀은 자바스크립트 코드로부터 완전히 분리되어 작업을 진행합니다. 워커풀을 사용하면 파일압축, 이미지 처리, 데잍터베이스 쿼리 등의 작업을 할 수 있습니다. 워커풀에 보내진 작업이 완료가 되면 메인 스레드에 반환이됩니다. 그러면 이벤트 루프에 대해서 자세히 알아보도록 하겠습니다.

### 이벤트루프

이벤트루프는 Node.js에 의해 실행 됩니다. Node.js를 계속 실행하는 루프로 콜백에 대한 작업을 처리합니다. 요청을 처리할 때는 순서에 따라 처리합니다.

1. Timers 단계  
   타이머 함수와 관련된('setTimeout()'이나 'setInterval()') 콜백 함수를 실행합니다.
2. Pending callbacks  
   시스템 이벤트와 관련된 콜백 함수를 처리합니다. 예를 들어서 읽기 및 쓰기 파일이나 네트워크 연산과 관련된 작업을 실행합니다.
3. Idle, prepare 단계  
   내부적으로 사용되는 단계이며, 실제로 사용되지는 않습니다.
4. Poll단계  
   이 단게에서 I/O 작업을 처리하는데 이 단계에서 대기하고 있는 이벤트가 있다면 해당 작업을 처리하고 없다면 이벤트루프는 일시적으로 대기상태로 들어가 새로운 이벤트가 발생할 때까지 대기합니다.
5. Check 단계  
   'setImmediate()' 함수를 통해서 등록한 콜백 함수가 실행됩니다.
6. Close callbacks 단계  
   시스템 리소스를 해제하는 콜백 함수가 실행됩니다.

이벤트루프는 이러한 단걔를 반복하면서 새로운 이벤트가 발생할 때마다 이벤트를 처리합니다. 이러한 방식으로 Node.js는 비동기적인 방식으로 다양한 작업을 처리할 수 있으며 이를 통해 높은 성능을 발휘할 수 있습니다.

## 38. Node 모듈 시스템 사용

url 확인 등의 작업을 하는 라우팅 파일을 만들어서 보겠습니다.

```js
// routes.js
const fs = require("fs");

const requestHandler = (req, res) => {
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
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Hello World</title></head>");
  res.write("<body><h1>Show me the money!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;

// app.js
const http = require("http");

const routes = require("./routes");

const server = http.createServer(routes);

server.listen(3000);
```

기존에 app.js에 있던 코드를 routes.js라는 파일을 만들어서 옮겼습니다. 이 과정에서 app.js가 routes.js에 있는 함수를 사용하기 위해서 module.exports를 사용하였고 app.js에서는 require를 사용해서 해당 함수를 불러왔습니다.

## 39. 마무리

기본적으로 웹이 작동하는 방식은 클라이언트가 요청을 보내고 요청을 받은 서버는 그에 알맞은 응답을 보내고 클라이언트에서는 받은 응답을 브라우저 화면에 나타냅니다. 이 때 서버에서는 Node.js 프로그램이 작동합니다.

이 전에 언급한 내용중에 프로그램의 주기에 관련된 중요한 개념으로 이벤트 루프가 있었습니다. Node.js 코드는 논블로킹 방식으로 실행됩니다. 많은 콜백과 이벤트를 등록해두면 특정 작업이 끝난 후에 Node.js가 해당 코드를 작동시킵니다. 이렇기 때문에 자바스크립트의 싱글스레드는 항상 이벤트나 새로 들어오는 요청을 다룰 수 있습니다. 더 이상의 작업이 없을 때는 프로그램이 종료가 되는데 서버는 그렇지 않습니다. 서버가 종료 되지 않는 이상 새로운 이벤트나 요청이 들어와도 이벤트 리스너에 등록을 취소하지 않습니다.
