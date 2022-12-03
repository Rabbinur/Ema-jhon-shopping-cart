import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faShoppingCart,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import React from "react";
import "./ReviewItem.css";
const ReviewItem = ({ product, handlerRemoveItem }) => {
  const { id, name, img, quantity, price, shipping } = product;

  return (
    <div className="review-item">
      <div className="">
        <img src={img} alt="" />
      </div>
      <div className="review-details-container">
        <div className="review-details">
          <p> {name}</p>
          <p>
            <small>Price: ${price}</small>
          </p>
          <p>
            <small>Shipping Cost: ${shipping}</small>
          </p>
          <p>
            <small>Quantity: {quantity}</small>
          </p>
        </div>
        <div className="delete-items">
          {/* must be rapping with arrow function and set id or something */}
          <button onClick={() => handlerRemoveItem(id)} className="btn-delete">
            <FontAwesomeIcon
              className="delete-icon"
              icon={faTrashAlt}
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
