/* eslint-disable */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import bg from "../../assets/images/bg-authentication.webp";

import { CartContext } from "../../Context/cartContext";

export default function CheckOut() {
 
  let {checkout , loading}=useContext(CartContext)

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city:""
    },
    onSubmit: checkout,
  });

  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className=" md:w-1/2 w-full mx-5 md:mx-auto py-4 px-7 rounded-md border-blue border shadow-xl shadow-slate-400">
          <h2 className="text-3xl py-6 text-center font-semibold">CheckOut</h2>


          <form onSubmit={formik.handleSubmit} className="text-black">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="details"
                id="details"
                value={formik.values.details}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="details"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Details
              </label>
            </div>
            

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="city"
                id="city"
                value={formik.values.city}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your City
              </label>
            </div>


            <div className="relative z-0 w-full mb-6 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Phone
              </label>
            </div>
            



              {loading ? <button
                type="submit"
                className="block w-1/2 mx-auto text-white bg-blue hover:bg-sky-800 focus:ring-2 focus:outline-none focus:ring-sky-500 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
              >
                <i className="fas fa-spinner fa-pulse-spin"></i>
              </button> :<button
                type="submit"
                className="block w-1/2 mx-auto text-white bg-blue hover:bg-sky-800 focus:ring-2 focus:outline-none focus:ring-sky-500 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
              >
                CheckOut
              </button>

}
          </form>
        </div>
      </div>
    </>
  );
}
