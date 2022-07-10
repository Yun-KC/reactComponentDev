import styled from "styled-components";
import { MovieDetialModalVO, MOVIE_DETIAL_MODAL_TYPE } from "./modal/MovieDetailModal/MovieDetailModalVO";
import useModal from "./modal/useModal";
import data from "./data.json";

const Button = styled.button`
  min-width: 100px;
  background: #000;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

function App() {
  const { setModal } = useModal();
  const test = () => {
    setModal({
      modalType: MOVIE_DETIAL_MODAL_TYPE,
      modalProps: new MovieDetialModalVO(data),
      onSubmit: () => {
        console.log("hi");
      },
    });
  };
  return (
    <>
      <Button onClick={test}>무야야야야</Button>
    </>
  );
}

export default App;
