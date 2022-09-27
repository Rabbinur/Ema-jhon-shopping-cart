import React, { useEffect, useState } from "react";
import { addToDb, getStoreCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("product load before fetch");
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        console.log("products loaded");
      });
  }, []);
  useEffect(() => {
    console.log("local storege load first line", products);
    const storedCart = getStoreCart();
    // console.log(storedCart);
    //save cart to added product to array
    const saveCart = [];
    for (const id in storedCart) {
      console.log(id);
      const addedProduct = products.find((product) => product.id == id);
      if (addedProduct) {
        //get product quantity by id
        const quantity = storedCart[id];
        //set quantity
        addedProduct.quantity = quantity;
        //added product to save cart
        saveCart.push(addedProduct);
        console.log(addedProduct);
      }
    }
    //set cart by saveCart
    setCart(saveCart);
    // console.log("local storage finished");
  }, [products]);
  const handleAddToCart = (selectedProduct) => {
    // console.log(product);
    let newCart = [];
    //find the product is exist
    const exists = cart.find((product) => product.id === selectedProduct.id);
    if (!exists) {
      //doesnot exist then set value=1
      selectedProduct.quantity = 1;
      // do not do this: cart.push(product)
      //set selected produt
      newCart = [...cart, selectedProduct];
    } else {
      //if already exist then  filter /rest
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      exists.quantity = exists.quantity + 1;
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
