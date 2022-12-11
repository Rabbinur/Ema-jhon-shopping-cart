import { getStoreCart } from "../../utilities/fakedb";

export const productsAndCartLoader = async () => {
  //get products
  const productsData = await fetch("http://localhost:5000/products");
  //convert to json
  const { products } = await productsData.json(); //products used for cart

  //get cart
  const savedCart = getStoreCart();
  //   console.log("savedCart", savedCart);  //show the savedCart value

  //push the value or already saved products
  const initialCart = [];
  //show the savedCart ID

  for (const id in savedCart) {
    // console.log(id);
    //added product for finding
    const addedProduct = products.find((product) => product._id === id); //check this product with id which is math by id
    // console.log(id, addedProduct);

    //if the addedproduct is not existing in this relevant store cart then check
    if (addedProduct) {
      //show the saved cart items quantity

      const quantity = savedCart[id];
      //set the value from saved cart
      addedProduct.quantity = quantity;
      console.log(id, quantity);
      initialCart.push(addedProduct); //push the value in previous cart
    }
  }

  return { products: products, initialCart: initialCart };
};
