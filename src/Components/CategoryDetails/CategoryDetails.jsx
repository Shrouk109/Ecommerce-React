/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function CategoryDetails() {
  let { id } = useParams();

  const [categoryDetails, setCategoryDetails] = useState(null);
  const [subCategories, setSubCategories] = useState([]); 
  const [loading, setLoading] = useState(true);

  async function getCategoryDetails(categoryId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
      );
      setCategoryDetails(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getSubCategory(categoryId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
      );
      setSubCategories(data.data); 
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getCategoryDetails(id);
      getSubCategory(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <section className="pt-24 pb-8">
        <div className="mx-16">
          {categoryDetails && (
            <div className="text-center pb-8">
              <img
                src={categoryDetails.image}
                className="w-[200px] mx-auto rounded-md"
                alt={categoryDetails.name}
              />
              <h3 className="mt-2 text-blue font-semibold text-xl">
                {categoryDetails.name}
              </h3>
            </div>
          )}

          {/* subcategory */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-5">
            {subCategories.length > 0 ? (
              subCategories.map((subcategory, index) => (
                <div key={index} className="p-4 rounded-lg text-center border">
                  <h3 className="text-lg font-medium  text-blue">{subcategory.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-center bg-slate-50 py-3 border border-slate-600 rounded-md  text-gray-500">
                No SubCategories Founded.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
