import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
  CartesianGrid,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];
export const DashBoard = () => {
  return (
    <div className="mt-3">
      <div className="p-3 bg-blue-200">
        <div className="text-blue-500 font-bold text-3xl mb-3">
          AnalyTics DashBoard
        </div>
        <div className="text-lg font-thin">Welcome to My DashBoard 👋🏿 !!</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 items-stretch">
        <div className="left grid grid-cols-1 md:grid-cols-2 gap-3 grid-flow-row">
          <div className="bg-red-300 w-full p-3">Total User</div>
          <div className="bg-blue-300 w-full p-3">Total Quizzes</div>
          <div className="bg-yellow-300 w-full p-3">Total Questions</div>
          <div className="bg-orange-300 w-full p-3">Total Answer</div>
        </div>
        <div className="right">
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};
