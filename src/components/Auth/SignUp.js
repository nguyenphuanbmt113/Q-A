import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { postRegister } from "../../service/apiservice";
import { toast } from "react-toastify";
export const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const handleShow = () => {
    setShow(!show);
  };
  const handleRegister = async () => {
    //variable
    //call api
    const res = await postRegister(email, username, password);
    if (res.EC === 0) {
      toast.success(res.EM);
      navigate("/sign-in", {
        state: {
          email,
          password,
        },
      });
    } else {
      toast.error(res.EM);
    }
  };
  useEffect(() => {
    const keyDownHandler = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        const res = await postRegister(email, username, password);
        if (res.EC === 0) {
          toast.success(res.EM);
          navigate("/sign-in", {
            state: {
              email,
              password,
            },
          });
        } else {
          toast.error(res.EM);
        }
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [email, password, username]);
  return (
    <>
      <div className="text-xl font-thin p-4">
        <NavLink to="/">
          <BsArrowBarLeft className="inline-block"></BsArrowBarLeft> Go Home
        </NavLink>
      </div>
      <div className="flex items-center justify-center mt-5">
        <div className="p-4 shadow-lg max-w-[400px] w-[100%]">
          <div className="text-blue text-xl text-center font-medium font-serif">
            Sign Up
          </div>
          <form action="" className="mt-3">
            <div className="form-group flex flex-col">
              <label htmlFor="" className="mb-2">
                User Name
              </label>
              <input
                type="text"
                placeholder="username"
                className="w-[100%] p-2 border"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group flex flex-col my-3">
              <label htmlFor="" className="mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-[100%] p-2 border"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group flex flex-col my-3 relative">
              <label htmlFor="" className="mb-2">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                className="w-[100%] p-2 border"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-[50%] right-[10px] translate-y-1/2"
                onClick={() => handleShow()}>
                {show ? (
                  <AiOutlineEye size="20px"></AiOutlineEye>
                ) : (
                  <AiOutlineEyeInvisible size="20px"></AiOutlineEyeInvisible>
                )}
              </div>
            </div>
          </form>
          <div>
            <button
              className="px-3 py-2 bg-blue-500 text-white w-[100%]"
              onClick={() => handleRegister()}>
              Sign Up
            </button>
          </div>
          <div className="text-center mt-3">
            Already a user?, <Link to="/sign-in">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};
