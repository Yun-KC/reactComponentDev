import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const ModalImg = styled.img`
  width: 100%;
  height: 500px;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const MovieDetailModal = ({ showModal, setShowModal, data, setLike }) => {
  const modalRef = useRef();
  const [favorite, setFavorite] = useState(data.like);

  const favoriteHandler = () => {
    // TODO: api 요청 후 성공 시 setFavorite(!favorite);
    // setLike().then(result => {}).catch(result => {});
  };

  const closeModal = (event) => {
    if (modalRef.current === event.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (event) => {
      if (event.key === "Escape" && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <ModalWrapper showModal={showModal}>
            <ModalImg src={data.cover_image} alt={data.title} />
            <ModalContent>
              <h1>{data.title}</h1>
              <p>{data.summary}</p>
              <button onClick={favoriteHandler}>{favorite ? "하트" : "빈 하트"}</button>
            </ModalContent>
            <CloseModalButton aria-label="Close modal" onClick={() => setShowModal((show) => !show)} />
          </ModalWrapper>
        </Background>
      ) : null}
    </>
  );
};
MovieDetailModal.defaultProps = {
  title: null,
  year: null,
  rating: null,
  summary: null,
  background_image: null,
  cover_image: null,
  like: false,
};

// TODO: prop-types 적용하기 https://ko.reactjs.org/docs/typechecking-with-proptypes.html
