import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import _ from "lodash";
import { toast } from "react-toastify";
import { putUpdateQuizWithId } from "../../../service/apiservice";
const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];
const ModalUpdateQuiz = (props) => {
  const { show, handleClose, dataUpdateQuiz, fetchQuiz } = props;
  const [name, setName] = useState("");
  const [previewImg, setPrevImg] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("");
  const handleChangeFile = (e) => {
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
                  value=""
                  onChange={setType}
                  options={options}
                  placeholder="Quiz Style"
                  selected
                />
              </div>
              <div className="col-6 mt-5">
                <label
                  className="form-label px-2 py-2 bg-green-500 text-white"
                  htmlFor="uploadfile">
                  <div>Upload File</div>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="uploadfile"
                  onChange={(e) => handleChangeFile(e)}
                  hidden
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
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateQuiz()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
