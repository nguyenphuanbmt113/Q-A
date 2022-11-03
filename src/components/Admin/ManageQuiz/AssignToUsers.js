import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getAllQuizForAdmin,
  getAllUser,
  postAssignToUser,
} from "../../../service/apiservice";
import { CgAssign } from "react-icons/cg";
import Select from "react-select";
import { toast } from "react-toastify";
export const AssignToUsers = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [selectQuiz, setSelectQuiz] = useState({});
  const [listUser, setListUser] = useState([]);
  const [selectUser, setSelectUser] = useState({});
  useEffect(() => {
    fetchQuiz();
    fetchUser();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          label: `${item.id}-${item.name}`,
          value: item.id,
        };
      });
      setListQuiz(newQuiz);
    }
  };
  const fetchUser = async () => {
    let res = await getAllUser();
    if (res && res.EC === 0) {
      let newUser = res.DT.map((item) => {
        return {
          label: `${item.id}-${item.username}`,
          value: item.id,
        };
      });
      setListUser(newUser);
    }
  };
  const handleAssigntoUser = async () => {
    const data = await postAssignToUser(selectQuiz.value, selectUser.value);
    if (data?.EC === 0) {
      toast.success(data.EM);
      setSelectQuiz({});
      setSelectUser({});
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <div className="row">
        <div className="add-new-question col-3 mb-3">
          <label className="form-label mb-2">Select Quiz</label>
          <Select
            defaultValue={selectQuiz}
            value={selectQuiz}
            onChange={setSelectQuiz}
            options={listQuiz}
            placeholder="Select Quiz"
          />
        </div>
        <div className="add-new-question col-3 mb-3">
          <label className="form-label mb-2">Select User</label>
          <Select
            defaultValue={selectUser}
            value={selectUser}
            onChange={setSelectUser}
            options={listUser}
            placeholder="Select USeer"
            selected
          />
        </div>
      </div>
      <button
        className="flex gap-2 px-3 py-2 bg-blue-500 text-white rounded-md items-center"
        onClick={() => handleAssigntoUser()}>
        <CgAssign size="25px"></CgAssign>
        <div>Assign</div>
      </button>
    </>
  );
};
