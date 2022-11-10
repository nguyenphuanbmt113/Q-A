import _ from "lodash";
import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { toast } from "react-toastify";
import { putUpdateQuizWithId } from "../../../service/apiservice";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ModalUpdateQuiz = (props) => {
  const { show, handleClose, dataUpdateQuiz, fetchQuiz } = props;
  console.log("dataUpdateQuiz", dataUpdateQuiz);
  const [name, setName] = useState("");
  const [previewImg, setPrevImg] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  console.log("image", image);
  const [type, setType] = useState({
    value: "",
    label: "",
  });
  console.log("type", type);
  const handleUpload = (e) => {
    console.log("abs");
    if (e.target && e.target.files && e.target.files[0]) {
      setPrevImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setImage("");
    }
  };
  useEffect(() => {
    if (_.isEmpty(dataUpdateQuiz) === false) {
      setName(dataUpdateQuiz.name);
      setDescription(dataUpdateQuiz.description);
      setPrevImg(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      setType(dataUpdateQuiz.difficulty);
      setType({
        value: dataUpdateQuiz.difficulty,
        label: dataUpdateQuiz.difficulty,
      });
      setImage("");
    }
  }, [dataUpdateQuiz]);

  const handleUpdateQuiz = async () => {
    const res = await putUpdateQuizWithId(
      dataUpdateQuiz.id,
      name,
      type.value,
      image
    );
    if (res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchQuiz();
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-new">
            <div className="row g-3">
              <div className="col-6">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label mb-2">Select Types</label>
                <Select
                  defaultValue={type}
                  value={type}
                  onChange={setType}
                  options={options}
                  // placeholder="Quiz Style"
                />
              </div>
              <div className="col-6 mt-5">
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => handleUpload(e)}
                  // hidden
                />
              </div>
              <label>Image Preview:</label>
              <div className="col-2 img-preview p-2">
                <img src={previewImg} alt="" className="img-cover" />
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={(e) => handleUpdateQuiz(e)}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
