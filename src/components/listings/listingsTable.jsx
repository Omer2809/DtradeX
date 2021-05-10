import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import auth from "../../services/authService";
import Table from "../common/tableFolder/table";
// import { ModalButton } from "../styles/styledButtons";
import noImage from "../common/noimage.png";

class ListingsTable extends Component {
  columns = [
    {
      key: "img",
      content: (listing) => (
        // <ModalButton onClick={() => this.props.onModalShow(member)}>
        <Link to={`/listing/details/${listing._id}`}>
          <img
            className="imaage"
            src={listing.images[0].url || noImage}
            alt={listing.title}
            style={imageStyling}
          />
        </Link>
        // </ModalButton>
      ),
    },
    // {
    //   label: "Title",
    //   key: "show",
    //   content: (listing) => (
    //     // <ModalButton onClick={() => this.props.onModalShow(listing)}>
    //     <div>{listing.title}</div>
    //     //  {/* </ModalButton> */}
    //   ),
    // },
    { path: "title", label: "Title" },
    { path: "price", label: "Price" },
    // { path: "plan_start_date", label: "Start date", date: true },
    // {
    //   label: "Plan",
    //   key: "plan",
    //   content: (member) => (
    //     <Tippy
    //       arrow={false}
    //       content={<span> Amount : {member.plan.amount}</span>}
    //     >
    //       <p style={{ marginBottom: 0 }}>{member.plan.name}</p>
    //     </Tippy>
    //   ),
    // },
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

  // editColumn = {
  //   key: "edit",
  //   content: (member) => (
  //     <Link to={`/listings/${member._id}`} style={{ color: "green" }}>
  //       <FaEdit />
  //     </Link>
  //   ),
  // };

  // constructor(props) {
  //   super(props);
  //   const user = auth.getCurrentUser();
  //   if (user) this.columns.push(this.deleteColumn);
  //   // console.log(this.props);
  //   // if (!this.props.inactive)
  //   this.columns.push(this.editColumn);
  // }

  render() {
    const { listings, onSort, sortColumn } = this.props;
    // if (!this.props.inactive) this.columns.push(this.editColumn);

    // console.log(this.props.inactive);

    return (
      <Table
        columns={this.columns}
        data={listings}
        // sortColumn={sortColumn}
        // onSort={onSort}
      />
    );
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
