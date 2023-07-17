import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from 'react';
import router from './router';

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  );
}

export default App;
