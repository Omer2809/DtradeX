import React, { Component } from "react";

import auth from "../../services/authService";
import Table from "../common/tableFolder/table";

class UsersTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    { path: "phone", label: "Contact No" },
    { path: "email", label: "Email" },
  ];

  deleteColumn = {
    key: "delete",
    content: (user) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => {
          if (window.confirm("Are you sure to delete this record?")) {
            this.props.onDelete(user);
          }
        }}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
