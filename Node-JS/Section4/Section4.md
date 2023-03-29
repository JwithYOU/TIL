# Section4: 워크플로우 및 디버깅

## 42. npm 스크립트의 이해

npm은 Node Package Manager의 약자로 Node.js 패키지를 관리하고 배포하기 위한 패키지 매니저입니다. npm을 사용하여 다른 개발자들이 작성한 Node.js 패키지를 쉽게 설치할 수 있습니다. 또한 자신이 작성한 패키지를 npm에 배포하여 다른 개발자들이 사용할 수 있도록 할 수도 있습니다.

package.json을 생성하고 싶은 폴더를 터미널로 들어간 다음에 npm init을 입력합니다. 입력하고 싶은 내용을 적거나 엔터를 눌러서 스킵해도 상관없습니다. 그 과정을 거치면 package.json 파일이 생성됩니다.  
script에 실행 시키고 싶은 명령어 추가할 수 있습니다. 예를 들어

```json
"script" : {
  "start": "node app.js"
}
```

이런 내용을 넣고 터미널에서 npm start를 입력하면 node app.js와 같은 역할을 수행합니다. 하지만 start는 특수한 케이스라서 npm 다음에 바로 start를 입력해도 작동하지만 특수한 경우가 아니라면 npm 다음에 run까지 붙여줘야 합니다.
