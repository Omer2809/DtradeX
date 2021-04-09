import React, { Component } from "react";
import { toast } from "react-toastify";

import {
  GlobalContainer,
  Header,
  SearchBox,
} from "../common/Details";
import UsersTable from "./usersTable";
import {
  Pagination,
  getCurrentPage,
  getPagedData,
} from "../common/pagination";
import { getUsers, deleteUser } from "../../services/userService.js";
import Spinner from "../common/Spinner";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 4,
    numberOfPageButtons: 7,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
    loading:true,
  };

  async componentDidMount() {
    this.setState({ loading:true });
    const { data: users } = await getUsers();
    this.setState({ users,loading:false });
  }

  handleDelete = async (user) => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter((l) => l._id !== user._id);

    const currentPage = getCurrentPage(
      users,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ users, currentPage });

    try {
      await deleteUser(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted.");

      this.setState({ users: originalUsers });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };


  render() {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      numberOfPageButtons,
      loading
    } = this.state;

    const { totalCount, data: users } = getPagedData(this.state,this.state.users);
    ;

    return (
      <GlobalContainer>
        <div className="col">
          <Header name={"User"} totalCount={totalCount} url={"/register"} />
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          {loading && <Spinner />}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            numberOfButtons={numberOfPageButtons}
            onPageChange={this.handlePageChange}
          />
        </div>
      </GlobalContainer>
    );
  }
}

export default Users;
