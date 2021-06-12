import React from "react";
import bannerWebp from "../../images/banner.webp";
import bannerWebp2 from "../../images/banner@2x.webp";
import bannerPng from "../../images/banner.png";
import bannerPng2 from "../../images/banner@2x.png";

import { Link } from "react-router-dom";

const Hero = ({user}) => {
  return (
    <section className="block hero">
      <div className="container grid grid--1x2">
        <header className="block__header hero__content">
          <h1 className="block__heading">Bring your business online!</h1>
          <p className="hero__tagline">
            Buy or Sell anything that you don't need anymore.
          </p>
          <Link
            to={user ? "/listings/new" : "/login"}
            className="btn btn--accent btn--stretched"
          >
            Get Started
          </Link>
        </header>

        <picture>
          <source
            type="image/webp"
            srcSet={`${bannerWebp} 1x,${bannerWebp2}  2x`}
          />

          <source
            type="image/png"
            srcSet={`${bannerPng} 1x,${bannerPng2}  2x`}
          />
          <img
            className="hero__image"
            src={bannerPng}
            alt="shop cart banner image"
          />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
