import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./img/logo.svg";
import "./css/App.css";
import Landingpage from "./views/Landingpage";
import LoginForm from "./views/LoginForm";

function App() {
  const [isAuth, setIsAuth] = React.useState(null);

  React.useEffect(() => {
    fetch("/auth/isAuth")
      .then((res) => res.json())
      .then((data) => {
        setIsAuth(data.isAuth);
      });
  }, [isAuth]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href="/admin">Admin Panel</a>
        {isAuth && <p>Logged in as Admin</p>}
      </header>
      <main className="App-body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="loginForm" element={<LoginForm />} />
            <Route
              path="/admin"
              element={
                isAuth === false ? (
                  <Navigate to="/loginForm" />
                ) : (
                  <Landingpage />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
