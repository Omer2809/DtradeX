import React from "react";
// import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "../common/form/form";
import { Container } from "../styles/FormStyling";
import { toast } from "react-toastify";
import { updateListingPrice } from "../../services/listingService";

class BiddingForm extends Form {
  state = {
    data: { bid: "" },
    errors: {},
  };

  schema = {
    bid: Joi.number().required().label("Bid"),
  };

  doSubmit = async () => {
    try {
      
      const { user, listing, update } = this.props;
      const { data } = this.state;
      
      if (data.bid <= listing.price)
      return alert("Bid should be greater than the Highest Bid...!!");
      
      toast.info("Adding bid...");

      await updateListingPrice(listing._id, user.userId, data.bid);

      update(data.bid, user.name);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.bid = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Container>
        {/* <FormWrap> */}
          {/* <h1>Add Bid</h1> */}
          {/* <p>It's free and only takes a minute</p> */}
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("bid", "Add Bid")}
            {this.renderButton("Place Bid")}
          </form>
        {/* </FormWrap> */}
      </Container>
    );
  }
}

export default BiddingForm;
