/*eslint-disable*/
import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/cartContext";
import { wishListContext } from "../../Context/wishlistContext";

export default function Navbar() {
  let { cart } = useContext(CartContext);
  let { wishList } = useContext(wishListContext);
  let { userData, setUserData } = useContext(UserContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);

  // logout function
  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  let location = useLocation();
  let hiddenRoutes = [
    "/login",
    "/register",
    "/forgotPassword",
    "/resetPassword",
    "/changePassword",
  ];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <nav className="bg-blue fixed w-full z-[999999999999] shadow-md">
        <div className="flex justify-between items-center px-5 md:px-10 py-3">
          {/* Logo */}
          <div>
            <img src={logo} width={120} alt="logo" />
          </div>

        
          <ul
            className={`absolute top-14 left-0 w-full bg-blue md:bg-transparent md:static md:flex md:space-x-7 text-white text-lg transition-all duration-300 ${
              menuOpen ? "block" : "hidden"
            } md:flex justify-center`}
          >
            <li className="py-2 md:py-0 text-center">
              <NavLink to={""} className="hover:text-gray-300">
                Home
              </NavLink>
            </li>
            <li className="py-2 md:py-0 text-center">
              <NavLink to={"cart"} className="hover:text-gray-300">
                Cart
              </NavLink>
            </li>
            <li className="py-2 md:py-0 text-center">
              <NavLink to={"products"} className="hover:text-gray-300">
                Products
              </NavLink>
            </li>
            <li className="py-2 md:py-0 text-center">
              <NavLink to={"categories"} className="hover:text-gray-300">
                Category
              </NavLink>
            </li>
            <li className="py-2 md:py-0 text-center">
              <NavLink to={"brands"} className="hover:text-gray-300">
                Brands
              </NavLink>
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            <Link
              to={"/cart"}
              className="fa-solid fa-cart-shopping cursor-pointer text-white relative text-2xl"
            >
              <span className="absolute top-[-5px] right-[-10px] bg-red-600 text-white text-xs rounded-full px-2">
                {cart?.data?.products?.length || 0}
              </span>
            </Link>
            <Link
              to={"/wishlist"}
              className="fa-solid fa-heart cursor-pointer text-white relative text-2xl"
            >
              <span className="absolute top-[-5px] right-[-10px] bg-red-600 text-white text-xs rounded-full px-2">
                {wishList?.length || 0}
              </span>
            </Link>

            {userData ? (
              <button
                onClick={logOut}
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
              >
                LogOut
              </button>
            ) : (
              <>
                <NavLink to={"register"}>
                  <button
                    type="button"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Register
                  </button>
                </NavLink>

                <NavLink to={"login"}>
                  <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Login
                  </button>
                </NavLink>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white text-2xl ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </nav>
    </>
  );
}
