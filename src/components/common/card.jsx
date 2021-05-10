import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import "../style.css";
import FA from "react-fontawesome";
import favoritesApi from "../../services/favoriteService";
import { toast } from "react-toastify";

function getClasses(favorited) {
  let classes = "bookmark";
  if (!favorited) classes += "-o";
  return classes;
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

    let result;
    if (favorited) {
      console.log("delte");
      result = await favoritesApi.deleteParticularFavorite(listing._id, userId);
    } else {
      console.log("add");
      result = await favoritesApi.addFavorite(listing._id, userId);
    }
  };

  return (
    <div className="card-container">
      <div className="cardd">
        <Link to={`/listing/details/${listing._id}`}>
          <img
            src={listing?.images[0].url}
            style={{ height: 200, borderBottom: 2 }}
          />
        </Link>
        <div
          className="card-text"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 6,
            fontSize: 15,
          }}
        >
          <div>{listing.title}</div>
          <div>Rs.{listing.price}</div>
        </div>
      </div>
      <div className="overlay">
        {listing?.added_by._id === userId && (
          <button
            type="button"
            className="edit-btn"
            // className="btn btn-secondary"
            
          >
            <Link to={`/listings/${listing._id}`}>
              <FA className="pencil" name="pencil" />
            </Link>
          </button>
        )}
        <button
          type="button"
          className="bookmark-btn"
          
          onClick={handleBookMark}
        >
          <FA className="bookmark" name={getClasses(favorited)} />
        </button>
      </div>
    </div>
  );
};

export default Card;
