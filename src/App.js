import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
//Bootstrap and jQuery libraries
import "bootstrap/dist/css/bootstrap.min.css";
//Image upload modules
import "antd/dist/antd.css";
import "./App.css";

import Home from "./components/welcomeHome/home";
import LoginForm from "./components/forms/loginForm";
import RegisterForm from "./components/forms/registerForm";
import Navbar from "./components/sidebar/Navbar";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

import { ListingForm, MyListings, ListingDetails } from "./components/listings";
import Favorites from "./components/favorites/favorites";
import Messages from "./components/messages/messages";

import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import ScrollToTop from "./components/ScrollToTop";

import backgroundImage from "./images/bg1.png";

const ShowcaseContainer = styled.div`
  /* background: #c6f6d5cc; */
  background: url(${backgroundImage}) no-repeat ;
  background-size:cover;
  min-height: 100vh;
  width: 100%;

`;

function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(auth.getCurrentUser());
  }, []);

  return (
    <>
      <ShowcaseContainer>
        <ScrollToTop />
        <ToastContainer />
        <Navbar user={user} />
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <ProtectedRoute path="/my-listings" component={MyListings} />
          <ProtectedRoute
            path="/messages"
            render={(props) => <Messages {...props} user={user} />}
          />
          <ProtectedRoute path="/favorites" component={Favorites} />
          <ProtectedRoute path="/listings/:id" component={ListingForm} />
          <Route path="/listing/details/:id" component={ListingDetails} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} exact />
          <Redirect to="/not-found" />
        </Switch>
      </ShowcaseContainer>
    </>
  );
}

export default App;
