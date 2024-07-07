import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ProposeApp } from './ProposeApp';
import { GuessApp } from './GuessApp';
import { Redirect } from './Redirect';
import { BrowserRouter } from 'react-router-dom';
import { basename } from './url';
import { Route as RouteQ} from './routing';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <RouteQ query="" element={<Redirect target={"/?p=propose"} />}/>
      <RouteQ query="guess" element={<GuessApp />}/>
      <RouteQ query="propose" element={<ProposeApp />}/>
    </BrowserRouter>,
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
