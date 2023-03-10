# 1장 타입스크립트 알아보기

아이템 3 코드 생성과 타입이 관계없음을 이해하기
--  
**타입 오류가 있는 코드도 컴파일이 가능합니다.**
타입스크립트 컴파일러는 두 가지 역할을 수행합니다

1. 최신 타입스크립트/자바스크립트 브라우저에서 동작할 수 있도록 구버전의 자바스크립트로 트랜스파일(transpile)합니다.  
   (transpile은 translate와 compile이 합쳐져서 만들어진 신조어 입니다. 소스코드를 동일한 동작을 하는 다른 형태의 소스코드로 변환하는 행위입니다.)
2. 코드의 타입 오류를 체크합니다.  
   여기서 이 두 기능은 서로 독립적입니다. 타입스크립트가 자바스크립트로 변활될 떄 코드의 내의 타입에는 영향을 주지 않고 자바스크립트의 실행 시점에도 타입은 영향을 미치지 않습니다.

컴파일은 타입 체크와 독립적으로 동작하기 때문에, 타입 오류가 있는 코드도 컴파일 가능합니다.  
타입 오류가 있는데도 컴파일이 된다는 것이 허술해 보일 수 있으나 애플리케이션 어떤 부분에 문제가 있더라도 타입스크립트는 여전히 컴파일된 산출물을 생성하기 때문에 오류를 수정하지 않더라도 애플리케이션에 다른 부분을 테스트 할 수 있습니다.
만약 오류가 있을 때 컴파일하지 않으려면 noEmitOnError를 설정하면 됩니다.

**런타임에는 타입 체크가 불가능합니다.**

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

const calculateArea = (shape: Shape) => {
  if (shape instanceof Rectangle) {
    // 'Rectangle'은(는) 형식만 참조하지만, 여기서는 값으로 사용되고 있습니다.
    return shape.width * shape.height;
    // 'Shape' 형식에 'height' 속성이 없습니다.
  } else {
    return shape.width * shape.width;
  }
};
```

여기서 instanceof 런타임에 일어나지만, Rectangle은 타입이기 때문에 런타임 시점에 아무런 역할을 할 수 없습니다.  
타입스크립트는 자바스크립트로 컴파일되는 과정에서 모든 인터페이스, 타입, 타입 구문은 제거 됩니다. 그렇기 때문에 위에 작성한 코드를 작성하면 주석에 작성한 내용처럼 오류가 나타납니다.

```ts
const calculateArea = (shape: Shape) => {
  if ("height" in shape) {
    shape;
    return shape.width * shape.height;
  } else {
    shape;
    return shape.width * shape.width;
  }
};
```

속성 체크는 런타임에 접근 가능한 값에만 관련되지만, 타입 체커 역시도 shape의 타입을 Rectangle로 보정해 주기 때문에
오류가 사라집니다.

---
