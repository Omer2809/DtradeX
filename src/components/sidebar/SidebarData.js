import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as FiIcons from "react-icons/fi";

export const SidebarDataForStaff = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Listings",
    path: "/my-listings",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <FaIcons.FaBell />,
    cName: "nav-text",
  },
  {
    title: "Saved",
    path: "/favorites",
    icon: <IoIcons.IoMdPeople />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/logout",
    icon: <FaIcons.FaSignOutAlt />,
    cName: "nav-text",
  },
];
export const SidebarDataForAdmin = [
  {
    title: "Logout",
    path: "/plans",
    icon: <FiIcons.FiPackage />,
    cName: "nav-text",
  },

  {
    title: "Users",
    path: "/users",
    icon: <FaIcons.FaUsers />,
    cName: "nav-text",
  },
  // {
  //   title: "History",
  //   path: "/history",
  //   icon: <FaIcons.FaHistory />,
  //   cName: "nav-text",
  // },
  {
    title: "Report",
    path: "/report",
    icon: <FaIcons.FaDatabase />,
    cName: "nav-text",
  },
];
