import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin/Admin";
import { ManageUser } from "./components/Admin/ManageUser/ManageUser";
import { ManageQuiz } from "./components/Admin/ManageQuiz/ManageQuiz";
import { ManageQuestion } from "./components/Admin/ManagaQuestion/ManageQuestion";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar></NavBar>}>
          <Route path="/home" element={<Home></Home>}></Route>
        </Route>
        <Route path="/admin" element={<Admin></Admin>}>
          <Route
            path="manage-users"
            element={<ManageUser></ManageUser>}></Route>
          <Route path="manage-quiz" element={<ManageQuiz></ManageQuiz>}></Route>
          <Route
            path="manage-question"
            element={<ManageQuestion></ManageQuestion>}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
