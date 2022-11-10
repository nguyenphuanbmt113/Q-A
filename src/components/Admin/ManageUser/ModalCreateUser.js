import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import Lightbox from "react-awesome-lightbox";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { postCreateUser } from "../../../service/apiservice";
import useFilePreview from "../../../customHook/useImagePreview";
import { useEffect } from "react";
const ModalCreateUser = (pros) => {
  const { show, handleClose, fetchUserWithPaginate } = pros;
  const [showImage, setShowImage] = useState(false);
  const schema = yup
    .object({
      email: yup.string().required("No email provided."),
      password: yup.string().required("No password provided."),
      username: yup.string().required("No username provided."),
      role: yup.string().required("No role provided."),
      file: yup.mixed().required("A file is required"),
    })
    .required();
  const { register, reset, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      role: "User",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { errors, isSubmitting, isValid } = formState;
  const file = watch("file");
  const [imgPreview] = useFilePreview(file);
  const onSubmit = async (form) => {
    let data = await postCreateUser(
      form.email,
      form.password,
      form.username,
      form.role,
      form.file[0]
    );
    if (data?.EC === 0) {
      toast.success(data.EM);
      await fetchUserWithPaginate(1);
      handleClose();
      reset({
        email: "",
        password: "",
        username: "",
        role: "",
        file: "",
      });
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
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
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user">
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                {...register("email")}
              />
              <p className="text-red-500 text-md">{errors?.email?.message}</p>
            </div>
            <div className="col-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                {...register("password")}
              />
              <p className="text-red-500 text-md">
                {errors?.password?.message}
              </p>
            </div>
            <div className="col-6">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                {...register("username")}
              />
              <p className="text-red-500 text-md">
                {errors?.username?.message}
              </p>
            </div>
            <div className="col-6">
              <label className="form-label">Role</label>
              <select className="form-select" {...register("role")}>
                <option selected value="User">
                  User
                </option>
                <option>Admin</option>
                <p className="text-red-500 text-md">{errors?.role?.message}</p>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                {...register("file")}
              />
              <p className="text-red-500 text-md">{errors?.file?.message}</p>
            </div>
            <label>Image Preview:</label>
            <div className="col-2 img-preview p-2">
              {imgPreview && (
                <img
                  src={imgPreview}
                  alt=""
                  className="img-cover"
                  onClick={() => setShowImage(true)}
                />
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Save User
          </Button>
        </Modal.Footer>
        {isSubmitting && <div className="loading"></div>}
      </Modal>
      {showImage && (
        <Lightbox
          image={imgPreview}
          onClose={() => setShowImage(false)}></Lightbox>
      )}
    </>
  );
  //sss
};

export default ModalCreateUser;
