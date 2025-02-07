/* eslint-disable */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function SubCategory() {
  let { id } = useParams();
  const [subCategoryDetails, setSubCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getSubCategoryDetails(subCategoryId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/subcategories/${subCategoryId}`
      );
      setSubCategoryDetails(data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (id) {
      getSubCategoryDetails(id);
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
        <div className="mx-16 text-center">
          {subCategoryDetails ? (
            <>
              <h2 className="text-3xl font-bold">{subCategoryDetails.name}</h2>
            </>
          ) : (
            <p className="text-gray-500 bg-slate-50 py-3 border border-slate-600 rounded-md w-full text-center">
              No SubCategory Details Found.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
