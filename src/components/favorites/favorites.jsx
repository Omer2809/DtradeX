import React, { Component } from "react";
import { toast } from "react-toastify";

// import { GlobalContainer } from "./common";
import { Pagination, getCurrentPage, getPagedData } from "../common/pagination";
import FavoritesTable from "./favoritesTable";
import favoritesApi from "../../services/favoriteService";
import Spinner from "../common/spinner";
import GlobalContainer from "../common/tableFolder/globalContainer";

import Header from "../common/tableFolder/header";


class Favorites extends Component {
  state = {
    favorites: [],
    currentPage: 1,
    pageSize: 4,
    numberOfPageButtons: 8,
    sortColumn: { path: "title", order: "desc" },
    loading: false,
    // showModal: false,
    // member: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { data: favorites } = await favoritesApi.getMyFavorites();
    console.log(favorites);
    this.setState({ favorites, loading: false });
  }

  handleDelete = async (favorite) => {
    const originaFavorites = this.state.favorites;
    const favorites = originaFavorites.filter((l) => l._id !== favorite._id);

    const currentPage = getCurrentPage(
      favorites,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ favorites, currentPage });

    try {
      await favoritesApi.deleteFavorite(favorite._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This favorite has already been deleted.");

      this.setState({ favorites: originaFavorites });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  // handleModalShow = (member) => {
  //   this.setState({ member, showModal: true });
  // };

  // closeModalHandler = () => {
  //   this.setState({ showModal: false });
  // };

  render() {
    const path = this.props.location.pathname;
    const {
      pageSize,
      currentPage,
      numberOfPageButtons,
      // sortColumn,
      loading,
    } = this.state;
    const { totalCount, data: favorites } = getPagedData(
      this.state,
      this.state.favorites,
      path
    );

    return (
      <>
        <GlobalContainer>
          <div className="col">
            <Header
              name={"Bookmark"}
              totalCount={totalCount}
              noAddButton={"true"}
            />

            <FavoritesTable
              favorites={favorites}
              // sortColumn={sortColumn}
              onDelete={this.handleDelete}
              // onSort={this.handleSort}
              // onModalShow={this.handleModalShow}
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
      </>
    );
  }
}

export default Favorites;
