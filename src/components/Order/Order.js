import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Order = () => {
  const { products, initialCart } = useLoaderData(); //{ products: products, initialCart: initialCart }

  //for change state
  const [cart, setCart] = useState(initialCart);
  // clear cart
  const clearCart = () => {
    setCart([]); //set cart as empty
    deleteShoppingCart(); //delete from db
  };
  //event handler for remove item and send it to props  and alltime define as parent
  //remove item by id
  const handlerRemoveItem = (id) => {
    console.log(id);
    //filtering kore remove id click match kore then remove
    const remaining = cart.filter((product) => product.id !== id);
    setCart(remaining);
    //call removeDb for removing items for db
    removeFromDb(id);
  };

  return (
    <div className="shop-container">
      {/* <h2>this is order {products.length} </h2>
      <p>order summary: {initialCart.length}</p> */}

      <div className="carts-container">
        {cart.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handlerRemoveItem={handlerRemoveItem}
          ></ReviewItem>
        ))}
        {cart.length === 0 && (
          <h2>
            No Items for Review. Please <Link to="/"> Shop More</Link>
          </h2>
        )}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Order;
