import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { postRegister } from "../../service/apiservice";
export const SignUp = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const schema = yup
    .object({
      email: yup.string().required("No email provided."),
      password: yup.string().required("No password provided."),
      username: yup.string().required("No password provided."),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleShow = () => {
    setShow(!show);
  };
  const onSubmit = async (form) => {
    const res = await postRegister(form.email, form.username, form.password);
    if (res.EC === 0) {
      toast.success(res.EM);
      navigate("/sign-in", {
        state: {
          email: form.email,
          password: form.password,
        },
      });
    } else {
      toast.error(res.EM);
    }
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
                {...register("username")}
              />
            </div>
            <p className="text-red-500 text-md">{errors?.username?.message}</p>
            <div className="form-group flex flex-col my-3">
              <label htmlFor="" className="mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-[100%] p-2 border"
                {...register("email")}
              />
            </div>
            <p className="text-red-500 text-md">{errors?.email?.message}</p>
            <div className="form-group flex flex-col my-3 relative">
              <label htmlFor="" className="mb-2">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                placeholder="password"
                className="w-[100%] p-2 border"
                {...register("password")}
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
            <p className="text-red-500 text-md">{errors?.password?.message}</p>
          </form>
          <div>
            <button
              className="px-3 py-2 bg-blue-500 text-white w-[100%]"
              onClick={handleSubmit(onSubmit)}>
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
