import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUserWithId } from "../../../service/apiservice";

const ModalDelete = (props) => {
  const { show, handleClose, dataDelete, fetchUserWithPaginate, page } = props;
  const handleConfirmDelete = async () => {
    const res = await deleteUserWithId(dataDelete.id);
    if (res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await fetchUserWithPaginate(page);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          Are You Sure To Delete This One! {dataDelete?.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirmDelete()}>
            ConFirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;
