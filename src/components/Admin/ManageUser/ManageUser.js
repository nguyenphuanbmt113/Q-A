import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserWithPaginate } from "../../../service/apiservice";
import ModalDelete from "./ModalDelete";
import { TableUser } from "./TableUser";
export const ManageUser = () => {
  const location = useLocation();
  console.log("location", location);
  const [listUser, setListUser] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  useEffect(() => {
    fetchUserWithPaginate(page);
  }, [page]);
  // fetching User With Paginate
  const fetchUserWithPaginate = async (page) => {
    const res = await getUserWithPaginate(page);
    console.log("res", res);
    if (res.EC === 0) {
      setTotalPages(res?.DT?.totalPages);
      setListUser(res?.DT?.users);
    }
  };
  const handleClick = async (e) => {
    let select = e.selected + 1;
    console.log("select", select);
    setPage(select);
    await fetchUserWithPaginate(page);
  };
  const handleCloseDeleteModal = () => {
    setShowModalDelete(false);
  };
  const handleShowModalDelete = (user) => {
    setShowModalDelete(true);
    setDataDelete(user);
  };
  return (
    <>
      <TableUser
        listUser={listUser}
        totalPages={totalPages}
        handleClick={handleClick}
        handleDelete={handleShowModalDelete}></TableUser>
      <ModalDelete
        show={showModalDelete}
        handleClose={handleCloseDeleteModal}
        dataDelete={dataDelete}
        fetchUserWithPaginate={fetchUserWithPaginate}></ModalDelete>
    </>
  );
};
