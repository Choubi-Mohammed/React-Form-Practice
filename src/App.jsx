import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/rogister" element={<SignUp />}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
