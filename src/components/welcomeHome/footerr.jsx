import React, { useState } from "react";

import FooterSection from "./footerSection";
import { Link } from "react-router-dom";
import Icon from "../icon";

import playstore from "../../images/playstore.png";

const Footer = ({ user }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <div className="container">
        <div className="callout callout--primary callout-signup">
          <div className="grid grid--1x2">
            <div className="callout__content">
              <h2 className="callout__heading">Ready to Get Started?</h2>

              <p>
                Get Start, Create your account and explore the world of trade.
                Find deals that best suits you, sell your products.
              </p>
            </div>

            <Link
              to={user ? "/listings/new" : "/login"}
              className="btn btn--secondary btn--stretched"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <footer className="block block--dark footer">
        <div className="container grid footer__sections">
          <section
            className={
              show
                ? "collapsible collapsible--expanded footer__section"
                : "collapsible  footer__section"
            }
          >
            <div className="collapsible__header">
              <h2 className="collapsible__heading footer__heading">
                Quick Links
              </h2>
              <Icon
                style={{ cursor: "pointer" }}
                onClick={() => setShow(!show)}
                name="#chevron"
                className="icon icon--white collapsible__chevron"
              />
            </div>

            <div className="collapsible__content">
              <ul className="list">
                <li>
                  <Link to="/">Home</Link>
                </li>

                {user ? (
                  <>
                    <li>
                      <Link to="/listings/new">+Sell</Link>
                    </li>
                    <li>
                      <Link to="/logout">Logout</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/register">Sign Up</Link>
                    </li>
                    <li>
                      <Link to="/login">Sign In</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </section>

          <FooterSection />

          <div className="footer__brand">
            <Icon name="#logo-light" className="icon--medium logo-icon" />
            <h3>DtradeX</h3>
            <p className="footer__copyright">&copy; Copyright 2021 Mohd Omer</p>
            <img className="playstore" src={playstore} alt="play store link" />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
