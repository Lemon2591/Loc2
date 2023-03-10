import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/css/base.css";
import "../src/assets/css/index.css";
import "../src/assets/css/responsive.css";
import "../src/assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

//Javascript

// 2xx thành công
// 4xxx lỗi ( client )
// 5xx lỗi ( server)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
