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
     
        <Link className="btn btn-light my-3" to="/">
          &lt; Go Back
        </Link>
        
        {getListingApi.loading ? <Spinner /> :
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
                  Price:{" "} <strong>&#8377; {getListingApi.data.price}</strong>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: <strong>{getListingApi.data.description}</strong>
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
                          &#8377; {bid === 0 ? getListingApi.data.price : bid}
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
                            <strong>
                              {getListingApi.data.bidder === "none" ||
                                getListingApi.data.bidder === null
                                ? bidder
                                : getListingApi.data.bidder}{" "}
                            </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Time Left:</Col>
                          <Col>
                            <strong>{getListingApi.data.days} Days </strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {getTime(
                          getListingApi.data.days,
                          getListingApi.data.createdAt
                        ) <= 0 ? (
                          <strong>
                            SOLD (
                            {getListingApi.data.bidder === "none" ||
                              getListingApi.data.bidder === null
                              ? bidder
                              : getListingApi.data.bidder}
                          ){" "}
                          </strong>
                        ) : (
                          <strong>In Stock </strong>
                        )}
                      </Col>
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
          </Row>}
      </div>
    </>
  );
};

export default ListingDetails;
