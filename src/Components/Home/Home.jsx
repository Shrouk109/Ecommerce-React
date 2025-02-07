/* eslint-disable */
import { motion } from "framer-motion";
import bg from "../../assets/images/Final.jpg";
import axios from "axios";
import { useEffect, useState } from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import ReactLoading from "react-loading";
import Loading from "../Loading/Loading";
import CategoriesSlider from "../categoriesSlider/categoriesSlider";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllProducts() {
    try {
      setIsLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      // console.log(data.data);
      setProducts(data.data);
    } catch (error) {
      // console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProducts();
    
  }, []);

  

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen bg-white flex items-center">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="text-center md:text-left"
            >
              <h1 className="md:text-4xl text-3xl font-bold text-gray-900 leading-tight pt-10 md:mt-0">
                🛍️ The Best Deals Await You!
              </h1>
              <p className="text-gray-600 mt-4 text-md md:text-xl">
                Discover the latest products at unbeatable prices. Don't miss
                out!
              </p>
              <Link to={"/products"}>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-[#0255b4] hover:bg-[#003f7f] text-white px-6 md:px-8 py-3 rounded-lg text-lg font-semibold shadow-lg transition duration-300"
              >
                Shop Now
              </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="flex justify-center"
            >
              <img
                src={bg}
                alt="Fashion Model"
                className="w-4/5 md:w-full  md:max-w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* category */}
      <section className="px-14 bg-[#fcfcfc] py-24 ">
        <h2 className="text-center mb-1 text-3xl text-gray-800 cursor-pointer font-bold">
          Category
        </h2>
        <span className="block mb-20 w-20 hover:w-24 rounded-md bg-gray-800 duration-300  mx-auto h-1 cursor-pointer"></span>
        <CategoriesSlider/>
      </section>

      {/* products */}
      <section className="bg-slate-100 px-10">
        <h2 className="text-center pt-24 mb-1 text-3xl text-gray-800 cursor-pointer font-bold">
          Products
        </h2>
        <span className="block mb-16 w-20 hover:w-24 rounded-md bg-gray-800 duration-300  mx-auto h-1 cursor-pointer"></span>

        {isLoading ? (
          <div className="flex justify-center items-center pb-5">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-wrap pb-5 justify-center">
            {products.map((product, index) => {
              return <RecentProduct key={index} product={product} />;
            })}
          </div>
        )}
      </section>
    </>
  );
}
