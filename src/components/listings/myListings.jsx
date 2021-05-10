import React, { Component } from "react";
import { toast } from "react-toastify";

// import { GlobalContainer } from "./common";
import { Pagination, getCurrentPage, getPagedData } from "../common/pagination";
import { getMyListings, deleteListing } from "../../services/listingService";
import Spinner from "../common/spinner";
import GlobalContainer from "../common/globalContainer";
import ListingsTable from "./listingsTable";
import Header from "../common/header";
// import { Header } from "antd/lib/layout/layout";
// import { getLocalData, setLocalData } from "../common/localStorage";
// import "../styles/styledTable.css";
// import { Modal } from "../modal";

class MyListings extends Component {
  state = {
    listings: [],
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
    const { data: listings } = await getMyListings();
    console.log(listings);
    this.setState({ listings, loading: false });
  }

  handleDelete = async (listing) => {
    const originalListings = this.state.listings;
    const listings = originalListings.filter((l) => l._id !== listing._id);

    const currentPage = getCurrentPage(
      listings,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ listings, currentPage });

    try {
      await deleteListing(listing._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This listing has already been deleted.");

      this.setState({ listings: originalListings });
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
      sortColumn,
      loading,
    } = this.state;
    const { totalCount, data: listings } = getPagedData(
      this.state,
      this.state.listings,
      path
    );

    return (
      <>
        <GlobalContainer>
          <div className="col">
            <Header
              name={"Listing"}
              totalCount={totalCount}
              url={"/listings/new"}
            />

            <ListingsTable
              listings={listings}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
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

export default MyListings;
