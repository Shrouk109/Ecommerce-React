/*eslint-disable*/
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Layout() {

  
  // let { setUserData } = useContext(UserContext);
  // let navigate = useNavigate();

  

  return (
    <>
      <Navbar />

      {/* <div className="container "> */}
        <Outlet></Outlet>
      {/* </div> */}
      <Footer />
    </>
  );
}
