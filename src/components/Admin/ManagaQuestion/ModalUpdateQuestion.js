import _ from "lodash";
import React, { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GrDocumentUpload } from "react-icons/gr";
import { toast } from "react-toastify";
import { putUpdateQuestion } from "../../../service/apiservice";
const ModalupdateQ = (props) => {
  const { show, handleClose, data, fetchQuestion } = props;
  const [description, setDescription] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  useEffect(() => {
    if (!_.isEmpty(data)) {
      setDescription(data?.description);
      setPreviewImg(`data:image/jpeg;base64,${data.image}`);
      setImage("");
    }
  }, [data]);
  const handleUpload = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setImage("");
    }
  };
  const handleSaveChange = async () => {
    const res = await putUpdateQuestion(
      data.id,
      data.quiz_id,
      description,
      image
    );
    if (res?.EC === 0) {
      toast.success(res.EM);
      await fetchQuestion();
      handleClose();
    }
    if (res?.EC !== 0) {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-2xl font-serif font-medium mb-3">
              Update Question
            </div>
            <div className="qa-main mb-2">
              <div className="q-content">
                <div className="text-lg text-blue-500 underline">
                  Update Question
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="row">
                      <div className="col-10">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                      <div className="col-2 mt-4">
                        <label
                          className="form-label text-black"
                          htmlFor={"upload"}>
                          <div>
                            <GrDocumentUpload size="25px"></GrDocumentUpload>
                          </div>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id={"upload"}
                          onChange={(e) => handleUpload(e)}
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-2 p-2">
                  <img
                    alt=""
                    className="img-cover rounded-full w-[60%]"
                    src={previewImg}
                    onClick={() => setShowImage(true)}
                  />
                </div>
              </div>
              <hr className="border-2 bg-black w-[700px] my-4"></hr>
            </div>
            {showImage ? (
              <Lightbox
                image={previewImg}
                onClose={() => setShowImage(false)}></Lightbox>
            ) : (
              ""
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSaveChange()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalupdateQ;
