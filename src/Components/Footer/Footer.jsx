import { useLocation } from "react-router-dom";
import bg from "../../assets/images/logo.png"

export default function Footer() {
  
  let location = useLocation();
  let hiddenRoutes = ["/login", "/register","/forgotPassword" , "/resetPassword" , "/changePassword"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }


  return<>
    <footer className="bg-blue text-white py-14">
      <div className="container text-center ">
        <div className="mb-4 flex justify-center items-center">
          <img src={bg} width={200} alt="logo" />
        </div>
        <div className="mt-4">
          <p>Ecommerce. All rights reserved @ 2025.</p>
        </div>
      </div>
    </footer>
  </>;
}
