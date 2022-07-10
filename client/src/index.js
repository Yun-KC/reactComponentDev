import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import App from "./App";
import GlobalStyle from "./GlobalStyle";

import { RecoilRoot } from "recoil";
import GlobalModal from "./modal/GlobalModal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RecoilRoot>
      <App />
      <GlobalModal />
    </RecoilRoot>
  </>
);
