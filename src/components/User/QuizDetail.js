import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDetailQuiz, postSubmit } from "../../service/apiservice";
import ModalResult from "./ModalResult";
import { Questions } from "./Questions";
import { RightContent } from "./RightContent";
export const QuizDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [modalDataResult, setModalDataResult] = useState({});
  useEffect(() => {
    const fetchQuestions = async () => {
      let res = await getDetailQuiz(id);
      if (res?.EC === 0) {
        const data = res?.DT;
        let questionDescription;
        let image = null;
        const result = _.chain(data)
          .groupBy("id")
          .map((value, key) => {
            let answers = [];
            value.forEach((item, index) => {
              if (index === 0) {
                questionDescription = item.description;
                image = item.image;
              }
              item.answers.isSelected = false;
              answers.push(item.answers);
            });
            return { questionId: key, answers, questionDescription, image };
          })
          .value();
        setDataQuiz(result);
      }
    };
    fetchQuestions();
  }, [id]);

  const handlePrev = () => {
    setIndex(index - 1);
  };
  const handleNext = () => {
    setIndex(index + 1);
  };
  const handleCheckBox = (value, answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question) {
      if (question && question.answers) {
        let result = question.answers.map((item) => {
          if (item.id === answerId) {
            item.isSelected = value;
          }
          return item;
        });
        question.answers = result;
      }
      let index = dataQuizClone.findIndex(
        (item) => +item.questionId === +questionId
      );
      if (index > -1) {
        dataQuizClone[index] = question;
        setDataQuiz(dataQuizClone);
      }
    }
  };
  const handleFinishQuiz = async () => {
    let payload = {
      quizId: +id,
      answers: [],
    };
    let answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        let questionId = item.questionId;
        let userAnswerId = [];
        item.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId,
        });
      });
    }
    payload.answers = answers;
    const res = await postSubmit(payload);
    if (res && res.EC === 0) {
      setModalDataResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT.countTotal,
      });
      setShow(true);
    } else {
      alert("something wrong");
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {dataQuiz.length === 0 ? (
        <div>Dont have any questions</div>
      ) : (
        <div className="flex gap-5">
          <div className="left-content border-gray-300 w-[70%] border-2 p-3">
            <div className="title text-xl bold capitalize">
              Quiz {id}: {location?.state?.quizTitle}
            </div>
            <hr></hr>
            <div className="ques-body">
              <img src="" alt="" />
            </div>
            <div className="ques-content">
              <Questions
                data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                index={index}
                handleCheckBox={handleCheckBox}></Questions>
            </div>
            <div className="ques-footer flex gap-3 mt-4">
              <button
                className="px-2 py-1 bg-blue-500 text-white disabled:hidden"
                onClick={handlePrev}
                disabled={index === 0 ? true : false}>
                Prev
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white disabled:hidden"
                onClick={handleNext}
                disabled={index === dataQuiz.length - 1 ? true : false}>
                Next
              </button>
              <button
                className="px-2 py-1 bg-yellow-500 text-white"
                onClick={() => handleFinishQuiz()}>
                Finish
              </button>
            </div>
          </div>
          <div className="right-content border-gray-300 border-2 w-[30%] p-3">
            <RightContent
              dataQuiz={dataQuiz}
              setIndex={setIndex}
              index={index}
              currentQ={currentQ}
              setCurrentQ={setCurrentQ}></RightContent>
          </div>
        </div>
      )}
      <ModalResult
        handleClose={handleClose}
        show={show}
        modalDataResult={modalDataResult}></ModalResult>
    </>
  );
};
