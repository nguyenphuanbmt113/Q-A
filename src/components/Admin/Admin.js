import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FiSettings } from "react-icons/fi";
import {BsBell} from "react-icons/bs"
import {RiMessage2Line} from "react-icons/ri"
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
        <div className="admin-header text-2xl flex items-center justify-between">
          <FaBars onClick={() => setCollapsed(!collapsed)}></FaBars>

          <div className="flex item-center gap-4">
            <NavDropdown
              title={
                <div className="flex gap-1 items-center text-black">
                  <FiSettings className="inline-block text-xl"></FiSettings>
                  Setting
                </div>
              }
              id="basic-nav-dropdown"
              className="text-black">
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Log Out</NavDropdown.Item>
              <NavDropdown.Item>Code</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Actions</NavDropdown.Item>
            </NavDropdown>
            <div className="p-2 flex items-center gap-4">
              <RiMessage2Line></RiMessage2Line>
              <BsBell></BsBell>
            </div>
          </div>
        </div>
        <div className="admin-main">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};
