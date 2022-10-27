import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
export const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
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
          <button className="px-3 py-2 bg-blue-500 text-white w-[100%]">
            Sign Up
          </button>
        </div>
        <div className="text-center mt-3">
          Already a user?, <Link to="/sign-in">Sign In</Link>
        </div>
      </div>
    </div>
  );
};
