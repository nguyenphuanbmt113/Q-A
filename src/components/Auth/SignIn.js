import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { getUser } from "../../redux/slice/userSlice";
import { loginUser } from "../../service/apiservice";
export const SignIn = (props) => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const schema = yup
    .object({
      email: yup.string().required("No email provided."),
      password: yup.string().required("No password provided."),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (form) => {
    const data = await loginUser(form.email, form.password);
    if (data?.EC === 0) {
      toast.success(data.EM);
      dispath(getUser(data?.DT));
      navigate("/");
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
  };

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    const keypress = async (e) => {
      if (e.key === "Enter") {
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener("keypress", keypress);
    return () => {
      window.removeEventListener("keypress", keypress);
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
                {...register("email")}
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
              <p className="text-red-500 text-md">{errors?.email?.message}</p>
            </div>
            <div className="form-group flex flex-col my-3 relative">
              <label htmlFor="" className="mb-2">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                className="w-[100%] p-2 border"
                {...register("password")}
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-red-500 text-md">
                {errors?.password?.message}
              </p>
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
              onClick={handleSubmit(onSubmit)}>
              {!isSubmitting ? (
                <div>Sign In</div>
              ) : (
                <div className="flex justify-center items-center">
                  <div className="w-5 h-5 border-2 border-blue border-t-2 border-t-transparent rounded-full animate-spin"></div>
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
