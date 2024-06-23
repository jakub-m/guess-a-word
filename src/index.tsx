import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ProposeApp } from './ProposeApp';
import { GuessApp } from './GuessApp';
import { Redirect } from './Redirect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const basename = process.env.REACT_APP_PAGE_ROOT || '/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Redirect target={"/propose"} />} />
        <Route path="/propose" element={<ProposeApp />} />
        <Route path="/guess" element={<GuessApp />} />
      </Routes>
    </BrowserRouter>,
  </React.StrictMode>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
