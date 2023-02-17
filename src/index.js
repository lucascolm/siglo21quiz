import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import './App.css'
import Landing from './Landing';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const usuarios=[];
console.log(usuarios)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Landing usuarios={usuarios}/>}/>
    <Route path='/game' element={<App usuarios={usuarios}/>}/>
  </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
