/* eslint-disable */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/wishlistContext";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const { addProductToCart } = useContext(CartContext);
  let { wishList, addProductToWishList, removeProductFromWishList } = useContext(wishListContext);

  var settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };


  async function getProductDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
  }


  const isProductInWishlist = (productId) => {
    return wishList?.some((item) => item.id === productId);
  };

 
  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <>
      <div className="flex md:flex-row flex-col items-center min-h-screen py-16 w-[97%] mx-auto">
        {productDetails ? (
          <>
            <div className="lg:w-1/4 md:w-1/2 w-full p-4">
              {productDetails.images?.length > 1 ? (
                <Slider {...settings}>
                  {productDetails.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className="w-full border-2 border-blue rounded-md"
                      alt={productDetails.title}
                    />
                  ))}
                </Slider>
              ) : (
                <img
                  src={productDetails.images?.[0]}
                  className="w-full border-2 border-blue rounded-md"
                  alt={productDetails.title}
                />
              )}
            </div>

            <div className="md:w-1/2 w-full px-5">
              <div>
                <h1 className="font-bold text-2xl">{productDetails.title}</h1>
                <p className="my-4 text-gray-500">
                  {productDetails.description}
                </p>
                <h3>{productDetails.category?.name}</h3>
                <div className="flex justify-between mt-3">
                  <h5 className="font-bold text-zinc-800">
                    {productDetails.price} EGP
                  </h5>
                  <h5>
                    <i className="fas fa-star text-yellow-300"></i>{" "}
                    {productDetails.ratingsAverage}
                  </h5>
                </div>
                <div className="flex flex-wrap justify-between mt-4">
                  <button
                    type="button"
                    className="w-1/2 sm:w-3/4 bg-blue text-white md:px-3 md:py-2 py-3 text-sm md:text-base rounded-md"
                    onClick={() => {
                      addProductToCart(productDetails._id);
                      toast.success("Product added successfully to cart!");
                    }}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                  </button>
                  <span
                    className={`text-lg cursor-pointer px-3 py-1 border-2 rounded-md ${
                      isProductInWishlist(productDetails._id)
                        ? "border-red-500 text-red-500"
                        : "border-gray-800 text-gray-800"
                    }`} 
                    onClick={() => {
                      if (isProductInWishlist(productDetails._id)) {
                        removeProductFromWishList(productDetails._id);  
                        toast.success("Product removed from wishlist!");
                      } else {
                        addProductToWishList(productDetails._id); 
                        toast.success("Product added successfully to wishlist!");
                      }
                    }}
                  >
                    <i
                      className={`fa-regular fa-heart ${
                        isProductInWishlist(productDetails._id)
                          ? "text-red-500"
                          : ""
                      }`}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-screen w-full">
            <Loading />
          </div>
        )}
      </div>
    </>
  );
}
