import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react";
import "./index.css";
import { store } from "./app/store";
import axios from "axios";
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
