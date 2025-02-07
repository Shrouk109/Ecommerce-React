/* eslint-disable */
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import bg from "../../assets/images/bg-authentication.webp";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  let { setUserData } = useContext(UserContext);

  const [errorApi, setErrorApi] = useState("");
  let Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );

      localStorage.setItem("userToken", data.token);
      Navigate("/");
      setUserData(data.token);
    } catch (error) {
      setErrorApi(error.response.data.message);
    }
    setLoading(false);
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("Name is required"),
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{5,15}$/, "password is invalid")
      .required("pass is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password don't match")
      .required("repassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "phone is not valid")
      .required("phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,

    onSubmit: handleRegister,
  });

  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="md:w-1/2 w-full mx-5 md:mx-auto py-0 px-7 rounded-md border-blue border shadow-xl shadow-slate-400">
          <h2 className="text-3xl py-6 text-center font-semibold">Sign Up</h2>

          {errorApi && (
            <div
              className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800 "
              role="alert"
            >
              {errorApi}
            </div>
          )}

          <form onSubmit={formik.handleSubmit} className="text-black">
            <div className="relative z-0 w-full mb-4 group">
              <input
                type="text"
                name="name"
                id="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=""
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Name
              </label>
            </div>
            {formik.errors.name && formik.touched.name && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800 "
                role="alert"
              >
                {formik.errors.name}
              </div>
            )}

            <div className="relative z-0 w-full mb-4 group">
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

            <div className="relative z-0 w-full mb-4 group">
              <input
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Password
              </label>
            </div>
            {formik.errors.password && formik.touched.password && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800 "
                role="alert"
              >
                {formik.errors.password}
              </div>
            )}

            <div className="relative z-0 w-full mb-4 group">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                value={formik.values.rePassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your rePassword
              </label>
            </div>
            {formik.errors.rePassword && formik.touched.rePassword && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800 "
                role="alert"
              >
                {formik.errors.rePassword}
              </div>
            )}

            <div className="relative z-0 w-full mb-4 group">
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
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Phone
              </label>
            </div>
            {formik.errors.phone && formik.touched.phone && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800 "
                role="alert"
              >
                {formik.errors.phone}
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
                Submit
              </button>
            )}

            <p className="mt-5 mb-2 text-center">
              Already have an account?{" "}
              <span
                className="underline cursor-pointer text-blue"
                onClick={() => {
                  Navigate("/login");
                }}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
