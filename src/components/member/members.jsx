import React, { Component } from "react";
import { toast } from "react-toastify";

import {
  GlobalContainer,
  Header,
  ListGroup,
  SearchBox,
} from "../common/Details";
import { Pagination, getCurrentPage, getPagedData } from "../common/pagination";
import MembersTable from "./membersTable";
import { getMembers, deleteMember } from "../../services/memberService";
import { getPlans } from "../../services/planService";
import { getLocalData, setLocalData } from "../common/localStorage";
import "../styles/styledTable.css";
import Spinner from "../common/Spinner";
import { Modal } from "../modal";

class Members extends Component {
  state = {
    members: [],
    plans: [],
    currentPage: 1,
    pageSize: 4,
    numberOfPageButtons: 8,
    searchQuery: "",
    numberSearchQuery: "",
    planEndSearchQuery: "",
    fpIdSearchQuery: "",
    selectedPlan: null,
    // sortColumn: { path: "name", order: "asc" },
    sortColumn: { path: "createdAt", order: "desc" },
    loading: false,
    showModal: false,
    member: {},
  };

  async componentDidMount() {
    const { localPlans, localmembers } = getLocalData();

    if (localmembers.length === 0) {
      this.setState({ loading: true });
    } else {
      this.setState({ plans: localPlans, members: localmembers });
    }

    // console.log(this.props.location.pathname);

    const { data } = await getPlans();
    const plans = [{ _id: "", name: "All Plans" }, ...data];

    const { data: members } = await getMembers();
    this.setState({ members, plans, loading: false });

    setLocalData(plans, members);
  }

  handleDelete = async (member) => {
    const originalMembers = this.state.members;
    const members = originalMembers.filter((m) => m._id !== member._id);

    const currentPage = getCurrentPage(
      members,
      this.state.currentPage,
      this.state.pageSize
    );

    this.setState({ members, currentPage });

    try {
      await deleteMember(member._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This member has already been deleted.");

      this.setState({ members: originalMembers });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handlePlanSelect = (plan) => {
    this.setState({
      selectedPlan: plan,
      searchQuery: "",
      numberSearchQuery: "",
      planEndSearchQuery: "",
      fpIdSearchQuery: "",
      currentPage: 1,
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedPlan: null, currentPage: 1 });
  };

  handleFpIdSearch = (query) => {
    this.setState({
      fpIdSearchQuery: query,
      selectedPlan: null,
      currentPage: 1,
    });
  };

  handleNumberSearch = (query) => {
    this.setState({
      numberSearchQuery: query,
      selectedPlan: null,
      currentPage: 1,
    });
  };

  handlePlanEndSearch = (query) => {
    this.setState({
      planEndSearchQuery: query,
      selectedPlan: null,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleModalShow = (member) => {
    this.setState({ member, showModal: true });
  };

  getActivePlans = (plans) => {
    return plans.filter((p) => p.isActive !== false);
  };

  closeModalHandler = () => {
    this.setState({ showModal: false });
  };

  render() {
    const path = this.props.location.pathname;
    const {
      pageSize,
      currentPage,
      numberOfPageButtons,
      sortColumn,
      searchQuery,
      numberSearchQuery,
      planEndSearchQuery,
      fpIdSearchQuery,
      loading,
      showModal,
      member,
    } = this.state;
    const { totalCount, data: members } = getPagedData(
      this.state,
      this.state.members,
      path
    );

    return (
      <>
        {showModal && (
          <div>
            <div onClick={this.closeModalHandler} className="back-drop"></div>
            <Modal
              show={showModal}
              member={member}
              close={this.closeModalHandler}
            />
          </div>
        )}
        <GlobalContainer>
          {/* <div className="col-3" style={{ color: "#333" }}>
            <ListGroup
              items={this.getActivePlans(this.state.plans)}
              selectedItem={this.state.selectedPlan}
              onItemSelect={this.handlePlanSelect}
            />
          </div> */}
          <div className="col">
            <Header
              name={
                path === "/inactive-members"
                  ? "Inactive Member"
                  : "Member"
              }
              totalCount={totalCount}
              url={"/members/new"}
              noAddButton={path === "/inactive-members"}
            />

            <div style={{ display: "flex" }}>
              <SearchBox
                value={searchQuery}
                onChange={this.handleSearch}
                placeholder={"Search Name..."}
              />
              <SearchBox
                value={numberSearchQuery}
                onChange={this.handleNumberSearch}
                placeholder={"Search Number..."}
              />
              <SearchBox
                value={planEndSearchQuery}
                onChange={this.handlePlanEndSearch}
                placeholder={"Plan End Date..."}
              />
              <SearchBox
                value={fpIdSearchQuery}
                onChange={this.handleFpIdSearch}
                placeholder={"Search FPID..."}
              />
            </div>
            <MembersTable
              members={members}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
              onModalShow={this.handleModalShow}
              inactive={path === "/inactive-members"}
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

export default Members;
