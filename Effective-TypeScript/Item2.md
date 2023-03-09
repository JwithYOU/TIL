# 1장 타입스크립트 알아보기

아이템 2 타입스크립트 설정 이해하기
--  
타입스크립트 컴파일러는 많은 설정을 가지고 있습니다. 이미 100개가 넘는 설정이 존재합니다.

타입스크립트의 설정들은 어디서 소스 파일을 찾을지, 어떤 종류의 출력을 생성할지 제어하는 내용이 대부분이지만 언어 자체의 핵심 요소들을 제어하는 설정도 있습니다.  
설정을 제대로 사용하려면, **noImplicitAny**와 **strictNullChecks**를 이해해야 합니다.

```js
const add = (a, b) => {
  return a + b;
};
```

위 코드는 noImplicitAny가 해제되어 있을 때에는 유효합니다.
any를 코드에 넣지 않았지만 암묵적으로 any 타입이 사용된다고 생각하면 됩니다.
하지만 noImplicitAny를 설정한다면 명시적으로 any 타입으로 선언하거나 더 분명한 타입으로 설정해야 오류가 나타나지 않습니다

strictNullChecks는 null과 undefined가 모든 타입에서 허용되는지 확인하는 설정입니다.

```js
const x: number = null;
// 'null' 형식은 'number' 형식에 할당할 수 없습니다.
```

위 코드는 strictNullChecks가 해제 되어있을 때에는 유효하지만 설정을 한다면
위와 같은 오류가 발생합니다. null 대신에 undefined를 써도 같은 오류가 나타납니다. 만약 null을 허용하려면 의도를 명시적으로 나타내야 합니다.

```js
const x: number | null = null;
```

만약 null을 허용하지 않으려면 null을 체크하는 코드나 단언문(assertion)을 추가해야 합니다.  
strictNullChecks를 설정하려면 noImplicitAny를 먼저 설정해야 합니다.
만약 strictNullChecks 설정 없이 프로젝트를 진행하신다면 **"undefined는 객체가 아닙니다"** 라는 런타임 오류를 주의하시기 바랍니다.

---

## 요약

- 타입스크립트 컴파일러는 언어의 핵심 요소에 영향을 미치는 몇 가지 설정을 포함하고 있습니다.
- 자바스크립트 프로젝트를 타입스크립트로 전환하는게 아니라면 noImplicitAny를 설정하는 것이 좋습니다.
- "undefined는 객체가 아닙니다" 같은 런타임 오류를 방지하기 위해서는 strictNullChecks를 설정하는 것이 좋습니다.
- 타입스크립트에서 엄격하게 체크를 하고 싶다면 strict 설정을 고려해야 합니다.
