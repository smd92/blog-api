import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import logo from "./img/logo.svg";
import "./css/App.css";
import Landingpage from "./views/Landingpage";
import Adminpanel from "./views/Adminpanel";
import Posts from "./views/Posts";
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

  const logout = () => {
    fetch("/auth/logout")
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <a href="/">
          <img src={logo} className="App-logo" alt="logo" />
        </a>
        <a href="/admin">Admin Panel</a>
        {isAuth && (
          <a href="/" onClick={() => logout()}>
            Logout
          </a>
        )}
        {isAuth && <p>Logged in as Admin</p>}
      </header>
      <main className="App-body">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landingpage posts={<Posts />} />} />
            <Route path="loginForm" element={<LoginForm />} />
            <Route
              path="/admin"
              element={
                isAuth === false ? <Navigate to="/loginForm" /> : <Adminpanel />
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
