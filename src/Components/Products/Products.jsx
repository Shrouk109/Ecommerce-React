/* eslint-disable */
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { wishListContext } from "../../Context/wishlistContext";  

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addProductToWishList, removeProductFromWishList } = useContext(wishListContext);  

  const isProductInWishlist = (productId) => {
    return wishlist?.some((item) => item.id === productId);
  };

  async function getAllProduct() {
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleWishlistToggle = (productId) => {
    if (isProductInWishlist(productId)) {
      removeProductFromWishList(productId);  
      toast.success("Product removed from wishlist!");
    } else {
      addProductToWishList(productId);  
      toast.success("Product added successfully to wishlist!");
    }
  };

  return (
    <>
      <section className="min-h-screen pt-16">
        {products.length === 0 ? (
          <div className="flex py-20 justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="w-[93%] py-10 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {products.map((product) => (
              <div
                key={product.id}
                className="p-4 style-img rounded-lg text-center group"
              >
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    src={product.imageCover}
                    className="w-full rounded-md"
                    alt={product.title}
                  />
                  <h3 className="mt-2 text-blue font-semibold">
                    {product.title ? product.title.split(" ", 2).join(" ") : ""}
                  </h3>
                  <h4 className="text-gray-800 text-md">
                    {product.category ? product.category.name : ""}
                  </h4>
                  <div className="flex justify-between">
                    <h5 className="font-bold text-zinc-800">
                      {product.price} EGP
                    </h5>
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
                    onClick={() => {
                      addProductToCart(product.id);
                      toast.success("Product added successfully to cart");
                    }}
                  >
                    <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                  </button>
                  <span
                    className={`text-lg cursor-pointer px-3 py-1 border-2 rounded-md ${
                      isProductInWishlist(product.id) ? "border-red-500 text-red-500" : "border-gray-800 text-gray-800"
                    }`} 
                    onClick={() => handleWishlistToggle(product.id)}  
                  >
                    <i className={`fa-regular fa-heart ${isProductInWishlist(product.id) ? "text-red-500" : ""}`}></i>  {/* إضافة اللون الأحمر إذا كان موجودًا */}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
