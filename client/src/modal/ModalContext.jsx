import React, { useState } from "react";
import { MovieDetailModal } from "./MovieDetailModal";
const defaultContext = {
  openModal: () => {},
};
const ModalContext = React.createContext(defaultContext);

const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const openModal = (data) => {
    if (!data) return; // 데이터가 없다면 모달 오픈 x, TODO: 데이터에 대한 유효성 검사해야함
    console.log("모달이 열렸음");
    setData({ ...data });
    setShowModal(true);
  };
  const closeModal = () => {
    console.log("모달이 닫혔음");
    setData(null);
    setShowModal(false);
  };
  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {showModal ? <MovieDetailModal showModal={showModal} setShowModal={closeModal} data={data} /> : null}
    </ModalContext.Provider>
  );
};

export { ModalContextProvider, ModalContext };
