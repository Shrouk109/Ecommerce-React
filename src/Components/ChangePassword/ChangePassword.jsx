/*eslint-disable*/ 
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import bg from "../../assets/images/bg-authentication.webp";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [errorApi, setErrorApi] = useState("");
  const [success, setSuccess] = useState("");
  let Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleResetPassword(values) {
    try {
      setLoading(true);
      console.log("Submitting values:", values);
      
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values,
      );
  
      // console.log( data);  
      setSuccess(data.message);
      setTimeout(() => {
        Navigate("/login");
      }, 2000);
    } catch (error) {
      // console.log("Error:", error);  
      setErrorApi(error?.response?.data?.message );
    }
    setLoading(false);
  }
  

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,20}$/,
        "Password must be between 6 and 20 characters and contain letters, numbers, and special characters"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <div
        className="h-screen bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="md:w-1/2 w-full mx-5 md:mx-auto py-4 px-7 rounded-md border-blue border shadow-xl shadow-slate-400">
          <h2 className="text-3xl py-6 text-center font-semibold">Reset Password</h2>

          {errorApi && (
            <div
              className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-800"
              role="alert"
            >
              {errorApi}
            </div>
          )}

          {success && (
            <div
              className="px-4 py-2 mb-4 text-sm text-green-900 rounded-lg bg-green-200"
              role="alert"
            >
              {success}
            </div>
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
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Email
              </label>
            </div>
            {formik.errors.email && formik.touched.email && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}

            <div className="relative z-0 w-full mb-6 group">
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="newPassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your New Password
              </label>
            </div>
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div
                className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-800"
                role="alert"
              >
                {formik.errors.newPassword}
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
                Reset Password
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
