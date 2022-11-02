import React from "react";
import _ from "lodash";
export const Questions = (props) => {
  const { data, index, handleCheckBox } = props;
  const ClickCheckBox = (value, aid, qid) => {
    handleCheckBox(value, aid, qid);
  };
  if (_.isEmpty(data)) {
    return <></>;
  }

  return (
    <>
      <div className="w-[250px] mb-4">
        {data && data.image ? (
          <img src={`data:image/jpeg;base64,${data.image}`} alt="" />
        ) : (
          ""
        )}
      </div>
      <div className="question capitalize mb-2 text-lg">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((a, index) => {
            return (
              <>
                <div class="form-check" key={index}>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    id="flexCheckDefault"
                    onChange={(e) =>
                      ClickCheckBox(e.target.checked, a.id, data.questionId)
                    }
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    {a.description}
                  </label>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};
