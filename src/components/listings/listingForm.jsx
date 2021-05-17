import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";

import Form from "../common/form/form";
import { getCategories } from "../../services/categoryService";
import UploadPictures from "../common/picture/uploadPictures";
import OldPictureDisplay from "../common/picture/oldPictureDisplay";
import {
  getListing,
  saveListing,
  editListing,
} from "../../services/listingService";
import auth from "../../services/authService";

import Spinner from "../common/spinner";
import FormContainer from "../forms/formContainer";

function getImageUrl(image) {
  return image.url;
}

class ListingForm extends Form {
  state = {
    data: {
      title: "",
      price: "",
      days: "30",
      description: "",
      categoryId: "",
      bidding: "",
    },
    images: [],
    oldImages: [],
    categories: [],
    biddingOptions: [
      { _id: "Yes", label: "Yes" },
      { _id: "No", label: "No" },
    ],
    errors: {},
    oldImagesCount: 0,
    loading: false,
    saving: false,
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(1).label("Title"),
    price: Joi.number().required().min(1).max(100000).label("Price"),
    days: Joi.number().label("No of days"),
    description: Joi.string().required().label("Description"),
    categoryId: Joi.string().required().label("Category"),
    bidding: Joi.string().required().label("Bidding"),
  };

  async populateCategories() {
    try {
      const { data: categories } = await getCategories();
      this.setState({ categories });
    } catch {
      this.setState({ loading: false });
      toast.error("can't get categories...");
    }
  }

  async populateListing() {
    try {
      const listingId = this.props.match.params.id;
      if (listingId === "new") {
        this.setState({
          data: {
            title: "",
            price: "",
            days: "30",
            description: "",
            categoryId: "",
            bidding: "",
          },
        });
        return;
      }

      this.setState({ loading: true });
      const { data: listing } = await getListing(listingId);
      console.log(listing.images);
      this.setState({
        data: this.mapToViewModel(listing),
        oldImages: listing.images,
        oldImagesCount: listing.images.length,
        loading: false,
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    const listingId = this.props.match.params.id;
    if (listingId !== "new") this.setState({ loading: true });

    await this.populateCategories();
    await this.populateListing();
  }

  mapToViewModel(listing) {
    return {
      _id: listing._id,
      title: listing.title,
      price: listing.price,
      days: listing.days,
      description: listing.description,
      categoryId: listing.categoryId._id,
      bidding: listing.bidding,
    };
  }

  doSubmit = async () => {
    try {
      const {
        title,
        price,
        categoryId,
        description,
        bidding,
        days,
        bidder,
        _id,
      } = this.state.data;

      const { images, oldImagesCount } = this.state;

      let data = new FormData();

      data.append("title", title);
      data.append("price", price);
      data.append("categoryId", categoryId);
      data.append("description", description);
      data.append("userId", auth.getCurrentUser().userId);
      data.append("bidding", bidding);

      if (days) data.append("days", days);
      if (bidder) data.append("bidder", bidder);

      if (images.length === 0 && oldImagesCount === 0)
        return alert("Please select atleast one image...!!");

      images.forEach((image) =>
        data.append("images", image.originFileObj, image.originFileObj.name)
      );

      this.setState({ loading: true, saving: true });

      if (_id) {
        if (oldImagesCount > 0)
          data.append(
            "oldImages",
            JSON.stringify(this.state.oldImages.map(getImageUrl))
          );

        await editListing(data, _id);
        toast.info("editing...");
      } else {
        await saveListing(data);
        toast.info("adding...");
      }

      this.setState({ loading: false, saving: false });
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.warn(ex.response.data);
      }
      toast.warn(ex);
      //   this.setState({ loading: false, saving: false });
    }
  };

  setImages = (images) => {
    this.setState({ images });
    console.log("images", this.state.images);
  };

  handleImageDelete = (image) => {
    const images = this.state.oldImages;
    const oldImages = images.filter((i) => i.url !== image.url);

    this.setState({ oldImages, oldImagesCount: this.state.oldImagesCount - 1 });
  };

  render() {
    return (
      <FormContainer name={"Product"} url={"/my-listings"} member>
        {this.state.loading ? (
          <Spinner form saving={this.state.saving} />
        ) : (
          <form onSubmit={this.handleSubmit}>
            {/* <h1>Add New Product</h1> */}
            {/* <p>It's free and only takes a minute</p> */}
            <div style={{ display: "flex" }}>
              {this.state.oldImages.map((image, index) => (
                <OldPictureDisplay
                  image={image}
                  key={index}
                  onDelete={this.handleImageDelete}
                />
              ))}
              <UploadPictures
                uploadImages={this.setImages}
                count={this.state.oldImagesCount}
              />
            </div>
            {this.renderInput("title", "Title")}
            {this.renderInput("price", "Price")}
            {/* {console.log(this.state.categories)} */}
            {this.renderSelect("categoryId", "Category", this.state.categories)}
            {this.renderSelect("bidding", "Bidding", this.state.biddingOptions)}
            {this.state.data.bidding === "Yes" &&
              this.renderInput("days", "No. of Days")}
            {this.renderTextArea("description", "Description")}
            {this.renderButton("Save")}
          </form>
        )}
      </FormContainer>
    );
  }
}

export default ListingForm;
