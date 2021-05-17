import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import Table from "../common/tableFolder/table";
import noImage from "../common/img/noimage.png";

class ListingsTable extends Component {
  columns = [
    {
      key: "img",
      content: (listing) => (
        <Link to={`/listing/details/${listing._id}`}>
          <img
            className="imaage"
            src={listing?.images[0]?.url || noImage}
            alt={listing.title}
            style={imageStyling}
          />
        </Link>
      ),
    },
    { path: "title", label: "Title" },
    { path: "price", label: "Price" },
    {
      key: "edit",
      content: (listing) => (
        <Link to={`/listings/${listing._id}`} style={{ color: "green" }}>
          <FaEdit />
        </Link>
      ),
    },
    {
      key: "delete",
      content: (listing) => (
        <button
          onClick={() => {
            if (window.confirm("Are you sure to delete this record?")) {
              this.props.onDelete(listing);
            }
          }}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { listings } = this.props;

    return <Table columns={this.columns} data={listings} />;
  }
}

const imageStyling = {
  width: 80,
  height: 100,
  // margin: 10,
  borderRadius: 3,
  border: 3,
  borderColor: "#fff",
  borderStyle: "solid",
};

export default ListingsTable;
