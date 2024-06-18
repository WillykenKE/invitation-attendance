import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CreatePost from "./CreatePost";
import Posts from "./Posts";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="invitation-attendance/" element={<App />}></Route>
        <Route path="invitation-attendance/create" element={<CreatePost />}></Route>
        <Route path="invitation-attendance/create/posts" element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
