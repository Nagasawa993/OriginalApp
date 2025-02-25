import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Top from './Top/Top.jsx';

function App() {
  return (
      <Route path="/" element={<Top />} />
  );
}

export default App;