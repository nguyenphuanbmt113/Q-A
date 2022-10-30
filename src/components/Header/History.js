import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getHistory } from "../../service/apiservice";

export const History = () => {
  const [dataHistory, setDataHistory] = useState([]);
  const username = useSelector((state) => state?.account.username);
  useEffect(() => {
    fetchHistory();
  }, []);
  const fetchHistory = async () => {
    const res = await getHistory();
    if (res.EC === 0) {
      setDataHistory(res.DT.data);
    }
  };
  return (
    <div>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">QuIzName</th>
            <th scope="col">TotalQuestion</th>
            <th scope="col">TotalCorect</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {dataHistory &&
            dataHistory.length > 0 &&
            dataHistory.splice(0, 7).map((item) => {
              return (
                <tr>
                  <th scope="row">{item.id}</th>
                  <td>{username}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>
                    {moment(item.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
