import axios from "axios";
import { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState([]);

  async function getAllBrands() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      console.log(data.data);
      setBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <>
      <section className="w-[93%] mx-auto py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {brands.map((brand, index) => {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-300 ease-in-out transform hover:border-blue-500 hover:scale-105 hover:shadow-lg"
              >
                <img className="rounded-t-lg" src={brand.image} alt={brand.name} />

                <div className="p-5">
                  <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900">
                    {brand.name}
                  </h5>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
