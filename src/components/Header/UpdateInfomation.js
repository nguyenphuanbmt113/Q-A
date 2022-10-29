import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postUpdateProfile } from "../../service/apiservice";
export const UpdateInfomation = ({ handleClose }) => {
  const [email, setEmail] = useState("");
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
  const account = useSelector((state) => state?.account);
  useEffect(() => {
    if (account && !_.isEmpty(account)) {
      setRole(account.role);
      setEmail(account.email);
      setUserName(account.username);
      setPrevImg(`data:image/jpeg;base64,${account.image}`);
    }
  }, [account]);
  const handleSubmitUpdateProfile = async () => {
    const res = await postUpdateProfile(username, img);
    // dispatch(dologin());
    if (res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    }
    console.log("res:", res);
  };
  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">UserName</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Role</label>
          <select value={role} className="form-select" disabled>
            <option selected value="User">
              User
            </option>
            <option>Admin</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleUpload(e)}
          />
        </div>
        <label>Image Preview:</label>
        <div className="col-md-2 img-preview p-2">
          <img
            src={previewImg}
            alt=""
            className="img-cover"
            // value={password}
          />
        </div>
      </form>
      <button
        className="px-4 py-2 bg-yellow-500 text-white"
        onClick={() => handleSubmitUpdateProfile()}>
        Update
      </button>
    </>
  );
};
