import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import { Outlet } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
