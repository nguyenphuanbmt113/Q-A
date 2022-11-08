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
  const [loading, setLoading] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const handleSubmitLogin = async () => {
    setLoading(true);
    const data = await loginUser(email, password);
    if (data?.EC === 0) {
      toast.success(data.EM);
      setLoading(false);
      dispath(getUser(data?.DT));
      navigate("/");
    }
    if (data?.EC !== 0) {
      setLoading(false);
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
  useEffect(() => {
    return () => {
      window.confirm("abs");
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
              {!loading ? (
                <div>Sign In</div>
              ) : (
                <div role="status" className="flex items-center justify-center">
                  <svg
                    aria-hidden="true"
                    class="mr-2 w-6 h-6 text-gray-500 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              )}
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
