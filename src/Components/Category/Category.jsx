import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Category() {
  const [category, setCategory] = useState([]);

  async function getAllCategory() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      // console.log(data.data);
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <>
      <section className="min-h-screen pt-16 ">
        {!category.length ? (
          <div className="flex py-20 justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="w-[93%] py-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {category?.map((category, index) => (
              <div
                key={index}
                className="p-4 style-img rounded-lg text-center group"
              >
                <Link to={`/categorydetails/${category._id}`}>
                  <img
                    src={category.image}
                    className="w-full h-[300px] object-cover rounded-md"
                    alt={category.name}
                  />
                  <h3 className="mt-2 text-blue font-semibold">
                    {category.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
