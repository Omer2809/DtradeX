import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

// import auth from "../../services/authService";
import Table from "../common/tableFolder/table";
// import { ModalButton } from "../styles/styledButtons";
import noImage from "../common/noimage.png";

class FavoritesTable extends Component {
  columns = [
    {
      key: "img",
      content: (favorite) => (
        // <ModalButton onClick={() => this.props.onModalShow(member)}>
        <Link to={`/listing/details/${favorite.listing._id}`}>
          <img
            className="imaage"
            src={favorite.listing.images[0].url || noImage}
            alt={favorite.listing.title}
            style={imageStyling}
          />
        </Link>
        // </ModalButton>
      ),
    },
    // {
    //   label: "Title",
    //   key: "show",
    //   content: (favorite.listing) => (
    //     // <ModalButton onClick={() => this.props.onModalShow(favorite.listing)}>
    //     <div>{favorite.listing.title}</div>
    //     //  {/* </ModalButton> */}
    //   ),
    // },
    { path: "listing.title", label: "Title" },
    { path: "listing.price", label: "Price" },
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
      key: "delete",
      content: (favorite) => (
        <button
          onClick={() => {
            if (window.confirm("Are you sure to delete this record?")) {
              this.props.onDelete(favorite);
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
    const { favorites, onSort, sortColumn } = this.props;
    // if (!this.props.inactive) this.columns.push(this.editColumn);

    // console.log(this.props.inactive);

    return (
      <Table
        columns={this.columns}
        data={favorites}
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

export default FavoritesTable;
