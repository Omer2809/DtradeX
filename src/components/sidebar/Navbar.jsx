import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import UploadPictures from "../common/picture/uploadPictures";
import * as userService from "../../services/userService";
import { toast } from "react-toastify";
import OldPictureDisplay from "../common/picture/oldPictureDisplay";

import Icon from "../icon";

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
    async function fetchData() {
      if (user && user.userId) {
        const { data } = await userService.getUser(user.userId);

        if (data.images?.length !== 0) {
          setUrl(data.images[0].url);

          if (count !== 3) setCount(3);
        }
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
    <header>
      <nav className={navbarBg ? "nav--bar activeIt" : "nav--bar "}>
        <div className="nav-container">
          {user ? (
            <>
              {url ? (
                <img
                  src={url}
                  onClick={showSidebar}
                  style={{ cursor: "pointer" }}
                  alt=""
                  className="home-profile-image"
                />
              ) : (
                <span className="home-profile-icon" onClick={showSidebar}>
                  <Icon name="#user" className="icon" />
                </span>
              )}
              <Link to="/" className="nav__brand">
                <Icon name="#logo-red" className="icon--medium logo-icon" />
                <h3>DtradeX</h3>
              </Link>
              <ul className="list nav__list">
                <li className="nav__item">
                  <button className="btn btn-block btn--secondary btn--nav btn--hide">
                    <Link to="/listings/new" className="cap"> <Icon name="#plus" className="icon--small" /> SELL</Link>
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              <Link to="/" className="nav__brand">
                <Icon name="#logo-red" className="icon--medium logo-icon" />
                <h3>DtradeX</h3>
              </Link>
              <ul className="list nav__list">
                <li className="nav__item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="nav__item">
                  <button className="btn btn-block btn--secondary btn--nav btn--hide">
                    <Link to="/register">Sign Up</Link>
                  </button>
                </li>
              </ul>
            </>
          )}
        </div>
      </nav>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="side-menu-list">
          <li className="navbar-toggle" onClick={showSidebar}>
            <Icon name="#close" className="icon--small menu-bars cross" />
          </li>
          <li className="navbar-toggle navbar-picture-upload ">
            {url ? (
              <OldPictureDisplay image={url} onDelete={handleImageDelete} />
            ) : (
              <UploadPictures uploadImages={uploadProfileImage} count={count} />
            )}
          </li>

          <li className="nav-menu-items " onClick={showSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className="icon">
                    {item.icon}
                    <span className="NavSpan">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
