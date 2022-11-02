import React from "react";
import { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import { postCreateNewQuiz } from "../../../service/apiservice";
export const AddNewQuiz = () => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("EASY");
  const [previewImg, setPrevImg] = useState("");
  const handleChangeFile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPrevImg(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    } else {
      setImage("");
    }
  };
  const handleSubmit = async () => {
    //validate
    if (!name || !description) {
      toast.error("name/description is required");
    }
    const res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setImage(null);
      setDescription("");
      setPrevImg("");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
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
              onClick={(e) => handleSubmit(e)}>
              Create Quiz
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
