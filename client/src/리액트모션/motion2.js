import { Motion, spring, presets } from 'react-motion';
import { useState } from 'react';

export default function Motion2() {
  /*
  버튼으로 애니메이션 트리거하는 방법
  컴포넌트에서는 style prop이 동적으로 변경되기 때문에 defaultStyle prop을 지정할 필요가 없습니다.
  */
  const [startAnimation, setAnimation] = useState(false);
  const initialStyle = { opacity: 0, translateY: 30 };

  return (
    <div>
      <button onClick={() => setAnimation(true)}> Trigger Animation </button>
      <button onClick={() => setAnimation(false)}> Reset Animation </button>
      <Motion
        style={
          startAnimation
            ? {
                opacity: spring(1),
                translateY: spring(0, presets.wobbly),
              }
            : initialStyle
        }
      >
        {(interpolatedStyles) => {
          return (
            <div
              style={{
                transform: `translateY(${interpolatedStyles.translateY}px)`,
                opacity: interpolatedStyles.opacity,
              }}
            >
              <h1>Triggered Animation</h1>
            </div>
          );
        }}
      </Motion>

      <div> {startAnimation ? '온' : '오프'}</div>
    </div>
  );
}
