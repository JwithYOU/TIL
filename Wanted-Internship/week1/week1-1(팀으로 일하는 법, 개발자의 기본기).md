# 원티드 프리온보딩 프론트엔드 인턴쉽 1주차

## Week1-1

> ### Overview

개발자로서 갖추야 할 역량은 크게 두 가지로 나눈다면 "하드스킬"과 "소프트스킬"로 나누어 볼 수 있을거 같습니다. 여기서 하드스킬은 업무를 수행하는데 필요한 지식과 기술, 소프트스킬은 업무 효율성을 극대화 하기 필요한 능력이라고 간단하게 설명할 수 있습니다.  
개발자 혼자서 하나의 프로덕트를 만들 수 없기 때문에 다양한 직군들과의 협업은 필수사항입니다. 그렇기 때문에 타 직군 사람들에게도 생소하게 느껴지는 사항들도 쉽게 설명할 수 있는 능력을 가지는 것이 중요합니다.  
그러기에 먼저 같이 일하는 개발팀원 간에 소통이 1순위이가 되어야겠지요? 그래서 이와 관련해서 Git고 Github을 문서의 관점에서 알아보고, 협업 능력, 효율적인 소통을 위해서 어떤 부분들을 시도할 수 있는지 그리고 개발자는 어떻게 팀으로 일하는지 알아보겠습니다.

> ### Git & GitHub을 사용하면서 지켜야 할 것

#### Git & GitHub의 정의

- Git은 분산 버전 관리 시스템입니다.
- Git을 사용해서 코드의 버전을 관리하면서 손쉽게 코드를 이전으로 롤백하거나, 분리된 환경(브랜치)에서 개발 후 다른 환경과 병합하는 등의 과정을 손쉽게 활용할 수 있습니다.
- GitHub은 Git의 원격 저장소입니다. GitHub을 이용해 개인적으로만 사용할 수 있었던 Git의 기능들을 인터넷을 이용해서 여러 사람들이게 공유하고, 팀원들과 공동으로 작업할 수 있게 되었습니다.
- Git과 GitHub은 현재 개발 생태계에서 분산 버전 관리 시스템의 표준입니다. 대부분의 개발팀이 Git과 GitHub 또는 GitHub과 유사한 원격 저장소 시스템(GitLab, BitBucket) 등을 활용하면서 작업을 합니다.

> ### Commit Message

깃허브를 사용하면서 작성한 코드를 원격에 push 하려면 commit message를 작성해야 합니다. 여기서 개발자가 다른 개발자의 코드를 분석할 때 이 코드가 어떤 목적을 가지고 작성되었는지를 commit message를 통해서 확인할 수 있도록 명시해야 합니다.  
그렇기에 팀 내에서 일관된 commit message 규칙을 정하는 것은 필수사항 입니다. 정석은 없지만 메세지에 어떤 내용들이 포함되고 어떤 규칙을 사용하지는 팀원들과 정해야합니다. 아래 링크를 통해서 도움을 얻을 수 있습니다.  
[Commit message guidelines](https://gist.github.com/robertpainsi/b632364184e70900af4ab688decf6f53)  
[How to Write Good Commit Message](https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/)

> ### ESLint와 Prettier, Git Hook을 이용한 팀의 능률 올리기

#### 1. Linter & Code Formatter

하나의 프로젝트를 진핼할 때 통일 되지 않은 코드 스타일은 팀원 간에 이해하기도 어렵고 제 3자 또한 읽기 힘들 것입니다. 이러한 문제를 해결하기 위해서 lint와 code formatter를 사용할 수 있습니다.  
자바스크립트에서는 lint는 ESLint, code formatter는 Prettier를 사용합니다.

#### 2. ESLint

- 버그를 피할수 있는 코드를 짜기 위해서 만들어졌고 버그가 발생할 여지가 있거나, 불필요한 코드, 보안상 위험한 코드에 대해서 경고를 줄 수 있습니다.
- 커스터마이징도 가능하기 때문에 규칙을 만들어 커스텀 할 수 있습니다.

#### 3. Prettier

- Prettier는 코드 포맷팅 툴로서 이 또한 커스터마이징이 가능하고 이 툴을 사용함으로서 팀원 모두가 같은 포맷팅스타일을 공유할 수 있습니다.

#### 4. 설치

1. eslint

- `npm install eslint --save-dev`  
  --save-dev는?🤔  
  개발환경에서 필요한 버전을 추가하는 방법입니다. packge.json에 굳이 올라갈 필요가 없습니다.
- CRA의 경우 내장되어 있어 따로 설치하지 않아도 됩니다.

2. prettier

- `npm install prettier --save-dev`

3. eslint-config-prettier

- eslint에서도 일부 formatting 관련된 rule도 포함되어 있습니다.
- eslint가 formatter 관련해서 관여할 수 없도록 관련 rule 해제해줍니다.
- `npm install eslint-config-prettier --save-dev`

#### 5. 설정

- 설치를 완료하고 팀원들 간에 규칙을 정한 다음 항상 동일하게 적용하기 위해서 프로젝트 내에 설정파일을 이용해서 같은 환경을 유지할 수 있습니다.

5-1) Prettier 설정

- Prettier는 프로젝트의 루트 디렉토리에 `.prettierrc.확장자` 파일을 통해서 설정할 수 있습니다.
- Prettier 설정은 포맷팅에만 관련이 있어서 비교적 설정 rule이 간단하고 설정파일의 확장자 형식도 (JSON, YAML, JS, TOML) 다양합니다.
- 예시

