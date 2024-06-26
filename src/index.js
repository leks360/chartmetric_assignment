import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NavBar } from "./layout/NavBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavBar />
  </React.StrictMode>
);
