import React, { useState } from "react";
import { CountDowm } from "./CountDowm";
// import { CountDowm } from "./CountDowm";

export const RightContent = (props) => {
  const { dataQuiz, setIndex } = props;
  const [current, setCurrent] = useState(false);
  const handleSelectQuestion = (a) => {
    setIndex(a);
    setCurrent(true);
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
                className={
                  current === true
                    ? "w-[50px] h-[50px] bg-red-500 text-white rounded-full flex items-center justify-center"
                    : "w-[50px] h-[50px] text-black rounded-full flex items-center justify-center border-1 border-gray-300"
                }
                onClick={() => handleSelectQuestion(i)}
                key={`question-${i + 1}`}>
                {i + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
};
