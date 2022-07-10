import styled from "styled-components";
import { MovieDetailModal } from "./modal/MovieDetailModal";
import { MovieDetialModalVO, MOVIE_DETIAL_MODAL_TYPE } from "./modal/MovieDetailModalVO";
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
      modalProps: new MovieDetialModalVO(data, () => {
        console.log("안뇽");
      }),
    });
  };
  return (
    <>
      <Button onClick={test}>무야야야야</Button>
    </>
  );
}

export default App;
