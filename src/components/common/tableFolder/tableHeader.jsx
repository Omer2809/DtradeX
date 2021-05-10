import React, { Component } from "react";

// columns: array
// sortcolumn: object
// onSort: function

class TableHeader extends Component {
  // raiseSort = path => {
  //   const sortcolumn = { ...this.props.sortcolumn };
  //   if (sortcolumn.path === path)
  //     sortcolumn.order = sortcolumn.order === "asc" ? "desc" : "asc";
  //   else {
  //     sortcolumn.path = path;
  //     sortcolumn.order = "asc";
  //   }
  //   this.props.onSort(sortcolumn);
  // };

  // renderSortIcon = column => {
  //   const { sortcolumn } = this.props;

  //   if (column.path !== sortcolumn.path) return null;
  //   if (sortcolumn.order === "asc") return <i className="fa fa-sort-asc" />;
  //   return <i className="fa fa-sort-desc" />;
  // };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              // className="clickable"
              key={column && (column.path || column.key)}
              // onClick={() => this.raiseSort(column.path)}
            >
              {column && column.label}
              {/* {this.renderSortIcon(column)} */}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
