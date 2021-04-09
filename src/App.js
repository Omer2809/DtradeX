import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/sidebar/Navbar";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import Leads from "./components/lead/leads";
import Plans from "./components/plan/plans";
import Members from "./components/member/members";
import Users from "./components/user/users";
import Report from "./components/reportModule/report";

import LoginForm from "./components/loginForm";
import RegisterForm from "./components/user/registerForm";
import PlanForm from "./components/plan/planForm";
import LeadForm from "./components/lead/leadForm";
import MemberForm from "./components/member/memberForm";

import Logout from "./components/logout";
import NotFound from "./components/notFound";

import "./App.css";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

import { ShowcaseContainer } from "./components/styles/showcaseContainer";
import GoToHome from "./components/GoToHome";

// http://localhost:3000

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <ShowcaseContainer>
          {user ? (
            <>
              <Navbar user={user} />
              <Switch>
                <Route path="/members/:id" component={MemberForm} />
                <Route path="/members" component={Members} />
                <Route path="/inactive-members" component={Members} />
                <Route path="/leads/:id" component={LeadForm} />
                <Route path="/leads" component={Leads} />
                <Route path="/logout" component={Logout} />
                <Route path="/not-found" component={NotFound} />
                <ProtectedRoute path="/plans/:id" component={PlanForm} />
                <ProtectedRoute path="/plans" component={Plans} />
                <ProtectedRoute path="/register" component={RegisterForm} />
                <ProtectedRoute path="/users" component={Users} />
                <ProtectedRoute path="/report" component={Report} />
                <Route exact path="/" component={Dashboard} />
                <Redirect to="/not-found" />
              </Switch>
              <GoToHome />
            </>
          ) : (
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/not-found" component={NotFound} />
              <Route  path="/" component={Home} />
              <Redirect to="/not-found" />
            </Switch>
          )}
        </ShowcaseContainer>
      </>
    );
  }
}

export default App;
