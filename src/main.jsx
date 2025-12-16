import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from "./context/authContext.jsx";
import Login from "./pages/Login.jsx";
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
import "./index.css";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/tareas"
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </BrowserRouter>
);