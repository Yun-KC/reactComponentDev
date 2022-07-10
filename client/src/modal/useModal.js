import { useRecoilState } from "recoil";
import { modalState } from "./modalRecoil";

export default function useModal() {
  const [modal, setModal] = useRecoilState(modalState);

  const showModal = ({ modalType, modalProps }) => {
    setModal({ modalType, modalProps });
  };

  const hideModal = () => {
    setModal(null);
  };

  return {
    modal,
    setModal,
    showModal,
    hideModal,
  };
}
