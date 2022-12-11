import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import {
  addToDb,
  deleteShoppingCart,
  getStoreCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

/*
for pagination follow this 
1.count :loaded
2.how much item you want to show per page:10
3.how much page you want to add:pages:



count:loaded
perPage(size):10 
pages:count/perPage 
currentPage(page)
*/

const Shop = () => {
  const { products, count } = useLoaderData();

  // const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  //current page initial value 0 theke start
  const [page, setPage] = useState(0);
  //size kotogula hbe
  const [size, setSize] = useState(10);
  //koita page hbe
  const pages = Math.ceil(count / size);

  // clear cart
  const clearCart = () => {
    setCart([]); //set cart as empty
    deleteShoppingCart(); //delete from db
  };

  // useEffect(() => {
  //   console.log("product load before fetch");
  //   fetch("products.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       console.log("products loaded");
  //     });
  // }, []);

  useEffect(() => {
    console.log("local storege load first line", products);
    const storedCart = getStoreCart();
    // console.log(storedCart);
    //save cart to added product to array
    const saveCart = [];
    for (const id in storedCart) {
      console.log(id);
      const addedProduct = products.find((product) => product._id == id);
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
    const exists = cart.find((product) => product._id === selectedProduct._id);
    if (!exists) {
      //doesnot exist then set value=1
      selectedProduct.quantity = 1;
      // do not do this: cart.push(product)
      //set selected produt
      newCart = [...cart, selectedProduct];
    } else {
      //if already exist then  filter /rest . bakigula pabo
      const rest = cart.filter(
        (product) => product._id !== selectedProduct._id
      );
      //already exists quantity value set with add 1
      exists.quantity = exists.quantity + 1;
      //set rest prodcut add and exist
      newCart = [...rest, exists];
    }

    setCart(newCart);
    addToDb(selectedProduct._id);
  };
  return (
    <div className="shop-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart clearCart={clearCart} cart={cart}>
          <Link to="/order">
            <button>Review Orders</button>
          </Link>
        </Cart>
      </div>
      {/* //pagination */}
      <div className="pagination">
        <p>
          Current Selected page:{page} and size:{size}
        </p>
        {[...Array(pages).keys()].map((number) => (
          <button
            key={number}
            className={page === number && "selected"}
            onClick={() => setPage(number)}
          >
            {number}
          </button>
        ))}
        {/* for dropdown selection */}
        <select name="" id="" onChange={(event) => setSize(event.target.value)}>
          <option value="5">5</option>
          <option value="10" selected>
            10
          </option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Shop;
