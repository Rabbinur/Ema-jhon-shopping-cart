import React from "react";
import download from "../../images/download.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./Product.css";
const Product = ({ product, handleAddToCart }) => {
  // const { product, handleAddToCart } = props;
  // console.log(props.product);
  // console.log(props);
  // const { img, name, price, ratings, seller } = props.product;
  const { img, name, price, ratings, seller } = product;
  return (
    <div className="product">
      <img
        src={img}
        alt=""
        onError={(e) => {
          e.currentTarget.src = "../../images/download.jpg";
        }}
      />
      <div className="product-info">
        <h2 className="product-name">{name}</h2>
        <p className=""> Price: ${price}</p>
        <p>
          <small>Manufacturer: {seller}</small>
        </p>
        <p>
          <small>Ratings: {ratings} stars</small>
        </p>
      </div>
      <button onClick={() => handleAddToCart(product)} className="btn-cart">
        <p>Add to Cart</p>{" "}
        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default Product;
