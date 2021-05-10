import React, { useEffect, useState } from "react";
import useApi from "./hooks/useApi";
import { getListings } from "../services/listingService";
import auth from "../services/authService";
import "./style.css";
import Card from "./common/card";
import ProductCarousel from "./common/productCarousel";
import Spinner from "./common/spinner";
import SearchBar from "./common/SearchBar";

import { GoTop } from "./mystyle/Styledgotopbtn";
import FontAwesome from "react-fontawesome";
import Footer from "./footerr";

const Home = () => {
  const getListingsApi = useApi(getListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    setUser(auth.getCurrentUser());
    getListingsApi.request();
  }, []);

  const canShow = (product, query) => {
    console.log(product, query);
    return (
      query === "" ||
      product?.price?.toString()?.startsWith(query) ||
      product?.title?.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  return (
    <section className="new-products" style={{ paddingTop: 80 }}>
      <div className="container">
        <ProductCarousel products={getListingsApi.data.slice(0, 3)} />
        <div id="gotop">
          <SearchBar callback={setSearchQuery} />
        </div>
        <GoTop to="gotop">
          <FontAwesome className="fa-arrow-up fa-2x" name="arrow" />
        </GoTop>
        <div className="title-box" style={{ marginTop: 20 }}>
          <h2>New Arrivals</h2>
        </div>
        {getListingsApi.loading && <Spinner />}
        <div className="listings" style={{ paddingBottom: 10 }}>
          {console.log(getListingsApi.data, getListingsApi.loading)}
          {getListingsApi.data?.length !== 0 &&
            getListingsApi.data
              .filter((product) => {
                if (canShow(product, searchQuery)) return product;
              })
              .slice(0, visible)
              .map((listing, index) => (
                <Card key={index} listing={listing} userId={user?.userId} />
              ))}
        </div>
        {visible < getListingsApi.data?.length && (
          <div className="text-center mt-5 mb-5">
            <button
              onClick={() => setVisible(visible + 8)}
              className="btn btn-primary load-more"
            >
              Load More
            </button>
          </div>
        )}
      </div>
      <Footer user={user} />
    </section>
  );
};

export default Home;
