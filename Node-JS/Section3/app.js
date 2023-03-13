const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
});

server.listen(3000);
//  그냥 createServer만으로는 서버를 실행시킬 수 없기 때문에 변수로 선언하고 listen 메서드를 사용
// listen에 첫번째 인자로 들어가는 값은 포트번호
