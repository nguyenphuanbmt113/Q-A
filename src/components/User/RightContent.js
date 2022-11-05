import React, { useRef } from "react";
import { CountDowm } from "./CountDowm";
// import { CountDowm } from "./CountDowm";

export const RightContent = (props) => {
  const { dataQuiz, setIndex, currentQ, setCurrentQ } = props;
  const refdiv = useRef([]);
  const handleSelectQuestion = (i, question) => {
    const classList = ["question"];
    const isSelected = question.answers.find(
      (answer) => answer.isSelected === true
    );
    const isClicked = currentQ === i;
    if (isSelected) {
      classList.push("bg-red-500 text-white");
    }
    if (isClicked) {
      classList.push("bg-gray-400 text-black");
    }
    return classList.join(" ");
  };
  const handleClick = (i) => {
    setCurrentQ(i);
    setIndex(i);
  };

  return (
    <div>
      <div className="text-3xl text-center">
        <CountDowm></CountDowm>
      </div>
      <hr></hr>
      <div className="main-question grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-4 pt-2">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, i) => {
            return (
              <div
                ref={refdiv.current[i]}
                className={`${handleSelectQuestion(
                  i,
                  item
                )} border w-10 h-10 rounded-full text-black flex items-center justify-center text-lg`}
                key={`question-${i + 1}`}
                onClick={() => handleClick(i)}>
                {i + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
};
