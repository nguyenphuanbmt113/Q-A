import React from "react";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin/Admin";
import { ManageUser } from "./components/Admin/ManageUser/ManageUser";
import { ManageQuiz } from "./components/Admin/ManageQuiz/ManageQuiz";

import { ToastContainer } from "react-toastify";
import { SignIn } from "./components/Auth/SignIn";
import { SignUp } from "./components/Auth/SignUp";
import { UserQuiz } from "./components/User/UserQuiz";
import { QuizDetail } from "./components/User/QuizDetail";
import { NotFound } from "./components/NotFound/NotFound";
import { ManageQuestion } from "./components/Admin/ManagaQuestion/ManageQuestion";
import { PrivateRouter } from "./router/PrivateRouter";
import { DashBoard } from "./components/Admin/DashBoard";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar></NavBar>}>
          <Route path="/home" element={<Home></Home>}></Route>
          <Route path="/quiz" element={<UserQuiz></UserQuiz>}></Route>
          <Route path="/quiz/:id" element={<QuizDetail></QuizDetail>}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route
          path="/admin"
          element={
            <PrivateRouter>
              <Admin></Admin>
            </PrivateRouter>
          }>
          <Route
            path="/admin"
            element={<DashBoard></DashBoard>}></Route>
          <Route
            path="manage-users"
            element={<ManageUser></ManageUser>}></Route>
          <Route path="manage-quiz" element={<ManageQuiz></ManageQuiz>}></Route>
          <Route
            path="manage-question"
            element={<ManageQuestion></ManageQuestion>}></Route>
        </Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
        theme="light"></ToastContainer>
    </>
  );
};

export default App;
