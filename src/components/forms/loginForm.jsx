import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form/form";
import auth from "../../services/authService";
import { Container, FormWrap } from "../styledComponents/FormStyling";
import { toast } from "react-toastify";
import Spinner from "../spinner";

import loginWebp from "../../images/login.webp";
import loginWebp2 from "../../images/login@2x.webp";
import loginJpg from "../../images/login.jpg";
import loginJpg2 from "../../images/login@2x.jpg";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},

    loading: false,
    saving: false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      toast.info("Authenticating user...");
      this.setState({ loading: true, saving: true });
      const { data } = this.state;
      await auth.login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }

      this.setState({ loading: false, saving: false });
    }
  };

  render() {
    if (auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <Container>
        {this.state.loading ? (
          <Spinner saving={this.state.saving} reg log />
        ) : (
          <>
            <FormWrap>
              <div className="grid grid--1x2">
                <div className="sign--form">
                  <h1>Login</h1>
                  <p>It's free and only takes a minute</p>
                  <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", "email")}
                    {this.renderInput("password", "Password", "password")}
                    {this.renderButton("Login")}
                    {this.renderBottomText("Login")}
                  </form>
                </div>
                <picture className="sign__image">
                  <source
                    type="image/webp"
                    srcSet={`${loginWebp} 1x,${loginWebp2}  2x`}
                  />

                  <source
                    type="image/jpg"
                    srcSet={`${loginJpg} 1x,${loginJpg2}  2x`}
                  />
                  <img
                    className="hero__image"
                    src={loginJpg}
                    alt="shop cart login image"
                  />
                </picture>
              </div>
            </FormWrap>
            {this.renderFormFooter("Don't", "Sign Up")}
          </>
        )}
      </Container>
    );
  }
}

export default LoginForm;
