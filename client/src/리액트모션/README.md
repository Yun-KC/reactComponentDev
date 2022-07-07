## 리액트 모션 라이브러리의 기능

- spring: 컴포넌트의 애니메이션 방식을 지시하는 함수
- presets: 미리 정의된 애니메이션 속성의 개체
- Motion: 컴포넌트에 애니메이션을 적용하는 데 사용 되는 컴포넌트
- StaggeredMotion: 애니메이션이 서로 의존하는 컴포넌트를 애니메이션 하는 데 사용되는 컴포넌트
- TransitionMotion: 컴포넌트의 마운트 및 마운트 해제를 애니메이션 하는 데 사용되는 컴포넌트

### spring() and presets

spring() 함수는 초기 스타일 값에서 대상 값으로 애니메이션하는 방법을 정의합니다.
값과 옵션의 두 가지 인수를 사용합니다.

예를 들어)

```js
spring(10, { stiffness: 130, damping: 42 });
// 130의 강성과 42의 감쇠로 값을 10으로 애니메이션합니다.
// 강성과 감쇠는 애니메이션의 동작을 정의하는 애니메이션 속성입니다.
```

presets은 애니메이션 구성으로 사용합니다.
예를 들어)

```js
spring(25, presets.wobbly);
```

### Motion 컴포넌트

모션 컴포넌트는 두개의 프롭스를 사용합니다.

1. defaultStyle
   - 스타일 객체의 초기 값을 정의합니다.
2. style
   - 주어진 지점에서 스타일 값을 정의합니다.
   - style은 spring() 함수를 사용하여 결정됩니다.
   - defaultStyle이 원래 스타일이라면, style은 컴포넌트에 애니메이션 효과를 주는 최종 스타일 입니다.

모션 컴포넌트는 렌더 프롭스 패턴을 사용하여 함수를 자식 프롭스로 갖습니다. 함수는 애니메이션이 완료될 때까지 주어진 시간에 스타일 값을 포함하는 보간된 스타일 개체를 받습니다.

```js
<<Motion
  defaultStyle={{
    scale: 0,
    translateX: -300
  }}
  style={{
    scale: spring(1),
    translateX: spring(0, presets.stiff)
  }}
>
  {interpolatesStyles => <>{/* React Component */}</>}
</Motion>
```
