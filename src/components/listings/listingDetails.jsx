import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { getListing } from "../../services/listingService";
import auth from "../../services/authService";

import { Link } from "react-router-dom";
import { Modal } from "./modal";
import { toast } from "react-toastify";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Carousel,
} from "react-bootstrap";
import Spinner from "../spinner";

function getTime(days, startDate) {
  const oneDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  const createdDate = new Date(startDate);

  return (
    days -
    (Math.round(today.getTime() - createdDate.getTime()) / oneDay).toFixed(0)
  );
}

const ListingDetails = (props) => {
  const listingId = props.match.params.id;
  const getListingApi = useApi(getListing);
  const [user, setUser] = useState({});
  const [bidder, setBidder] = useState("owner");
  const [bid, setBid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    setUser(auth.getCurrentUser());
    getListingApi.request(listingId);
  }, []);

  const openModal = (msg) => {
    if (!user) return toast.info("Please login  first ....");

    setMsg(msg);
    setShowModal((prev) => !prev);
  };

  const update = (newBid, newBidder) => {
    setShowModal((prev) => !prev);

    setMsg(false);
    setBid(newBid);
    setBidder(newBidder);
  };

  return (
    <>
      {user && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          listing={getListingApi.data}
          msg={msg}
          update={update}
          user={user}
        />
      )}
      <div className="container" style={{ paddingTop: 70, paddingBottom: 10 }}>
        {getListing.loading && <Spinner />}
        <Link className="btn btn-light my-3" to="/">
          &lt; Go Back
        </Link>
        <Row>
          <Col md={5}>
            <Carousel
              pause="hover"
              className="listing-carousel"
              style={{ backgroundColor: "#70b694" }}
            >
              {getListingApi.data?.images?.map((image, index) => (
                <Carousel.Item key={index}>
                  <Image src={image.url} alt="image" fluid />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush" className="details-box">
              <ListGroup.Item>
                <h3>{getListingApi.data.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Price: Rs. {getListingApi.data.price}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {getListingApi.data.description}
              </ListGroup.Item>
              {getListingApi.data.bidding === "Yes" && (
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={() => {
                      if (!user?.userId)
                        return toast.info("Please login to add bid ....");
                      openModal(false);
                    }}
                  >
                    Add Bit
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="details-box-right">
              <ListGroup variant="flush" className="details-box">
                <ListGroup.Item>
                  <Row>
                    <Col>Bidding:</Col>
                    <Col>
                      <strong>
                        {" "}
                        {getListingApi.data.bidding === "Yes"
                          ? "Available"
                          : "Not Available"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      {getListingApi.data.bidding === "Yes"
                        ? "Highest Bid :"
                        : "Price"}
                    </Col>
                    <Col>
                      <strong>
                        Rs.{bid === 0 ? getListingApi.data.price : bid}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {getListingApi.data.bidding === "Yes" && (
                  <>
                    <ListGroup.Item>
                      <Row>
                        <Col>Highest Bidder:</Col>
                        <Col>
                          {getListingApi.data.bidder === "none" ||
                          getListingApi.data.bidder === null
                            ? bidder
                            : getListingApi.data.bidder}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Time Left:</Col>
                        <Col>{getListingApi.data.days} Days</Col>
                      </Row>
                    </ListGroup.Item>
                  </>
                )}
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    {getTime(
                      getListingApi.data.days,
                      getListingApi.data.createdAt
                    ) <= 0 ? (
                      <Col>
                        SOLD (
                        {getListingApi.data.bidder === "none" ||
                        getListingApi.data.bidder === null
                          ? bidder
                          : getListingApi.data.bidder}
                        )
                      </Col>
                    ) : (
                      <Col>In Stock</Col>
                    )}
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={() => {
                      if (!user?.userId)
                        return toast.info(
                          "Please login to contact the seller...."
                        );
                      openModal(true);
                    }}
                  >
                    Contact Seller
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ListingDetails;
