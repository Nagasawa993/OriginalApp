import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {AppRoutes} from './Routes.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)