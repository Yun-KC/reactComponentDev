import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "./modalRecoil";
import { MovieDetailModal } from "./MovieDetailModal/MovieDetailModal";
import { MovieDetialModalVO, MOVIE_DETIAL_MODAL_TYPE } from "./MovieDetailModal/MovieDetailModalVO";

const MODAL_COMPONENTS = {
  [MOVIE_DETIAL_MODAL_TYPE]: MovieDetailModal,
};
const MODAL_VALUEOBJECT = {
  [MOVIE_DETIAL_MODAL_TYPE]: MovieDetialModalVO,
};

const GlobalModal = () => {
  const { modalType, modalProps, onSubmit } = useRecoilState(modalState)[0] || {};
  const renderComponent = () => {
    if (!modalType || !(modalProps instanceof MODAL_VALUEOBJECT[modalType])) {
      return null;
    }
    const ModalComponent = MODAL_COMPONENTS[modalType];
    return <ModalComponent data={modalProps.data} onSubmit={onSubmit} />;
  };

  return <>{renderComponent()}</>;
};

export default GlobalModal;
