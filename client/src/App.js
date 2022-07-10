import styled from "styled-components";
import { useState, useContext } from "react";
import data from "./data.json";
import { ModalContextProvider, ModalContext } from "./modal/ModalContext";
const Button = styled.button`
  min-width: 100px;
  background: #000;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

function App() {
  const { openModal } = useContext(ModalContext);
  return (
    <>
      <div>{"반짝 반짝작은 별"}</div>
      <button
        onClick={() => {
          openModal(data);
        }}
      ></button>
    </>
  );
}

export default App;