```js
// .prettierrc.js

module.exports = {
  printWidth: 100, // 코드의 길이가 100을 넘으면 줄바꿈(default: 80)
  singleQuote: true, // ''을 사용
  arrowParense: "avoid", // 화살표 함수 파라미터가 하나일 경우 괄호 생략
};
```

prettier를 적용하면 에디터 내에서 자동으로 적옹이 되지만 터미널 명령어를 통해서도 할 수 있습니다.  
` npx prettier .` 여기서 . 은 현재 폴더 있는 모든 파일에게 적용한다는 뜻입니다. 명령어를 입력하고 터미널을 보면 포맷된 형태의 내용이 나타나는 것을 볼 수 있습니다.  
터미널 출력에서 벗어나 변경된 내용을 저장까지 하는 방법도 있습니다. `npx prettier --write .` --write 까지 추가하면 저장까지 되는 것을 확인할 수 있습니다.  
한 개의 파일만 수정했을 때 해당 파일만 포맷하는 방법이 있습니다. `npx prettier --write -cache .`  
이렇게 하면 불필요한 포맷작업을 하지 않아도 됩니다.  
이런화 과정을 통해서 자동화를 사용할 수 있습니다.  
package.json에서 scripts에 원하는 명령어와 `npx prettier --write -cache .` 를 추가하면 npm을 통해서 해당 명령어를 실행할 수 있습니다.

5-2) ESLint 설정

- eslint 설정은 커스터마이징 할 수 있는 부분(언어별: js, ts 환경별: web, node, react등)이 많습니다.
- eslint에서 기본적으로 javascript를 위한 lint 기능이기 때문에 제공되지 않는 특정 환경의 rule을 추가하고 싶을 때는 plugin을 이용할 수 있습니다.
- 예시

```json
// .eslintrc

{
  "extends": ["react-app", "eslint:recommended", "prettier"],
  "rules": {
    "no-var": "error", // var 금지
    "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
    "no-console": ["error", { "allow": ["warn", "error", "info"] }], // console.log() 금지
    "eqeqeq": "error", // 일치 연산자 사용 필수
    "dot-notation": "error", // 가능하다면 dot notation 사용
    "no-unused-vars": "error" // 사용하지 않는 변수 금지
  }
}
```

eslint에서도 prettier에서와 유사하게 사용할 수 있습니다.  
`npx eslint .`을 하면 전체파일을 검사하고 `npx eslint --cache .`를 입력하면 변경된 사항에서만 검사를 진행합니다.  
검사해야하는 파일과 아닌 파일을 구분하는 방법은 `.eslintcache` 파일에 저장이 됩니다.  
이 파일은 작성자 pc 폴더를 기준으로 저장이되니 다른 pc에서는 불필요한 사항이므로 gitignore에 추가해서 깃허브에 올라가지 않도록 해야합니다.

### 6. Husky

#### 6-1. 도입배경

- eslint와 prettier만 도입해도 개인이 작업할 때 적용 안 하면 말짱 도루묵...
  그것을 방지하기 위해서 도입
- husky의 장점
  1. 매우 낮은 용량(6kB)
  2. zero dependencies (의존성이 없기 때문에 다른 곳에 문제가 생겨도 돌아가는데 지장 없음)

#### 6-2. 문제해결방안

- 자동화를 통해서 특정 상황에 적요
- commit된 코드는 formatting이 되고 eslint를 통과 해야 push될 수 있도록 구축

#### 6-3. 실행방안

- git hook 도입
- git hook은 git에서 특정 상황 전, 후에 hook이 실행됨
- husky를 사용해서 git hook을 보다 편리하게 설정할 수 있음

#### 6-4. Husky

- git hook을 도와주는 npm package

#### 6-5. Husky를 통한 Git Hook 적용

1. `npm  install husky --save-dev`
2. (처음 husky 세팅하는 사람만 필요) `npx husky install`  
   a. `npx husky install` : husky에 등록된 hook을 실제 .git에 적용시키기 위한 스크립트  
   b. add postinstall script in package.json  
   (clone 받은 후 npm install 후 자동으로 husky install 되도록하는 설정)

```json
// package.json

{
  "scripts": {
    "postinstall": "husky install"
  }
}
```

3. scripts 설정

```json
// package.json

{
  "scripts": {
    "postinstall": "husky install",
    "format": "prettier --cache --write .",
    "lint": "eslint --cache ."
  }
}
```

4. add pre-commit, pre-push hook  
   a. `npx husky add .husky/pre-commit "npm run format"`  
   b. `npx husky add .husky/pre-push "npm run lint""`

#### 6-6. 참고사항

- git hook에서 eslint 에러가 발견하면 실행중인 script가 종료 되기에 이 rule에 대해서 error나 warn 중에서 뭐로 할지 정해야함
  - 예시)
    - `"no-console": ["warn", { "allow": ["warn", "error", "info"] }]`
      console.log가 있어도 push 가능
    - `"no-console": ["error", { "allow": ["warn", "error", "info"] }]`
      error로 설정 되어있어 push 안 됨
  * 참고사항)
  - lint에서 warn도 허용하지 않으려면 `eslint --max-warning=0`을 옵션으로 scripts에 추가하면 됨

```json
// package.json
{
  "scripts": {
    "lint": "eslint --cache --max-warnings=0"
  }
}
```
