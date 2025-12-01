import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";


function App() {


  return (
    <div className="bg-gray-900 dark">
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />} >
          <Route path="/" element={<div>Home</div>} />
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
