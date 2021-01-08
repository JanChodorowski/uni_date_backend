import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./index/App";
import "./index/index.css";
import reportWebVitals from "./index/reportWebVitals";
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
