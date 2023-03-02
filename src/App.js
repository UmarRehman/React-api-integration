import React from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Sign from "./components/Sign";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
