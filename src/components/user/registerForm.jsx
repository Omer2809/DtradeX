import React from "react";
import Joi from "joi-browser";
import Form from "../common/form/form";
import * as userService from "../../services/userService";
import { Container, FormWrap } from "../styles/styledFormComponents";
import { toast } from "react-toastify";
import Spinner from "../common/Spinner";

class RegisterForm extends Form {
  state = {
    data: { name: "", isAdmin: "", phone: "", email: "", password: "" },
    rules: [
      { _id: true, name: "Yes" },
      { _id: false, name: "No" },
    ],
    errors: {},
    loading: false,
    saving: false,
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(5).label("Password"),
    isAdmin: Joi.boolean().required().label("isAdmin"),
    name: Joi.string().required().min(4).label("Name"),
    phone: Joi.string().required().min(5).label("Contact No"),
  };

  doSubmit = async () => {
    try {
      this.setState({ loading: true, saving: true });
      await userService.register(this.state.data);
      this.setState({ loading: false, saving: false });

      this.props.history.push("/users");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        toast.info(`${errors.email}`);
        this.setState({ errors });
      }
      this.setState({ loading: false, saving: false });
    }
  };

  render() {
    return (
      <Container>
        {" "}
        {this.state.loading ? (
          <Spinner saving={this.state.saving} reg />
        ) : (
          <FormWrap>
            <h1>Add User</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("name", "Name")}
              {this.renderInput("phone", "Contact No")}
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderSelect("isAdmin", "isAdmin", this.state.rules)}
              {this.renderButton("Save")}
            </form>
          </FormWrap>
        )}
      </Container>
    );
  }
}

export default RegisterForm;
