/*eslint-disable*/
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../../Context/cartContext";
import { wishListContext } from "../../Context/wishlistContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecentProduct({ product }) {
  const { addProductToCart } = useContext(CartContext);
  const { addProductToWishList, wishList } = useContext(wishListContext);


  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (Array.isArray(wishList)) {
      setIsInWishlist(wishList.some((item) => item._id === product.id));
    }
  }, [wishList, product.id]);

  const handleAddToCart = () => {
    addProductToCart(product.id);
    toast.success("Product added to cart!");
  };

  const handleAddToWishList = () => {
    addProductToWishList(product.id);
    toast.success("Product added to wishlist! ❤️");
    setIsInWishlist(true); 
  };

  return (
    <motion.div
      className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 w-full"
      initial={{ opacity: 0, scale: 0.9, x: 50 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9, x: -50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      viewport={{
        once: false,
        amount: 0.5,
      }}
    >
      <div>
        <div className="p-4 style-img rounded-lg text-center group">
          <Link to={`productdetails/${product.id}`}>
            <img
              src={product.imageCover}
              className="w-full rounded-md"
              alt={product.title}
            />
            <h3 className="mt-2 text-blue font-semibold">
              {product.title.split(" ", 2).join(" ")}
            </h3>
            <h4 className="text-gray-800 text-md">{product.category.name}</h4>
            <div className="flex justify-between">
              <h5 className="font-bold text-zinc-800">{product.price} EGP</h5>
              <h5>
                <i className="fas fa-star text-yellow-300"></i>{" "}
                {product.ratingsAverage}
              </h5>
            </div>
          </Link>


          <div className="flex justify-between mt-1 items-center translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-[1] duration-500">
            <button
              type="button"
              className="w-3/4 bg-blue text-white md:px-3 md:py-2 py-3 text-sm md:text-base rounded-md"
              onClick={handleAddToCart}
            >
              <i className="fa-solid fa-cart-shopping"></i> Add To Cart
            </button>

            <span
              className={`text-lg cursor-pointer px-3 py-1 border-2 rounded-md ${
                isInWishlist ? "border-red-500 text-red-500" : "border-gray-800"
              }`}
              onClick={handleAddToWishList}
            >
              <i
                className={`fa-heart ${
                  isInWishlist ? "fa-solid text-red-500" : "fa-regular"
                }`}
              ></i>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
