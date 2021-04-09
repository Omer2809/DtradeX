import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import auth from "../../services/authService";
import Table from "../common/tableFolder/table";
import { ModalButton } from "../styles/styledButtons";
import noImage from "../images/noimage.png";

class MembersTable extends Component {
  columns = [
    {
      key: "img",
      content: (member) => (
        <ModalButton onClick={() => this.props.onModalShow(member)}>
          <img
            className="imaage"
            src={member.image || noImage}
            alt={member.name}
            style={imageStyling}
          />
        </ModalButton>
      ),
    },
    {
      label: "Name",
      key: "show",
      content: (member) => (
        <ModalButton onClick={() => this.props.onModalShow(member)}>
          {member.name}
        </ModalButton>
      ),
    },
    { path: "phone", label: "Contact No" },
    { path: "plan_start_date", label: "Start date", date: true },
    { path: "plan_end_date", label: "End date", date: true },
    {
      label: "Plan",
      key: "plan",
      content: (member) => (
        <Tippy
          arrow={false}
          content={<span> Amount : {member.plan.amount}</span>}
        >
          <p style={{ marginBottom: 0 }}>{member.plan.name}</p>
        </Tippy>
      ),
    },
    { path: "fpId", label: "FPID" },
    // {
    //   key: "edit",
    //   content: (member) => (
    //     <Link to={`/members/${member._id}`} style={{ color: "green" }}>
    //       <FaEdit />
    //     </Link>
    //   ),
    // },
  ];

  editColumn ={
      key: "edit",
      content: (member) => (
        <Link to={`/members/${member._id}`} style={{ color: "green" }}>
          <FaEdit />
        </Link>
      ),
    };

  deleteColumn = {
    key: "delete",
    content: (member) => (
      <button
        onClick={() => {
          if (window.confirm("Are you sure to delete this record?")) {
            this.props.onDelete(member);
          }
        }}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor(props) {
    super(props);
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    // console.log(this.props);
    // if (!this.props.inactive)
   this.columns.push(this.editColumn);
  }
  
  render() {
    const { members, onSort, sortColumn,inactive } = this.props;
    // if (!this.props.inactive) this.columns.push(this.editColumn);
    
    // console.log(this.props.inactive);

    return (
      <Table
        columns={this.columns}
        data={members}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

const imageStyling = {
  width: 80,
  height:100,
  // margin: 10,
  borderRadius: 3,
  border: 3,
  borderColor: "#fff",
  borderStyle: "solid",
};

export default MembersTable;
