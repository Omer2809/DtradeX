import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from "../common/tableFolder/table";
import noImage from "../common/img/noimage.png";

class FavoritesTable extends Component {
  columns = [
    {
      key: "img",
      content: (favorite) => (
        <Link to={`/listing/details/${favorite.listing._id}`}>
          <img
            className="imaage"
            src={favorite.listing.images[0].url || noImage}
            alt={favorite.listing.title}
            style={imageStyling}
          />
        </Link>
      ),
    },
   
    { path: "listing.title", label: "Title" },
    { path: "listing.price", label: "Price" },
    {
      key: "delete",
      content: (favorite) => (
        <button
          onClick={() => {
            if (window.confirm("Are you sure to delete this record?")) {
              this.props.onDelete(favorite);
            }
          }}
          className="btn btn-danger btn-sm btn--square"
        >
          Delete
        </button>
      ),
    },
  ];


  render() {
    const { favorites } = this.props;

    return (
      <Table
        columns={this.columns}
        data={favorites}
      />
    );
  }
}

const imageStyling = {
  width: 80,
  height: 100,
  borderRadius: 3,
  border: 3,
  borderColor: "#fff",
  borderStyle: "solid",
};

export default FavoritesTable;
