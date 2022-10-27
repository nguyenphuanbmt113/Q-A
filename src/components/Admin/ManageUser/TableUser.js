import React from "react";
import { AiOutlineMail, AiOutlineDelete } from "react-icons/ai";
import { BiUser, BiBot, BiShow } from "react-icons/bi";
import { HiOutlineIdentification } from "react-icons/hi";
import { MdPendingActions } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import ReactPaginate from "react-paginate";
export const TableUser = (props) => {
  let { listUser, totalPages, handleClick, handleDelete, handleUpdate } = props;
  // const handleClick = (e) => {};
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <td>
              <HiOutlineIdentification size="25px"></HiOutlineIdentification>
              <div className="text-lg font-medium">ID</div>
            </td>
            <td>
              <BiUser size="25px"></BiUser>
              <div className="text-lg font-medium">Username</div>
            </td>
            <td>
              <AiOutlineMail size="25px"></AiOutlineMail>
              <div className="text-lg font-medium">Email</div>
            </td>
            <td>
              <BiBot size="25px"></BiBot>
              <div className="text-lg font-medium">Role</div>
            </td>
            <td>
              <MdPendingActions size="25px"></MdPendingActions>
              <div className="text-lg font-medium">Actions</div>
            </td>
          </tr>
        </thead>
        <tbody>
          {listUser.length > 0 &&
            listUser.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td className="flex items-center gap-2">
                    <button
                      className="px-2 py-2 rounded-full bg-red-500 text-white"
                      onClick={() => handleDelete(item)}>
                      <AiOutlineDelete size="20px"></AiOutlineDelete>
                    </button>
                    <button
                      className="px-2 py-2 rounded-full bg-blue-500 text-white"
                      onClick={() => handleUpdate(item)}>
                      <FiEdit size="20px"></FiEdit>
                    </button>
                    <button className="px-2 py-2 rounded-full bg-yellow-500 text-white">
                      <BiShow size="20px"></BiShow>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="previous"
        nextLabel="next"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPages}
        pageRangeDisplayed={4}
        marginPagesDisplayed={2}
        onPageChange={(e) => handleClick(e)}
        containerClassName="pagination justify-content-center"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        activeClassName="active"></ReactPaginate>
    </>
  );
};
