import React from "react";
import { StyledFooter, FooterLink, SocialLink } from "./mystyle/StyledFooterr";
// import LOGO from "./img/darklogo.png";
import { FooterButton } from "./mystyle/watchlistButton";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = ({ user }) => {
  const handleJoin = () => {
    toast.info("Please Login ...");
  };

  return (
    <StyledFooter>
      <div
        className="GlobalContainer footer-container"
        style={{ paddingLeft: 32, paddingRight: 32 }}
      >
        <div style={{ padding: 15, marginLeft: 10 }}>
          <Link to="/">
            {/* <img src={LOGO} alt="footerlogo" /> */}
            LOGO
          </Link>
          <p>
            -Your Online market where you can buy and sell any thing that you
            don't need any more.
          </p>
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
            {!user && (
              <>
                <li>
                  <FooterLink to="/register">Sign Up</FooterLink>
                </li>
                <li>
                  <FooterLink to="/login">Sign In</FooterLink>
                </li>
              </>
            )}
            {user && (
              <>
                <li>
                  <FooterLink to="/logout">Sign Out</FooterLink>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          <h3>Site Links</h3>
          <ul className="list">
            <li>
              <FooterLink to="#">Help &amp; Support</FooterLink>
            </li>
            <li>
              <FooterLink to="#">Privacy Policy</FooterLink>
            </li>
            <li>
              <FooterLink to="#">About Us</FooterLink>
            </li>
            <li>
              <FooterLink to="#">Contact</FooterLink>
            </li>
          </ul>
        </div>
        {!user && (
          <div>
            <h2>Join Our Club</h2>
            <p>
              Be a part of Our Club , join now &amp; get unlimited access and
              benefits !
            </p>

            <FooterButton primary="true" to="/login" onClick={handleJoin}>
              Join Now
            </FooterButton>
            {!user && (
              <div className="social mt-3 m-1">
                <SocialLink to="#">
                  <FontAwesome className="fa-facebook" name="facebook" />
                </SocialLink>
                <SocialLink to="#">
                  <FontAwesome className="fa-instagram" name="insta" />
                </SocialLink>
                <SocialLink to="#">
                  <FontAwesome className="fa-twitter" name="twitter" />
                </SocialLink>
                <SocialLink to="#">
                  <FontAwesome className="fa-youtube" name="youtube" />
                </SocialLink>
              </div>
            )}
          </div>
        )}
        {user && (
          <div>
            <h3>FOLLOW US</h3>

            <div className="socialLog">
              <div className="wrapper">
                <SocialLink to="#">
                  <FontAwesome className="fa-facebook" name="fb" />
                </SocialLink>
                <FooterLink to="#">Facebook</FooterLink>
              </div>
              <div className="wrapper">
                <SocialLink to="#">
                  <FontAwesome className="fa-instagram" name="insta" />
                </SocialLink>
                <FooterLink to="#">Instagram</FooterLink>
              </div>
              <div className="wrapper">
                <SocialLink to="#">
                  <FontAwesome className="fa-twitter" name="twit" />
                </SocialLink>
                <FooterLink to="#">Twitter</FooterLink>
              </div>
              <div className="wrapper">
                <SocialLink to="#">
                  <FontAwesome className="fa-youtube" name="youtube" />
                </SocialLink>
                <FooterLink to="#">YouTube</FooterLink>
              </div>
            </div>
          </div>
        )}
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
