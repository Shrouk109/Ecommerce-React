/*eslint-disable*/
import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getAllCategories() {
    try {
      setLoading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4">
          <Slider {...settings}>
            {Categories.map((category) => (
              <Link key={category._id} to={`/categorydetails/${category._id}`}>
                <div className="flex flex-col items-center cursor-pointer">
                  <div className="xl:w-44 xl:h-44 md:w-36 md:h-36 w-32 h-32 rounded-full overflow-hidden border border-gray-300 hover:scale-105 transition-transform duration-300">
                    <img
                      src={category.image}
                      className="w-full h-full object-cover"
                      alt={category.name}
                    />
                  </div>
                  <p className="text-center mt-4 text-sm font-semibold text-blue-600">
                    {category.name}
                  </p>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
}
