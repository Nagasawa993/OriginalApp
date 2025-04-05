import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Appコンポーネントを読み込む
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/OriginalApp">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
