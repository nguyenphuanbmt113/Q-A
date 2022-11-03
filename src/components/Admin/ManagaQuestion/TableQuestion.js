import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteQuestion, getAllQA } from "../../../service/apiservice";
import ModalupdateQ from "./ModalUpdateQuestion";
import Lightbox from "react-awesome-lightbox";
export const QuestionTable = () => {
  const [listQuestion, setListQuestion] = useState([]);
  const [previewImg, setPreviewImg] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [dataUpdate, setDataUpdate] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    fetchQuestion();
  }, []);
  const fetchQuestion = async () => {
    let res = await getAllQA();
    if (res && res.EC === 0) {
      setListQuestion(res.DT);
    }
  };
  const handleDeleteQuestion = async (questionId, quizId) => {
    const data = await deleteQuestion(questionId, quizId);
    if (data?.EC === 0) {
      toast.success(data.EM);
      await fetchQuestion();
    }
    if (data?.EC !== 0) {
      toast.error(data.EM);
    }
  };
  const handleUpdateQuestion = (item) => {
    setShow(true);
    setDataUpdate(item);
  };
  const handleClose = () => {
    setShow(false);
  };
  const change64bit = (url) => {
    return `data:image/jpeg;base64,${url}`;
  };
  const handleShowImage = (url) => {
    setPreviewImg(url);
    setShowImage(true)
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Quiz_id</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuestion &&
            listQuestion.length > 0 &&
            listQuestion.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>{item.quiz_id}</td>
                  <td>{item.description}</td>
                  {item.image ? (
                    <td>
                      <img
                        src={change64bit(item.image)}
                        alt=""
                        className="w-9 h-9 rounded-full"
                        onClick={() => handleShowImage(change64bit(item.image))}
                      />
                    </td>
                  ) : (
                    <td></td>
                  )}

                  <td className="flex gap-2">
                    <button
                      className=" bg-yellow-500 text-white  p-2 rounded-md"
                      onClick={() => handleUpdateQuestion(item)}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded-md"
                      onClick={() =>
                        handleDeleteQuestion(item.id, item.quiz_id)
                      }>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showImage && <Lightbox image={previewImg} onClose={()=>setShowImage(false)}></Lightbox>}
      <ModalupdateQ
        show={show}
        handleClose={handleClose}
        data={dataUpdate}
        fetchQuestion={fetchQuestion}></ModalupdateQ>
    </>
  );
};
