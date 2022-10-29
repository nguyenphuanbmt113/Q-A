import React from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ChangePassword } from "./ChangePassword";
import {History} from "./History";
import { UpdateInfomation } from "./UpdateInfomation";
const ModalProfile = (props) => {
  const { show, handleClose } = props;
  return (
    <>
      <Modal
        show={show}
        size="xl"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Manage InfoMation User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey="User Information"
            id="fill-tab-example"
            className="mb-3"
            fill>
            <Tab eventKey="User Information" title="User Information">
              <UpdateInfomation handleClose={handleClose}></UpdateInfomation>
            </Tab>
            <Tab eventKey="Change Password" title="Change Password">
              <ChangePassword></ChangePassword>
            </Tab>
            <Tab eventKey="History" title="History">
              <History></History>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalProfile;
