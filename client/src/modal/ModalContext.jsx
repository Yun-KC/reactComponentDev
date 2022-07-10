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
    if (!data) return; // 데이터가 없다면 모달 오픈 x
    setData({ ...data });
    setShowModal(true);
  };
  const closeModal = () => {
    setData(null);
    setShowModal(false);
  };
  console.log(openModal);
  return (
    <ModalContext.Provider value={{ openModal: openModal }}>
      {children}
      {showModal ? <MovieDetailModal showModal={showModal} setShowModal={closeModal} data={data} setLike={""} /> : null}
    </ModalContext.Provider>
  );
};

export const useAuthState = () => {
  return React.useContext(ModalContext);
};

export { ModalContextProvider, ModalContext };
