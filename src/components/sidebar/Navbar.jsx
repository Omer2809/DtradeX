import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";

import { SidebarDataForStaff, SidebarDataForAdmin } from "./SidebarData";
import "./Navbar.css";
import { NavItems, NavItemButton } from "../mystyle/styledNavBar";
import UploadPictures from "../common/uploadPictures";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import OldPictureDisplay from "../common/oldPictureDisplay";

function Navbar({ user }) {
  const [sidebar, setSidebar] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);
  const [url, setUrl] = useState("");
  const [count, setCount] = useState(2);
  const showSidebar = () => setSidebar(!sidebar);

  const changeBackground = () => {
    if (window.scrollY >= 30) {
      setNavbarBg(true);
    } else {
      setNavbarBg(false);
    }
  };

  useEffect(() => {
    console.log(user);
    async function fetchData() {
      console.log(user);
      if (user) {
        const { data } = await userService.getUser(user.userId);
        console.log(data);

        if (data.images?.length != 0) {
          setUrl(data.images[0].url);

          if (count !== 3) setCount(3);
        }
        console.log(url);
      }
    }

    fetchData();
  }, [user, count]);

  const handleImageDelete = async (image) => {
    const originalUrl = url;

    setUrl("");
    setCount(2);

    try {
      await userService.deleteImage(user.userId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This listing has already been deleted.");

      setUrl(originalUrl);
      setCount(3);
    }
  };

  const uploadProfileImage = async (images) => {
    try {
      if (images.length === 0) return handleImageDelete("fd");

      let data = new FormData();

      images.forEach((image) =>
        data.append("images", image.originFileObj, image.originFileObj.name)
      );

      await userService.updateProfileImage(data, user.userId);

      setCount(3);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
      toast.warn(ex);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className={navbarBg ? "navbarr activeIt" : "navbarr "}>
          <div className="NavContainer">
            {user ? (
              <>
                {url ? (
                  <img
                    src={url}
                    onClick={showSidebar}
                    style={{ cursor: "pointer" }}
                    alt=""
                    className="profile-image rounded-circle mb-3 mr-3"
                  />
                ) : (
                  <Link to="#" className="menu-bars rounded-circle p-2">
                    <FaIcons.FaUser
                      onClick={showSidebar}
                      style={{ color: "#eee", opacity: 0.95, fontSize: 25 }}
                    />
                  </Link>
                )}
                <Link to="/">TWT</Link>
                <NavItems>
                  <NavItemButton to="/listings/new">+ NEW</NavItemButton>
                  {/* <NavItemButton to="/logout">Logout</NavItemButton> */}
                </NavItems>
              </>
            ) : (
              <>
                <Link to="/">TWT</Link>
                <NavItems>
                  <NavItemButton to="/register">Sign Up</NavItemButton>
                  <NavItemButton to="/login">Login</NavItemButton>
                </NavItems>
              </>
            )}
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul>
            <li className="navbar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars cross">
                <AiIcons.AiOutlineClose style={{ fontSize: 30 }} />
              </Link>
            </li>
            <li
              className="navbar-toggle"
              style={{ paddingLeft: 30, marginTop: 20 }}
            >
              {url !== "" ? (
                <OldPictureDisplay image={url} onDelete={handleImageDelete} />
              ) : (
                <UploadPictures
                  uploadImages={uploadProfileImage}
                  count={count}
                />
              )}
            </li>
          </ul>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {/* <li className="navbar-toggle">
              <Link to="#" className="menu-bars cross">
                <AiIcons.AiOutlineClose style={{ fontSize: 30 }} />
              </Link>
            </li> */}

            {SidebarDataForStaff.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className="icon">
                    {item.icon}
                    <span className="NavSpan">{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {user && user.isAdmin && (
              <>
                {" "}
                {SidebarDataForAdmin.map((item, index) => {
                  return (
                    <li key={index + 6} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="NavSpan">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}

            {/* <li className="nav-text">
              <Link to="/logout">
                <FaIcons.FaSignOutAlt />
                <span className="NavSpan">Logout</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
