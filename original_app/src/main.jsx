import React from "react";
import  ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";  // Appコンポーネントを読み込む

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/react-app">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
