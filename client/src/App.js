// App.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Signup from "./Pages/Signup";

const App = () => {
  return (
    <>
    
      <Routes >
        {/* Route for LoginPage */}
        <Route path="/" element={<LoginPage />} />
        {/* Route for HomePage */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    
    </>
  );
};

export default App;
