import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";

const ProductCarousel = ({ products }) => {
  return (
    <Carousel
      pause="hover"
      className="home-carousel"
      style={{ backgroundColor: "#132c20" }}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/listing/details/${product._id}`}>
            <Image src={product.images[0]?.url} alt={product.title} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.title} (Rs. {product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
