import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByUser } from "../../service/apiservice";

export const UserQuiz = () => {
  const navigate = useNavigate();
  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="mt-5 max-w-[1400px] mx-auto px-3 grid grid-cols-2 md:grid-cols-4 gap-5">
      {arrQuiz.length > 0 &&
        arrQuiz.map((item, index) => {
          return (
            <div className="card rounded-lg relative" key={index}>
              <div className="h-[250px]">
                <img
                  src={`data:image/jpeg;base64,${item.image}`}
                  className="card-img-top object-cover  w-[100%]  h-[100%]"
                  alt="..."
                />
              </div>
              <div className="absolute inset-0 bg-black/60 z-[0]"></div>
              <div className="card-body flex flex-col absolute bottom-1 text-white">
                <h5 className="card-title">Quiz {index + 1}</h5>
                <p className="card-text">{item.description}</p>
                <div className="mt-auto rounded-md">
                  <button
                    className="px-2 py-2 bg-blue-500 text-white hover:bg-blue-400"
                    onClick={() =>
                      navigate(`/quiz/${item.id}`, {
                        state: { quizTitle: item.description },
                      })
                    }>
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <p>Your dont have any quiz now</p>}
    </div>
  );
};
