import React from "react";
import { StyledFooter, FooterLink, SocialLink } from "../styles/StyledFooterr";
import LOGO from "../common/img/logo.png";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";

const links = [
  { name: "Facebook", to: "#", icon: "fa-facebook" },
  { name: "Instagram", to: "#", icon: "fa-instagram" },
  { name: "Youtube", to: "#", icon: "fa-youtube" },
  { name: "Twitter", to: "#", icon: "fa-twitter" },
];

const siteLinks = [
  { name: "Help & Support", to: "#" },
  { name: "Privacy Policy", to: "#" },
  { name: "About Us", to: "#" },
  { name: "Contact", to: "#" },
];

const Footer = ({ user }) => {
  return (
    <StyledFooter>
      <div
        className="GlobalContainer footer-container"
      >
        <div style={{ padding: 15, marginLeft: 10 }}>
          <Link to="/">
            <img
              src={LOGO}
              alt="footerlogo"
              style={{
                Maxheight: 70,
                width: "100%",
                marginTop: 10,
                paddingRight: 10,
              }}
            />
          </Link>
          <p>
            -Your Online market where you can buy and sell any thing that you
            don't need any more.
          </p>
          <div className="d-flex p-2 mt-3 share" style={{}}>
            <img
              src="https://statics.olx.in/external/base/img/playstore_2x.png"
              alt="android link"
              style={{ marginRight: 10 }}
            />
            <img
              src="https://statics.olx.in/external/base/img/appstore_2x.png"
              alt="ios link"
            />
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          <ul className="list">
            <li>
              <FooterLink to="/">Home</FooterLink>
            </li>
            <li>
              <FooterLink to="/listings/new">+ Sell</FooterLink>
            </li>
            {user ? (
              <li>
                <FooterLink to="/logout">Sign Out</FooterLink>
              </li>
            ) : (
              <>
                <li>
                  <FooterLink to="/register">Sign Up</FooterLink>
                </li>
                <li>
                  <FooterLink to="/login">Sign In</FooterLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3>Site Links</h3>
          <ul className="list">
            {siteLinks.map((link, index) => (
              <li key={index}>
                <FooterLink to={link.to}>{link.name}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>FOLLOW US</h3>
          <div className="socialLog">
            {links.map((link, index) => (
              <div className="wrapper" key={index}>
                <SocialLink to={link.to}>
                  <FontAwesome className={link.icon} name={link.name} />
                </SocialLink>
                <FooterLink to={link.to}>{link.name}</FooterLink>
              </div>
            ))}
          </div>
        </div>

        <div
          className="disclaimer"
          style={{
            backgroundColor: "#132c20",
            color: "#c6f6d5cc",
            maxWidth: "800",
          }}
        >
          <p>Copyright &copy; 2021, All Rights Reserved</p>
        </div>
      </div>
    </StyledFooter>
  );
};

export default Footer;
