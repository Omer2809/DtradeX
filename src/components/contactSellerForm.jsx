import React from "react";
// import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import { Container, FormWrap } from "./mystyle/LoginFormStyling";
import { toast } from "react-toastify";

import messagesApi from "../services/messageService";

class ContactSellerForm extends Form {
  state = {
    data: { message: "" },
    errors: {},
  };

  schema = {
    message: Joi.string().min(1).required().label("Message"),
  };

  doSubmit = async () => {
    try {
      const {
        listing,
        toId,
        user,
        setShowModal,
        setUpdateMessages,
      } = this.props;
      const { data } = this.state;

      console.log("in msg from", data);
      // console.log("in msg from",data.message.trim.length);

      if (data.message.trim().length === 0)
        return toast.warn("plz enter a msg..");

      const toUserId = toId || listing.added_by._id;

      const result = await messagesApi.send(
        data.message,
        listing._id,
        toUserId,
        user.userId
      );
      console.log("in msg", user, result);

      this.setState({ data: { message: "" } });

      if (toId) {
        setUpdateMessages(result.data);
        return;
      }

      setShowModal(false);
      toast.info("Awesome! Your message was sent ...");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.message = ex.response.data;
        this.setState({ errors });
        toast.warn("Could not send the message something went wrong....");
      }
    }
  };
  render() {
    const { toId } = this.props;
    return (
      <>
        {toId ? (
          <form
            onSubmit={this.handleSubmit}
            style={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              justifyContent: "space-between",
            }}
          >
            <div class="mr-3">{this.renderMessageInput("message", "")}</div>
            {this.renderButton(`${this.props.btnName}`)}
          </form>
        ) : (
          <Container>
            {/* <h1>Add Message</h1> */}
            <form onSubmit={this.handleSubmit}>
              {this.renderTextArea("message", "Add Message")}
              {this.renderButton(`${this.props.btnName}`)}
            </form>
          </Container>
        )}
      </>
    );
  }
}

export default ContactSellerForm;
