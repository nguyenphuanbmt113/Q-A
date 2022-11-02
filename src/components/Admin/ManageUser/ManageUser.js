import React, { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { getUserWithPaginate } from "../../../service/apiservice";
import ModalCreateUser from "./ModalCreateUser";
import ModalDelete from "./ModalDelete";
import ModalUpdateUser from "./ModalUpdateUser";
import { TableUser } from "./TableUser";
export const ManageUser = () => {
  const [listUser, setListUser] = useState([]);
  console.log("listUser", listUser)
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  useEffect(() => {
    fetchUserWithPaginate(page);
  }, [page]);
  // fetching User With Paginate
  const fetchUserWithPaginate = async (page) => {
    const res = await getUserWithPaginate(page);
    if (res.EC === 0) {
      setTotalPages(res?.DT?.totalPages);
      setListUser(res?.DT?.users);
    }
  };
  const handleClick = async (e) => {
    let select = e.selected + 1;
    setPage(select);
  };
  const handleUpdate = (user) => {
    setShowModalUpdate(true);
    setDataUpdate(user);
  };
  const handleCloseDeleteModal = () => {
    setShowModalDelete(false);
  };
  const handleCloseCreateModal = () => {
    setShowModalCreate(false);
  };
  const handleCloseUpdateModal = () => {
    setShowModalUpdate(false);
  };
  const handleShowModalDelete = (user) => {
    setShowModalDelete(true);
    setDataDelete(user);
  };
  return (
    <>
      <div className="text-center underline text-xl mb-3 font-serif font-medium">
        Manage User
      </div>
      <button
        className="px-3 py-2 bg-green-500 text-white flex items-center gap-2 font-medium my-3 rounded-lg"
        onClick={() => setShowModalCreate(true)}>
        <AiOutlineUserAdd size="25px"></AiOutlineUserAdd>
        <div>Create User</div>
      </button>
      <TableUser
        listUser={listUser}
        totalPages={totalPages}
        handleClick={handleClick}
        handleDelete={handleShowModalDelete}
        handleUpdate={handleUpdate}></TableUser>
      <ModalDelete
        show={showModalDelete}
        handleClose={handleCloseDeleteModal}
        dataDelete={dataDelete}
        fetchUserWithPaginate={fetchUserWithPaginate}
        page={page}></ModalDelete>
      <ModalCreateUser
        show={showModalCreate}
        handleClose={handleCloseCreateModal}
        fetchUserWithPaginate={fetchUserWithPaginate}></ModalCreateUser>
      <ModalUpdateUser
        showModalUpdate={showModalUpdate}
        handleCloseUpdate={handleCloseUpdateModal}
        dataUpdate={dataUpdate}
        fetchUserWithPaginate={fetchUserWithPaginate}
        page={page}></ModalUpdateUser>
    </>
  );
};
