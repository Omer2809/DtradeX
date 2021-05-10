import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
//Image upload modules
import "antd/dist/antd.css";

import Home from "./components/home";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Navbar from "./components/sidebar/Navbar";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

import "./App.css";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";

// import GoToHome from "./components/GoToHome";
// import NavBar from "./components/navBar";
// import Favorites from "./components/favorites";
import { ListingForm, MyListings, ListingDetails } from "./components/listings";
import Favorites from "./components/favorites/favorites";
import Messages from "./components/messages/messages";
import { ShowcaseContainer } from "./components/mystyle/showcaseContainer";

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
        <ShowcaseContainer>
          <ToastContainer />
          <Navbar user={user} />
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/my-listings" component={MyListings} />
            <Route
              path="/messages"
              render={(props) => <Messages {...props} user={user} />}
            />
            <Route path="/favorites" component={Favorites} />
            <Route path="/listings/:id" component={ListingForm} />
            <Route path="/listing/details/:id" component={ListingDetails} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/logout" component={Logout} />
            <Route path="/" component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </ShowcaseContainer>
      </>
    );
  }
}

export default App;
