import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postChangePassword } from "../../service/apiservice";

export const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const account = useSelector((state) => state?.account);
  const handleChangePassword = async () => {
    if (newPassword === confirmPassword) {
      const res = await postChangePassword(currentPassword, newPassword);
      if (res.EC === 0) {
        toast.success(res.EM);
      } else {
        toast.error(res.EM);
      }
    } else {
      alert("newpassword and confirm password is diff");
    }
  };
  return (
    <div>
      <div class="row g-3">
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current Password"
          />
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div class="col-6">
          <input
            type="text"
            class="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        className="px-4 py-2 bg-yellow-500 text-white mt-4"
        onClick={() => handleChangePassword()}>
        Update
      </button>
    </div>
  );
};
