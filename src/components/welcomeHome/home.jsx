import React, { useEffect, useState } from "react";
// import FontAwesome from "react-fontawesome";

import auth from "../../services/authService";
import { getListings } from "../../services/listingService";
import { getCategories } from "../../services/categoryService";

import SearchBox from "./SearchBox";
import Card from "./card";
import Footer from "./footerr";
import Spinner from "./spinner";
import LoadMoreButton from "./loadmorebtn";

import { GoTop } from "../styledComponents/Styledgotopbtn";
import Icon from "../icon";
import Hero from "./hero";

import "../../styles/App.css";

const Home = () => {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(8);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem("localProducts");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    setUser(auth.getCurrentUser());

    async function fetchData() {
      setLoading(true);
      const { data: listings } = await getListings();
      setProducts(listings);
      setLoading(false);

      const { data } = await getCategories();
      setCategories(data);

      localStorage.setItem(
        "localProducts",
        JSON.stringify(listings?.slice(0, 10))
      );
    }

    fetchData();
  }, []);

  const canShow = (product, query, catId) => {
    return (
      (query === "" ||
        product?.price?.toString()?.startsWith(query) ||
        product?.title?.toLowerCase().startsWith(query.toLowerCase())) &&
      (product?.categoryId._id === catId || catId === null || catId === "")
    );
  };

  const getFilteredProducts = (listings) => {
    return listings.filter((listing) => {
      if (canShow(listing, searchQuery, categoryId)) return listing;
    });
  };

  return (
    <section className="home-page">
      <div className="container">
        <Hero user={user} />
        <div id="gotop">
          <SearchBox
            value={searchQuery}
            onChange={(query) => setSearchQuery(query)}
            options={categories.slice(0, 6)}
            select={(id) => setCategoryId(id)}
          />
        </div>

        <GoTop to="gotop">
          <Icon className="icon" name="#arrow-up" />
        </GoTop>

        <div className="grid listings--grid ">
          {products.length !== 0 &&
            getFilteredProducts(products)
              .slice(0, visible)
              .map((listing, index) => (
                <Card key={index} listing={listing} userId={user?.userId} />
              ))}
        </div>
        {loading && <Spinner />}
        {visible < getFilteredProducts(products).length && (
          <LoadMoreButton loadMore={() => setVisible(visible + 8)} />
        )}
      </div>
      <Footer user={user} />
    </section>
  );
};

export default Home;
