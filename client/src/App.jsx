import React from "react";

import { Route, Routes } from "react-router-dom";

import {
  HomePage,
  ARB,
  FR,
  Navbar,
  Footer,
  Login,
  Basic,
  Register,
  ForgetPassword,
  ChangePassword,
  MyAcount,
} from "./components";
import { DOC } from "./components/Document";
import "./index.css";
const App = () => {
  return (
    <div className="App w-full min-h-screen font-mono">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/ARB" element={<ARB />} />
        <Route exact path="/FairPrice" element={<FR />} />
        <Route exact path="/DOC" element={<DOC />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/Basic" element={<Basic />} />
        <Route exact path="/ForgetPassword" element={<ForgetPassword />} />
        <Route exact path="/myacount" element={<MyAcount />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
