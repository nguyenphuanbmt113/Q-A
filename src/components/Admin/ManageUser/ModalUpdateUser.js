import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import _ from "lodash";
import { putUpdateUser } from "../../../service/apiservice";
const ModalUpdateUser = (pros) => {
  const {
    showModalUpdate,
    handleCloseUpdate,
    dataUpdate,
    page,
    fetchUserWithPaginate,
  } = pros;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [previewImg, setPrevImg] = useState("");
  const [img, setImg] = useState("");
  const [role, setRole] = useState("User");
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      //updte state
      setEmail(dataUpdate.email);
      setUserName(dataUpdate.username);
      setRole(dataUpdate.role);
      setPrevImg(`data:image/jpeg;base64,${dataUpdate.image}`);
      setImg("");
    }
  }, [dataUpdate]);

  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPrevImg(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    } else {
      setImg("");
    }
  };
  const handleSubmitCreateUser = async (e) => {
    //valie date
    //call api
    let data = await putUpdateUser(dataUpdate.id, username, role, img);
    if (data?.EC === 0) {
      toast.success(data.EM);
      await fetchUserWithPaginate(page);
      handleCloseUpdate();
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
    setEmail("");
    setPassword("");
    setUserName("");
    setPrevImg("");
    setRole("User");
    handleCloseUpdate();
  };
  return (
    <>
      <Modal
        show={showModalUpdate}
        onHide={handleCloseUpdate}
        size="xl"
        backdrop="static"
        className="modal-add-user">
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                disabled
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
          <Button variant="secondary" onClick={handleCloseUpdate}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleSubmitCreateUser(e)}>
            Update User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
