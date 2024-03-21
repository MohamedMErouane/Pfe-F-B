"use client"

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainApp from '../../components/App'; 


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainApp /> 
    </BrowserRouter>
  );
};

export default App;

