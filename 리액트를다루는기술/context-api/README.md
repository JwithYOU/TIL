# 제 15장 Context API

## 15.1 Context API를 사용한 전역 상태 관리 흐름 이해하기

리액트 애플리케이션은 컴포넌트 간에 props를 통해서 데이터를 전달 할 수 있습니다.  
App 컴포넌트에게 A와 H라는 자식 컴포넌트가 있습니다. 이 두 컴포넌트는 또 몇개의 자식 컴포넌트들이 있을 때 A 컴포넌트의 마지막 자식 컴포넌트에서 H 컴포넌트 마지막에 있는 컴포넌트에게 데이터를 전달하려면 상태를 변경시키고 또 여러 컴포넌트를 거쳐서 데이터를 전달해야합니다. 그렇다면 실제 리액트 프로젝트에서 더 많은 컴포넌트를 다루기 때문에 이런 방식을 사용하면 유지 보수성이 낮아질 수 있습니다.  
이 때 Context API를 통해서 여러 컴포넌트를 거치지 않고도 한 번에 원하는 값을 받아와서 사용할 수 있습니다.

## 15.2 Context API 사용법 익히기

### Consumer 사용하기

```js
// color.js
import { CreateContext } from "react";

const ColorContext = createContext({ color: "black" });

export default ColorContext;
```

color.js 파일을 만들고 다른 컴포넌트에서 color.js 파일의 데이터를 가져올 수 있도록 해보겠습니다.

```js
// ColorBox.js
import React from "react";
import ColorContext from "./color";

const ColorBox = () => {
  return (
    <ColorContext.Cosumer>
      {(value) => (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: value.color,
          }}
        />
      )}
    </ColorContext.Cosumer>
  );
};

export default ColorBox;
```

ColorBox.js 파일 생성한 다음에 색상을 props로 받아오는 것이 아니라 Consumer라는 컴포넌트를 통해 색상을 조회 합니다. Consumer 사이에 중괄호를 열어서 그 안에 함수를 넣었습니다. 이러한 패턴을 Function as achild, Render Props 라고 합니다. 컴포넌트의 children이 있어야할 자리에 일반 JSX 혹은 문자열이 아닌 함수를 전달한 것입니다.

### Provider

Provider를 사용하면 Context의 value를 변경할 수 있습니다.

```js
// App.js
import React from "react";
import ColorContext from "./color";
import ColoerBox from "./ColorBox";

const App = () => {
  return (
    <ColorContext.Provider value={{ color: "red" }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
};

export default App;
```

기존에
