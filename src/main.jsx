import React from "react";
import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./index.css";

import App from "./App";
import Admin from "./Admin";
import Login from "./Login";

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        {/* Main Website */}
        <Route
          path="/"
          element={<App />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Admin Page */}
        <Route
          path="/admin"
          element={<Admin />}
        />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
);