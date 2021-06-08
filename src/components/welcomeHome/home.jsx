import React, { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";

import auth from "../../services/authService";
import { getListings } from "../../services/listingService";
import { getCategories } from "../../services/categoryService";

import ProductCarousel from "./productCarousel";
import SearchBox from "./SearchBox";
import Card from "./card";
import Footer from "./footerr";
import Spinner from "./spinner";
import LoadMoreButton from "./loadmorebtn";
import Filter from "./filter";

import "./style.css";
import { GoTop } from "../styles/Styledgotopbtn";

const Home = () => {
  const [user, setUser] = useState({});
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visible, setVisible] = useState(12);
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
      ( product?.categoryId._id === catId || 
        catId===null ||
         catId==="" )
    );
  };

  const handleClear = () => {
    setCategoryId("");
    setSearchQuery("");
  };

  return (
    <section className="new-products" style={{ paddingTop: 80 }}>
      <div className="container">
        {products.length !== 0 && (
          <>
            <ProductCarousel products={products.slice(0, 4)} />

            <div id="gotop">
            <SearchBox
              value={searchQuery}
              onChange={(query)=>setSearchQuery(query)}
              placeholder={"Search Product..."}
            />
          
              <Filter
                options={categories}
                onChangeId={(id) => setCategoryId(id)}
                value={categoryId}
              />
              <button className="clear-btn" onClick={handleClear}>Clear</button>
            </div>
            <GoTop to="gotop">
              <FontAwesome className="fa-arrow-up fa-2x" name="arrow" />
            </GoTop>

            <div className="title-box" style={{ marginTop: 20 }}>
              <h2>New Arrivals</h2>
            </div>
          </>
        )}

        <div className="listings" style={{ paddingBottom: 10 }}>
          {products.length !== 0 &&
            products
              .filter((product) => {
                if (canShow(product, searchQuery, categoryId)) return product;
              })
              .slice(0, visible)
              .map((listing, index) => (
                <Card key={index} listing={listing} userId={user?.userId} />
              ))}
        </div>

        {loading && <Spinner />}
        {visible < products.length && (
          <LoadMoreButton loadMore={() => setVisible(visible + 8)} />
        )}
      </div>
      <Footer user={user} />
    </section>
  );
};

export default Home;
