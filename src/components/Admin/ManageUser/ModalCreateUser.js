import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postCreateUser } from "../../../service/apiservice";
const ModalCreateUser = (pros) => {
  const { show, handleClose, fetchUserWithPaginate } = pros;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [previewImg, setPrevImg] = useState("");
  const [img, setImg] = useState("");
  const [role, setRole] = useState("User");

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPrevImg(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    } else {
      setImg("");
    }
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSubmitCreateUser = async (e) => {
    //valid data
    let isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("invalid email");
      return;
    }
    if (!password) {
      toast.error("password is emptied");
      return;
    }
    //call api

    let data = await postCreateUser(email, password, username, role, img);
    if (data?.EC === 0) {
      toast.success(data.EM);
      await fetchUserWithPaginate(1);
      handleClose();
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
    setEmail("");
    setPassword("");
    setUserName("");
    setPrevImg("");
    setRole("User");
  };
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">UserName</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Role</label>
              <select
                value={role}
                className="form-select"
                onChange={(e) => setRole(e.target.value)}>
                <option selected value="User">
                  User
                </option>
                <option>Admin</option>
              </select>
            </div>
            <div className="col-6">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => handleUpload(e)}
              />
            </div>
            <label>Image Preview:</label>
            <div className="col-2 img-preview p-2">
              <img
                src={previewImg}
                alt=""
                className="img-cover"
                // value={password}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmitCreateUser(e)}>
            Save User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //sss
};

export default ModalCreateUser;
