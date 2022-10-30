import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailQuiz } from "../../service/apiservice";
import _ from "lodash";
export const QuizDetail = () => {
  const { id } = useParams();
  useEffect(() => {
    fetchQuestions();
  }, [id]);
  const fetchQuestions = async () => {
    let res = await getDetailQuiz(id);
    console.log("res", res);
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
      console.log("result", result);
    }
  };
  return <div>QuizDetail</div>;
};
