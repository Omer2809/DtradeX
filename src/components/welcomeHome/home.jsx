import React, { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";

import auth from "../../services/authService";
import { getListings } from "../../services/listingService";
import useApi from "../hooks/useApi";

import ProductCarousel from "./productCarousel";
import SearchBar from "./SearchBar";
import Card from "./card";
import Footer from "./footerr";
import Spinner from "./spinner";

import "./style.css";
import { GoTop } from "../styles/Styledgotopbtn";

const Home = () => {
  const getListingsApi = useApi(getListings);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(8);

  const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem("localProducts");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    setUser(auth.getCurrentUser());
    getListingsApi.request();

    // console.log(getListingsApi.data, products);
    if (getListingsApi.data?.length !== 0) {
      localStorage.setItem(
        "localProducts",
        JSON.stringify(getListingsApi.data.slice(0, 10))
      );
      setProducts(getListingsApi.data);
    }
    
  }, [getListingsApi.data?.length]);

  const canShow = (product, query) => {
    // console.log(product, query);
    return (
      query === "" ||
      product?.price?.toString()?.startsWith(query) ||
      product?.title?.toLowerCase().startsWith(query.toLowerCase())
    );
  };

  return (
    <section className="new-products" style={{ paddingTop: 80 }}>
      <div className="container">
        <ProductCarousel products={products.slice(0, 4)} />
        <div id="gotop">
          <SearchBar callback={setSearchQuery} />
        </div>
        {/* {console.log(getListingsApi.data, products)} */}
        <GoTop to="gotop">
          <FontAwesome className="fa-arrow-up fa-2x" name="arrow" />
        </GoTop>
        <div className="title-box" style={{ marginTop: 20 }}>
          <h2>New Arrivals</h2>
        </div>
        {getListingsApi.loading && <Spinner />}
        <div className="listings" style={{ paddingBottom: 10 }}>
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
              className="btn  load-more"
              style={{ background: "#136e32", color: "#ddd" }}
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
