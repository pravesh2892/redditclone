import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import MyProvider from "../src/Utils/MyContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <MyProvider>
    <App />
    </MyProvider>
  </>
);

