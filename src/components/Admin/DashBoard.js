import React, { useState } from "react";
import { useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getOverView } from "../../service/apiservice";
export const DashBoard = () => {
  const [data, setData] = useState([]);
  const [overView, setOverview] = useState([]);
  console.log("overView", overView);
  // console.log("data", data);
  const dataDashBoard = [
    {
      namedash: "Total User",
      uv: "",
    },
    {
      namedash: "Total Quizzes",
      ub: "",
    },
    {
      namedash: "Total Questions",
      un: "",
    },
    {
      namedash: "Total Admins",
      um: "",
    },
  ];
  useEffect(() => {
    fetchOverView();
  }, []);
  const fetchOverView = async () => {
    const res = await getOverView();
    console.log("res", res);
    if (res.EC === 0) {
      setOverview(res.DT);
      const result = dataDashBoard.map((item) => {
        if (item.namedash === "Total User") {
          item.uv = res.DT.users.total;
        }
        if (item.namedash === "Total Quizzes") {
          item.ub = res.DT.others.countQuiz;
        }
        if (item.namedash === "Total Questions") {
          item.un = res.DT.others.countQuestions;
        }
        if (item.namedash === "Total Admins") {
          item.um = res.DT.users.countAdmin;
        }
        return item;
      });
      console.log("result", result);
      setData(result);
    }
  };
  return (
    <div className="mt-3">
      <div className="p-3 bg-blue-200">
        <div className="text-blue-500 font-bold text-3xl mb-3">
          AnalyTics DashBoard
        </div>
        <div className="text-lg font-thin">Welcome to My DashBoard 👋🏿 !!</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 items-stretch">
        <div className="left grid grid-cols-1 md:grid-cols-2 gap-3 grid-flow-row">
          <div className="rounded-lg flex items-center justify-center w-full h-full text-white flex-col bg-blue-500">
            <div>Total User</div>
            <span className="text-4xl text-white font-medium">
              {overView?.users?.total}
            </span>
          </div>
          <div className="bg-green-500 p-3 rounded-lg text-white flex items-center justify-center w-full h-full flex-col">
            <div>Total Quizzes</div>
            <span className="text-4xl text-white font-medium">
              {overView?.others?.countQuiz}
            </span>
          </div>
          <div className="bg-purple-500 p-3 rounded-lg text-white flex items-center justify-center w-full h-full flex-col">
            <div>Total Questions</div>
            <span className="text-4xl text-white font-medium">
              {overView?.others?.countQuestions}
            </span>
          </div>
          <div className="bg-orange-500 flex-col p-3 rounded-lg text-white flex items-center justify-center w-full h-full">
            <div>Total User</div>
            <span className="text-4xl text-white font-medium">
              {overView?.users?.countAdmin}
            </span>
          </div>
        </div>
        <div className="right">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="namedash" />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" fill="	#1E90FF" />
              <Bar dataKey="ub" fill="#82ca9d" />
              <Bar dataKey="un" fill="#7B68EE" />
              <Bar dataKey="um" fill="	#f99820" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
