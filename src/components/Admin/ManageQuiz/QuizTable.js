import React, { useEffect, useState } from "react";
import { deleteQuizWithid, getAllQuizForAdmin } from "../../../service/apiservice";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

export const QuizTable = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = (quiz) => {
    setShow(true);
    setDataUpdateQuiz(quiz);
  };
  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };
  const handleDeleteQuiz = async (id) => {
    let res = await deleteQuizWithid(id);
    await fetchQuiz();
    return res;
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuiz &&
            listQuiz.length > 0 &&
            listQuiz.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>

                  <td className="flex gap-2">
                    <button
                      className=" bg-yellow-500 text-white  p-2 rounded-md"
                      onClick={() => handleOpen(item)}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() => handleDeleteQuiz(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ModalUpdateQuiz
        show={show}
        handleClose={handleClose}
        dataUpdateQuiz={dataUpdateQuiz}
        fetchQuiz={fetchQuiz}></ModalUpdateQuiz>
    </>
  );
};
