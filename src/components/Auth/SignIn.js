import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { getUser } from "../../redux/slice/userSlice";
import { loginUser } from "../../service/apiservice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { BsArrowBarLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmitLogin = async () => {
    const data = await loginUser(email, password);
    if (data?.EC === 0) {
      toast.success(data.EM);
      dispath(getUser(data?.DT));
      navigate("/");
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
  };
  useEffect(() => {
    if (location) {
      setEmail(location?.state?.email);
      setPassword(location?.state?.password);
    }
  }, [location]);

  useEffect(() => {
    const keyDownHandler = async (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        await handleSubmitLogin();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);
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
            Log In
          </div>
          <form action="" className="mt-3">
            <div className="form-group flex flex-col">
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
              className="px-3 py-2 bg-red-500 text-white w-[100%]"
              onClick={() => handleSubmitLogin()}>
              Log In
            </button>
          </div>
          <div className="text-center mt-3">
            Or, <Link to="/sign-up">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};
