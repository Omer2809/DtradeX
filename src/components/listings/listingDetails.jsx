import React, { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { getListing } from "../../services/listingService";
import auth from "../../services/authService";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "../common/modal";
import { toast } from "react-toastify";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Carousel,
  Form,
} from "react-bootstrap";
import ProductCarousel from "../common/productCarousel";
import Spinner from "../common/spinner";

// const Button = styled.button`
//   min-width: 100px;
//   padding: 16px 32px;
//   border-radius: 4px;
//   border: none;
//   background: #141414;
//   color: #fff;
//   font-size: 24px;
//   cursor: pointer;
// `;

function getTime(days, startDate) {
  const oneDay = 1000 * 60 * 60 * 24;
  const today = new Date();
  const createdDate = new Date(startDate);

  // console.log();
  return (
    days -
    (Math.round(today.getTime() - createdDate.getTime()) / oneDay).toFixed(0)
  );
}

const ListingDetails = (props) => {
  const listingId = props.match.params.id;
  const getListingApi = useApi(getListing);
  const [user, setUser] = useState({});
  const [bidder, setBidder] = useState("none");
  const [bid, setBid] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    setUser(auth.getCurrentUser());
    getListingApi.request(listingId);
    // console.log()
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

  // handleModalShow = (member) => {
  //   // this.setState({ member, showModal: true });
  // };

  // closeModalHandler = () => {
  //   // this.setState({ showModal: false });
  // };

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

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
      {console.log(getListingApi.data)}
      <div className="container" style={{ paddingTop: 70 }}>
        {getListing.loading && <Spinner />}
        <Link className="btn btn-light my-3" to="/">
          &lt; Go Back
        </Link>
        <Row>
          <Col md={5}>
            {/* <Image
              src={
                getListingApi.data?.images &&
                getListingApi.data?.images.length !== 0 &&
                getListingApi.data?.images[0].url
              }
              alt={getListingApi.data.title}
              fluid
              // style={{ height: 500 }}
            /> */}
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
            <ListGroup variant="flush">
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
                    onClick={() => openModal(false)}
                  >
                    Add Bit
                  </Button>
                </ListGroup.Item>
              )}{" "}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
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
                          {getListingApi.data.bidder
                            ? getListingApi.data.bidder
                            : bidder}
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
                      <Col>SOLD ({getListingApi.data.bidder})won</Col>
                    ) : (
                      <Col>In Stock</Col>
                    )}
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={() => openModal(true)}
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

//   return (
//     <>
//       {user && (
//         <Modal
//           showModal={showModal}
//           setShowModal={setShowModal}
//           listing={getListingApi.data}
//           msg={msg}
//           update={update}
//           user={user}
//         />
//       )}
//       <section className="single-product">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-5">
//               {/* <ProductCarousel products={getListingApi.data}/> */}
//             </div>

//             <div className="col-md-7">
//               <p className="new-arrival text-center">NEW</p>
//               <h2>{getListingApi.data.title} - Blue Color</h2>
//               <p>Product Code: IRSC2019</p>

//               {/* <p className="price">{getListingApi.data.price}</p> */}
//               <p>
//                 <b>
//                   {getListingApi.data.bidding === "Yes"
//                     ? "Highest Bid :"
//                     : "Price"}
//                 </b>{" "}
//                 Rs.{bid === 0 ? getListingApi.data.price : bid}
//               </p>
//               {getListingApi.data.bidding === "Yes" && (
//                 <>
//                   {getTime(
//                     getListingApi.data.days,
//                     getListingApi.data.createdAt
//                   ) <= 0 && (
//                     <p style={{ fontSize: 50 }}>
//                       SOLD {getListingApi.data.bidder}Omer won
//                     </p>
//                   )}
//                   <p>
//                     <b>Highest Bidder:</b>
//                     {bidder === "none" ? getListingApi.data.bidder : bidder}
//                   </p>
//                   <p style={{ fontSize: 14 }}>
//                     <b>
//                       {" "}
//                       {getTime(
//                         getListingApi.data.days,
//                         getListingApi.data.createdAt
//                       )}{" "}
//                       days left
//                     </b>
//                   </p>{" "}
//                 </>
//               )}

//               {console.log(getListingApi.data.bidding)}
//               {console.log(user)}

//               {/* <ContactSellerForm listing={listing} btnName="Contact  Seller" /> */}
//               {/* {getListingApi.data.added_by &&
//                 (!user || user.userId !== getListingApi.data.added_by._id) && (
//                   <>
//

//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={() => openModal(true)}
//                     >
//                       Contact Seller
//                     </button>
//                   </>
//                 )} */}
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={() => openModal(true)}
//               >
//                 Contact Seller
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="product-description">
//         <div className="container">
//           <h6>Product Description</h6>
//           <p>{getListingApi.data.description}</p>
//           <p>
//             Subscribe Easy Tutorial YouTube Channel to watch more videos and
//             press the bell icon to get immediate notofications Subscribe Easy
//             Tutorial YouTube Channel to watch more videos and press the bell
//             icon to get immediate notofications Subscribe Easy Tutorial YouTube
//             Channel to watch more videos and press the bell icon to get
//             immediate notofications Subscribe Easy Tutorial YouTube Channel to
//             watch more videos and press the bell icon to get immediate
//             notofications{" "}
//           </p>

//           <hr />
//         </div>{" "}
//       </section>
//     </>
//   );
// };

export default ListingDetails;
