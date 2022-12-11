import logo from "./logo.svg";
import "./App.css";
import Main from "./layout/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import About from "./components/About/About";
import Order from "./components/Order/Order";
import Inventory from "./components/Inventory/Inventory";
import { productsAndCartLoader } from "./components/Loader/ProductsAndCartLoader";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          // loader: () => fetch("http://localhost:5000/products"),
          element: <Shop></Shop>,
        },
        {
          path: "/about",
          element: <About></About>,
        },
        {
          path: "/order",
          loader: productsAndCartLoader,
          element: <Order></Order>,
        },
        {
          path: "/inventory",
          element: <Inventory></Inventory>,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
