import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { AiOutlineBell } from "react-icons/ai";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";

export const Sidebar = ({ collapsed, toggled, handleToggleSidebar }) => {
  return (
    <div className="text-white">
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}>
        <SidebarHeader>
          <div
            className="text-white"
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}>
            Q&A
          </div>
        </SidebarHeader>

        <SidebarContent className="text-white text-3xl font-medium">
          <Menu iconShape="circle">
            <MenuItem
              icon={<MdDashboardCustomize size="md"></MdDashboardCustomize>}>
              Dashboard <Link to="/admin"></Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              title="Features"
              icon={<AiOutlineBell size="md"></AiOutlineBell>}>
              <MenuItem>
                Manage User <Link to="/admin/manage-users"></Link>
              </MenuItem>
              <MenuItem>
                Manage Quiz <Link to="/admin/manage-quiz"></Link>
              </MenuItem>
              <MenuItem>
                Manage Question <Link to="/admin/manage-question"></Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
      </ProSidebar>
      ;
    </div>
  );
};
