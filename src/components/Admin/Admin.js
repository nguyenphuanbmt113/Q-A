import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
export const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);
  const hanldeToggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar
          collapsed={collapsed}
          handleToggleSidebar={hanldeToggle}></Sidebar>
      </div>
      <div className="admin-content p-3">
        <div className="admin-header text-2xl">
          <FaBars onClick={() => setCollapsed(!collapsed)}></FaBars>
        </div>
        <div className="admin-main">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
