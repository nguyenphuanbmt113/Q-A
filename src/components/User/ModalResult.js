import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = (props) => {
  const { show, handleClose, modalDataResult } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Question: {modalDataResult.countTotal}</div>
          <div>Total Correct Answers: {modalDataResult.countCorrect}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CLose
          </Button>
          <Button variant="primary">Show Answers</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalResult;
