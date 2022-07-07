// 컴포넌트 안에 이미지 태그가 있다.
// 이미지는 외부에서 받아오기 때문에
// 컴포넌트 자체는 렌더링이 끝났어도 이미지가 로딩상태일 수도 있다.
// 그럼 이미지가 도착하는 동시에 컴포넌트를 렌더링할 수 있을까?

import { useEffect, useState } from 'react';
export default function Test() {
  const [isLoding, setIsLoding] = useState(false);
  const [imgsrc, setImgsrc] = useState(null);
  useEffect(() => {
    const img = new Image();
    setTimeout(() => {
      img.src = 'https://source.unsplash.com/random/700x1080';
    }, 3000);

    img.onload = () => {
      console.log('이미지.src 에 url을 넣으면 자동으로 온로드 이벤트가 발생되는구나?');
      onLoadHandler(img.src);
    };
  }, []);
  const onLoadHandler = (img) => {
    setImgsrc(img);
    setIsLoding(true);
  };
  return (
    <>
      {isLoding ? (
        <>
          <div style={{ backgroundColor: 'blue', width: '300px', height: '300px' }}>컴포넌트와 같이 업로드될까?</div>
          <img src={imgsrc} />
        </>
      ) : null}
    </>
  );
}
