// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import React from 'react';
// import {BrowserRouter} from 'react-router-dom'
// import {AppRoutes} from './Routes.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   </StrictMode>
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // Appコンポーネントを読み込む

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
