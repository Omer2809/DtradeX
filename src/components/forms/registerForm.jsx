import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";
import * as userService from "../../services/userService";
import auth from "../../services/authService";
import { Container, FormWrap } from "../styles/FormStyling";
import { toast } from "react-toastify";
import Spinner from "../common/spinner";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
    loading: false,
  };

  schema = {
    name: Joi.string().required().min(3).label("Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true });
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      // this.setState({ loading: false });
      window.location = "/";
      toast.success("New Account Created...");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        toast.info(`${errors.email}`);
        this.setState({ errors });
      }
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        {this.state.loading ? (
          <Spinner reg />
        ) : (
          <>
            <FormWrap>
              <h1>Sign Up</h1>
              <p>It's free and only takes a minute</p>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "Name")}
                {this.renderInput("email", "Email", "email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("SignUp")}
                {this.renderBottomText("SignUp")}
              </form>
            </FormWrap>
            {this.renderFormFooter("Already", "Login")}
          </>
        )}
      </Container>
    );
  }
}

export default RegisterForm;
