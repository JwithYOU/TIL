# useEffect & Context API

> ## 1. 의존성 배열이란?

의존성 배열을 간단하게 이해하자면 아래와 같습니다.

- useEffect의 두 번째 인자로 넘기는 배열이다.
- 두 번째 인자를 넘기지 않으면 Effect가 매번 실행이되고, 빈 배열을 넘기면 첫 번째 이후에만 실행이 된다.

useEffect에 대해서 이 두 가지 사항만 인지하고 있었다면 애플리케이션에서 버그가 발생할 확률이 높습니다.

useEffect의 시그니처는 아래와 같습니다.

> useEffect(effect, 의존성)

여기서 effect는 함수의 형태로 표현되고 의존성은 여러 의존성 배열들을 한번에 전달하기 위해서 배열의 형태로 표현됩니다.

의존성이란 단어를 쉽게 이해하기 위해서 예시를 들자면

- A라는 요소가 온전히 동작하기 위해서 B, C, D 등 다른 요소들이 필요할 때 A는 B, C, D에 의존하고 있다고 합니다.
- B, C, D는 A의 의존성이다 라고도 할 수 있습니다.

그렇다면 useEffect에서 의존성 배열이란 "무언가가 의존하고 있는 요소들의 모음" 이라고 할 수 있습니다. 그리고 여기서 말하는 무언가는 effect 함수입니다. 즉 useEffect의 의존성 배열은 **"effect 함수가 의존하고 있는 요소들의 모음"** 이라고 할 수 있습니다.

```js
const Component = () => {
  const [count, setCount] = useState(0);

  const effect = () => {
    document.titile = `you clicked ${count} times`;
  };

  useEffect(effect, [count]);
};
```

위의 예시에서 effect 함수는 `count` 라는 외부의 값을 내부에서 사용하고 있습니다. 따라서 effect 함수의 의존성은 `count` 이기 때문에 count를 의존성 배열에 넣어줘야 합니다.

이런식으로 작성된 useEffect는 리렌더링이 된 후 의존성 배열을 검사해서 의존성 배열의 값이 변경 되었을 경우 , 다시 새로운 의존성을 가지고 effect 함수를 실행합니다.

---

> ## 2. 의존성 배열의 잘못된 활용

useEffect에서 의존성 배열을 잘못 설정해서 사용하는 경우가 있습니다.
잘못된 케이스로 필요없는 의존성을 의존성 배열에 넣는 경우보다 필요한 의존성을 넣지 못하는 경우가 있습니다.

```js
const Component = () => {
  const [count, setCount] =  useState(0);

  useEffect(()=>{
		document.title = `you clikced ${count} times`
	}, []};
```

위 예시에서는 count라는 값을 의존하고 있음에도 불구하고 의존성 배열은 빈 배열이어서 count의 값이 변행도 useEffect는 작동하지 않습니다.

---

> ## 3. 의존성 배열을 잘 성정하는 방법

useEffect를 사용할 때 버그가 발생하지 않도록 의존성 배열을 설정하는 방법은 아래 사항을 준수하면 됩니다.

- **"모든 의존성을 빼먹지 말고 의존성 배열에 명시해라"**
- **"가능하다면 의존성을 적게 만들어라"**

의존성을 적게 만드는 예시

```js
// before
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [count, setCount]);

  return (
    <div>
      <h1>count: {count}</h1>
    </div>
  );
};
```

```js
// after
const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalID);
  }, [setCount]);

  return (
    <div>
      <h1>count: {count}</h1>
    </div>
  );
};
```

간단한 일반 변수, state, props 경우에는 의존성 배열에 명시하기 쉽지만 함수 컴포넌트 내부에서 선언한 Object, Function의 경우에는 참조형 데이터 타입의 특징 때문에 객체 내부의 요소가 동일하더라도 이전 객체와 새롭게 생성된 객체를 다른 객체라 판단하게 됩니다.

그래서 아래 예시 코드와 같이 무한루프에 빠지게 됩니다.

```js
const Component = () => {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  useEffect(increaseCount, [increaseCount]);
};
```

