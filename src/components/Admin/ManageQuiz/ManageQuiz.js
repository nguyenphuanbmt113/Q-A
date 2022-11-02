import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AddNewQuiz } from "./AddNewQuiz";
import { AssignToUsers } from "./AssignToUsers";
import { QuizTable } from "./QuizTable";
import { UpdateQA } from "./UpdateQA";
export const ManageQuiz = () => {
  return (
    <>
      <div className="text-2xl font-serif font-medium mb-3">Manage Quiz</div>
      <Tabs
        defaultActiveKey="Add New Quiz"
        id="fill-tab-example"
        className="mb-3"
        fill={false}>
        <Tab
          eventKey="Add New Quiz"
          title="Add New Quiz"
          className="p-4 border-x-2 border-b-2">
          <AddNewQuiz></AddNewQuiz>
        </Tab>
        <Tab eventKey="Table Quiz" title="Table Quiz">
          <QuizTable></QuizTable>
        </Tab>
        <Tab eventKey="Update Q&A" title="Update Q&A">
          <UpdateQA></UpdateQA>
        </Tab>
        <Tab eventKey="Assign to Users" title="Assign to Users">
          <AssignToUsers></AssignToUsers>
        </Tab>
      </Tabs>
    </>
  );
};
