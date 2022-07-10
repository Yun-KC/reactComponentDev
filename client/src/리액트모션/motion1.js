import { Motion, spring, presets } from 'react-motion';

export default function Motion1() {
  /*
    초기 dafaultStyle에 정의된 스타일대로 렌더링 된 후에
    style 안의 값으로 변화한다.
    spring()함수로 애니메이션 방식을 정의한다.

    컴포넌트가 DOM에 마운트되는 즉시 애니메이션이 시작된다.
  */
  return (
    <Motion
      defaultStyle={{
        opacity: 0,
        translateY: 100,
      }}
      style={{
        opacity: spring(1),
        translateY: spring(0, presets.wobbly),
      }}
    >
      {(interpolatedStyles) => {
        return (
          <div
            style={{
              transform: `translateY(${interpolatedStyles.translateY}px)`,
              opacity: interpolatedStyles.opacity,
            }}
          >
            <h1>Basic Animation Example</h1>
          </div>
        );
      }}
    </Motion>
  );
}
