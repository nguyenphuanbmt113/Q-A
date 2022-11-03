import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CreateQuestionForQuiz } from "./CreateQuestionForQuiz";
import { QuestionTable } from "./TableQuestion";
export const ManageQuestion = () => {
  return (
    <>
      <Tabs
        defaultActiveKey="Add New Question Quiz"
        id="fill-tab-example"
        className="mb-3"
        fill={false}>
        <Tab
          eventKey="Add New Question Quiz"
          title="Add New Question Quiz"
          className="p-4 border-x-2 border-b-2">
          <CreateQuestionForQuiz></CreateQuestionForQuiz>
        </Tab>
        <Tab eventKey="Table All Question" title="Table All Question">
          <QuestionTable></QuestionTable>
        </Tab>
      </Tabs>
    </>
  );
};