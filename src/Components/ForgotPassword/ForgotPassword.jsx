/* eslint-disable */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import bg from "../../assets/images/bg-authentication.webp";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function ForgotPassword() {
  // let { setUserData, userData } = useContext(UserContext);
  const [success, setSuccess] = useState("");

  const [errorApi, setErrorApi] = useState("");
  let Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleForgotPass(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      // console.log(data);
      // Navigate("/resetPassword");

      // localStorage.setItem("userToken", data.token);
      // setUserData(data.token);
      setSuccess(data);
    } catch (error) {
      setErrorApi(error.response.data.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        Navigate("/resetPassword");
      }, 2000);
    }
  }, [success, Navigate]);

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleForgotPass,
  });

  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className=" md:w-1/2 w-full mx-5 md:mx-auto py-4 px-7 rounded-md border-blue border shadow-xl shadow-slate-400">
          <h2 className="text-3xl py-6 text-center font-semibold">
            Forgot Password
          </h2>

          {errorApi ? (
            <div
              className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800 "
              role="alert"
            >
              {errorApi}
            </div>
          ) : (
            success && (
              <div
                className="px-4 py-2 mb-4 text-sm text-green-900 rounded-lg bg-green-200 "
                role="alert"
              >
                {success.message}
              </div>
            )
          )}

          <form onSubmit={formik.handleSubmit} className="text-black">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="email"
                name="email"
                id="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Email
              </label>
            </div>
            {formik.errors.email && formik.touched.email && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800 "
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}

            {loading ? (
              <button className="block w-1/2 mx-auto text-white bg-blue hover:bg-sky-600 focus:ring-2 focus:outline-none focus:ring-sky-500 font-medium rounded-3xl text-sm px-5 py-2.5 text-center">
                <i className="fas fa-spinner fa-pulse"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="block w-1/2 mx-auto text-white bg-blue hover:bg-sky-600 focus:ring-2 focus:outline-none focus:ring-sky-500 font-medium rounded-3xl text-sm px-5 py-2.5 text-center"
              >
                Verify
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
