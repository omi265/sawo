import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home.js";
import Login from "./Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(JSON.parse(window.localStorage.getItem("isLoggedIn")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  function handleChange() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
  }
  console.log("Hello " + isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onChange={handleChange} />} />
        <Route
          path="/home"
          element={<Home isLoggedIn={isLoggedIn} onChange={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