이런 무한루프에 빠지게 되는 문제를 해결하기 위한 여러 방법들이 있습니다.

1. 의존성을 제거하기 -> 함수를 effect 안에 선언하기

```js
const Component = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const increaseCount = () => {
      setCount((prev) => prev + 1);
    };

    increaseCount();
  }, []);
};
```

2. 함수를 컴포넌트 바깥으로 이동시키기

```js
// before
const Componet = () => {
  const getUserAuth = () => {
    localStorage.getItem("ACCESS_TOKEN");
  };

  useEffect(() => {
    const token = getUserAuth();
    // Login...
  }, []);
};
```

```js
// after
const Component = () => {
  useEffect(() => {
    const token = getUserAuth();
    // Login...
  }, [getUserAuth]);
};

const getUserAuth = () => {
  localStorage.getItem("ACCESS_TOKEN");
};
```

---

> ## 4. Context API

Context API 또한 React에서 제공하는 hook 중에 하나입니다.
일반적으로 리액트에서 데이터를 전달하는 방법은 단방향성입니다. 쉽게 말하자면 부모 컴포넌트에서 자식 컴포넌트 방향으로만 데이터를 전달한다는 의미입니다.

단방향성은 애플리케이션의 안전성을 높이고 흐름을 단순화 하는데 유용하다는 장점이 있지만 때로는 너무 많은 단계를 거쳐서 자식 컴포넌트에게 전달해야한다는 점도 있습니다.

만약 A -> B -> C -> D 이런 흐름의 부모, 자식 컴포넌트가 있다고 하면 A라는 부모 컴포넌트에서 D라는 자식 컴포넌트에게 데이터를 전달하기 위해서는 B, C를 거쳐야 합니다. B,C 컴포넌트가 데이터를 필요로 하지 않아도 props를 계속 전달해 줘야하며 또한 형제 관계이거나 특정 범위안에 있는 컴포넌트를 전달하려면 더 복잡한 상황이 발생하기도 합니다.

컴포넌트 구조의 설계를 잘하고 합성을 적극적으로 사용해서 데이터를 계속 넘겨주는 상황을 안 만드는 것이 1순위이지만 해당 방법으로는 해결 할 수 없을 때는 Context API를 활용할 수 있씁니다.

### 사용법

#### 1.`createContext`

Context API를 사용하기 위해서는 `createContext` 라는 함수를 사용해서 공유할 Context를 만들어 줍니다.

```js
const userContext = createContext(null);
```

- createContext 함수를 호출하면 Context 객체가 리턴됩니다.
- 함수를 호출할 때는 defaultValue를 인자로 전달할 수 있습니다.
  이 때 defaultValue는 Context Value의 초기값이 아닌, 다른 컴포넌트에서 Context에 접근하려고 하지만 Provider로 감싸져 있지 않은 상황에서 사용될 값을 의미합니다.

#### 2.`Provider`

만들어진 Context를 통해서 특정한 값을 전달하기 위해서는 Provider 컴포넌트를 이용해야 합니다. Context 객체에는 Provider라는 프로퍼티가 있으면 이는 리액트 컴포넌트 입니다.

Provider 컴포넌트는 value라는 props를 가지고 있으면, value에 할당된 값을 Provider 컴포넌트 하위에 있는 어떤 컴포넌트든 접근할 수 있게 해주는 기능을 가지고 있습니다.

```js
const UserContext = createContent(null);

const user = { name: "J" };

<UserContext.Provider value={user}>
  <Child />
</UserContext.Provider>;
```

#### 3.`useContext`

Class 컴포넌트에서 Context를 통해 공유된 값을 접근하려면, Consumer라는 다소 복잡한 방식을 사용해야합니다. 하지만 함수 컴포넌트에서는 useContext라는 내장 hook을 이용해 Context Value에 접근할 수 있습니다.

```js
const UserContext = createContent(null);

const user = { name: "J" };

<UserContext.Provider value={user}>
  <Child />
</UserContext.Provider>;

const Child = () => {
  const user = useContext(UserContext);

  return <h1>{user.name}</h1>;
};
```
