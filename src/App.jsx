/*eslint-disable*/
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import Brands from "./Components/Brands/Brands";
import Products from "./Components/Products/Products";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/cartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import CategoryDetails from "./Components/CategoryDetails/CategoryDetails";
import WishList from "./Components/WishList/WishList";
import WishlistContextProvider from "./Context/wishlistContext";
import SubCategory from "./Components/SubCategory/SubCategory";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ChangePassword from "./Components/ChangePassword/ChangePassword";

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "register", element: <Register /> },
      { path: "productdetails/:id", element: <ProductDetails /> },
      { path: "categorydetails/:id", element: <CategoryDetails /> },
      { path: "subcategory/:id", element: <SubCategory /> },

      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      { path: "changePassword", element: <ChangePassword /> },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  return (
    <WishlistContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster />
        </UserContextProvider>
      </CartContextProvider>
    </WishlistContextProvider>
  );
}

export default App;
