import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { AiOutlineUserAdd } from "react-icons/ai";
import { getAllUser, getUserWithPaginate } from "../../../service/apiservice";
import ModalCreateUser from "./ModalCreateUser";
import ModalDelete from "./ModalDelete";
import ModalUpdateUser from "./ModalUpdateUser";
import { TableUser } from "./TableUser";
export const ManageUser = () => {
  const [dataCsv, setDataCsv] = useState([]);
  // const csvData = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  // ];
  const handleExport = async () => {
    const result = allUser.map((item) => {
      return {
        email: item.email,
        username: item.username,
        role: item.role,
      };
    });
    setDataCsv(result);
  };
  // const csvData = [
  //   { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  //   { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  //   { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" },
  // ];
  const [listUser, setListUser] = useState([]);
  const [allUser, setAllUser] = useState([]);
  console.log("allUser", allUser);
  console.log("listUser", listUser);
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
  //fetching data all user
  const fetchAllUser = async () => {
    const res = await getAllUser();
    console.log("res", res);
    if (res.EC === 0) {
      setAllUser(res?.DT);
    }
  };
  useEffect(() => {
    fetchAllUser();
  }, []);
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
      <div className="my-3 flex items-center justify-between">
        <button
          className="px-3 py-2 bg-green-500 text-white flex items-center gap-2 font-medium rounded-lg"
          onClick={() => setShowModalCreate(true)}>
          <AiOutlineUserAdd size="25px"></AiOutlineUserAdd>
          <div>Create User</div>
        </button>
        <div className="flex gap-3">
          <button
            className="px-3 py-2 bg-yellow-500 text-white rounded-md"
            onClick={() => handleExport()}>
            <CSVLink data={dataCsv} className="text-white">
              Exports
            </CSVLink>
          </button>
          <button className="px-3 py-2 bg-gray-500 text-white rounded-md">
            Import
          </button>
        </div>
      </div>
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
