import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./img/logo.svg";
import "./css/App.css";
import Landingpage from "./views/Landingpage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
