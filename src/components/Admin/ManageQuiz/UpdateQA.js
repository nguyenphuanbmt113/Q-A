import _ from "lodash";
import React, { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsPlusCircle } from "react-icons/bs";
import { CgRemove } from "react-icons/cg";
import { GrDocumentUpload } from "react-icons/gr";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import {
  getAllQuizForAdmin, getQAByQuiz,
  postCreateQuestion,
  postNewAnswerForQuestion
} from "../../../service/apiservice";
export const UpdateQA = () => {
  const [selectQuiz, setSelectQuiz] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [dataPreview, setDataPreview] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imagePreview: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ]);
  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };
  const handleRemoveQuestion = (id) => {
    let questionClone = _.cloneDeep(questions);
    const result = questionClone.filter((item) => {
      return item.id !== id;
    });
    setQuestions(result);
  };
  const handleAddAnswer = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    const newAnswer = {
      id: uuidv4(),
      description: "",
      isCorrect: false,
    };
    const index = questionClone.findIndex((item) => {
      return item.id === questionId;
    });
    questionClone[index].answers.push(newAnswer);
    setQuestions(questionClone);
  };
  const handleRemoveAnswer = (questionId, answerId) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => {
      return item.id === questionId;
    });
    questionClone[index].answers = questionClone[index].answers.filter(
      (item) => item.id !== answerId
    );
    setQuestions(questionClone);
  };
  const handleOnChange = (type, questionId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      const index = questionClone.findIndex((item) => {
        return item.id === questionId;
      });
      if (index > -1) {
        questionClone[index].description = value;
      }
      setQuestions(questionClone);
    }
  };
  const handleOnChangeFile = (questionId, e) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => {
      return item.id === questionId;
    });
    if (index > -1) {
      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;
      questionClone[index].imagePreview = URL.createObjectURL(
        e.target.files[0]
      );
      setQuestions(questionClone);
    }
  };
  const handleAnswerQuestion = (type, answerId, questionId, value) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => {
      return item.id === questionId;
    });
    questionClone[index].answers = questionClone[index].answers.map(
      (answer) => {
        if (answer.id === answerId) {
          if (type === "CHECKBOX") {
            answer.isCorrect = value;
          }
          if (type === "INPUT") {
            answer.description = value;
          }
        }
        return answer;
      }
    );
    setQuestions(questionClone);
  };
  const handleSubmitQuestionForQuiz = async () => {
    await Promise.all(
      questions.map(async (question) => {
        const q = await postCreateQuestion(
          +selectQuiz.value,
          question.description,
          question.imageFile
        );
        await Promise.all(
          question.answers.map(async (answer) => {
            await postNewAnswerForQuestion(
              answer.description,
              answer.isCorrect,
              q.DT.id
            );
          })
        );
      })
    );
  };
  const handlePreviewImage = (questionId) => {
    let questionClone = _.cloneDeep(questions);
    const index = questionClone.findIndex((item) => {
      return item.id === questionId;
    });
    if (index > -1) {
      setDataPreview(questionClone[index].imagePreview);
      setIsPreview(true);
    }
  };
  useEffect(() => {
    fetchQuiz();
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
  const fetchGetDataQ = async () => {
    const res = await getQAByQuiz(selectQuiz.value);
    console.log("res", res);
  };
  useEffect(() => {
    fetchGetDataQ();
  }, [selectQuiz]);
  return (
    <div>
      <div className="text-2xl font-serif font-medium mb-3">
        Manage Question
      </div>
      <div className="add-new-question col-3 mb-3">
        <label className="form-label mb-2">Select Quiz</label>
        <Select
          defaultValue={selectQuiz}
          onChange={setSelectQuiz}
          options={listQuiz}
          placeholder="Select Quiz"
        />
      </div>
      {questions.length > 0 &&
        questions.map((question, index) => {
          return (
            <div className="qa-main mb-2" key={question.id}>
              <div className="q-content">
                <div className="text-lg text-blue-500 underline">
                  Add Question {index + 1}
                </div>
                <div className="row">
                  <div className="col-7">
                    <div className="row">
                      <div className="col-10">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          className="form-control"
                          value={question.description}
                          onChange={(e) =>
                            handleOnChange(
                              "QUESTION",
                              question.id,
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="col-2 mt-4">
                        <label
                          className="form-label text-black"
                          htmlFor={`${question.id}`}>
                          <div>
                            <GrDocumentUpload size="25px"></GrDocumentUpload>
                          </div>
                          <div>
                            {question.imageName ? "done upload" : "0 file"}
                          </div>
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id={`${question.id}`}
                          onChange={(e) => handleOnChangeFile(question.id, e)}
                          hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-2 mt-4 flex gap-3">
                    <button
                      className="text-lg"
                      onClick={() => handleAddQuestion()}>
                      <BsPlusCircle></BsPlusCircle>
                    </button>
                    {questions.length > 1 && (
                      <button
                        className="text-lg"
                        onClick={() => handleRemoveQuestion(question.id)}>
                        <CgRemove></CgRemove>
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className="col-2 p-2"
                  onClick={() => handlePreviewImage(question.id)}>
                  <img
                    src={`${question.imagePreview}`}
                    alt=""
                    className="img-cover rounded-full w-[60%]"
                  />
                </div>
              </div>
              {question.answers.map((answer, index) => {
                return (
                  <div className="answer mt-4" key={answer.id}>
                    <div className="flex gap-3 mb-3">
                      <input
                        type="checkbox"
                        checked={answer.isCorrect}
                        onChange={(e) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            answer.id,
                            question.id,
                            e.target.checked
                          )
                        }
                      />
                      <input
                        type="text"
                        className="border p-2 w-[400px]"
                        placeholder="Answer"
                        value={answer.description}
                        onChange={(e) =>
                          handleAnswerQuestion(
                            "INPUT",
                            answer.id,
                            question.id,
                            e.target.value
                          )
                        }
                      />
                      <div className="flex gap-3">
                        <button
                          className="text-lg"
                          onClick={() => handleAddAnswer(question.id)}>
                          <AiOutlinePlusSquare size="20px"></AiOutlinePlusSquare>
                        </button>
                        {question.answers.length > 1 && (
                          <button
                            className="text-lg"
                            onClick={() =>
                              handleRemoveAnswer(question.id, answer.id)
                            }>
                            <CgRemove size="20px"></CgRemove>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <hr className="border-2 bg-black w-[700px] my-4"></hr>
            </div>
          );
        })}
      <button
        className="px-3 py-2 bg-blue-500 text-white"
        onClick={() => handleSubmitQuestionForQuiz()}>
        Save Create
      </button>
      {isPreview ? (
        <Lightbox
          image={dataPreview}
          onClose={() => setIsPreview(false)}></Lightbox>
      ) : (
        ""
      )}
    </div>
  );
};
