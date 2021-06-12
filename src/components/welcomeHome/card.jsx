import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "./style.css";
// import FA from "react-fontawesome";
import favoritesApi from "../../services/favoriteService";
import { toast } from "react-toastify";
import Icon from "../icon";

function getClasses(favorited) {
  if (!favorited) return "#ribbon";
  return "#bookmark";
}

const Card = ({ listing, userId }) => {
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (userId) checkfavorited(listing._id, userId);
  }, [listing._id, userId]);

  const checkfavorited = async (itemId, userId) => {
    const result = await favoritesApi.checkFavorite(itemId, userId);

    if (result.data.length !== 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  };

  const handleBookMark = async () => {
    if (!userId) return toast.info("Please login to Save ....");

    setFavorited(!favorited);

    return favorited
      ? await favoritesApi.deleteParticularFavorite(listing._id, userId)
      : await favoritesApi.addFavorite(listing._id, userId);
  };

  return (
    <div className="listing-card">

      <div className="listing-card-showcase">
        <Link to={`/listing/details/${listing._id}`}>
          <img
            src={listing?.images && listing?.images[0]?.url}
            className="listing-card__image"
            alt="product"
          />
        </Link>
        <div className="listing-card__text">
          <h4>{listing.title}</h4>
          <h4> &#8377; {listing.price}</h4>
        </div>
      </div>

      <div className="listing-card-overlay">
        {listing?.added_by._id === userId && (
          <Link to={`/listings/${listing._id}`} className="overlay__icon">
            <Icon name={"#edit"} className="icon--small edit--icon" />
          </Link>
        )}
        <button
          type="button"
          className="overlay__icon"
          onClick={handleBookMark}
        >
          <Icon name={getClasses(favorited)} className="icon--small bookmark--icon" />
        </button>
      </div>
    </div>
  );
};

export default Card;
