import { useContext, useState } from "react";
import { wishListContext } from "../../Context/wishlistContext";
import emptyWishlist from "../../assets/images/empty-wishlist-removebg-preview.png"

export default function WishList() {
  const { wishList, removeProductFromWishList, loading } = useContext(wishListContext);
  const [removingProduct, setRemovingProduct] = useState(null); 


  const handleRemoveClick = (productId) => {
    setRemovingProduct(productId);
    removeProductFromWishList(productId);
  };

  return (
    <section className="min-h-screen pt-20 pb-5">
      {Array.isArray(wishList) && wishList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4">
          {wishList.map((product, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 text-blue font-semibold">
                {product.title ? product.title.split(" ", 2).join(" ") : "Untitled Product"}
              </h3>
              <p className="text-gray-600">{product.category?.name || "Uncategorized"}</p>
              <div className="flex justify-between mt-2">
                <h5 className="font-bold text-zinc-800">{product.price} EGP</h5>
                
                
                {removingProduct === product._id && loading ? (
                  <button
                    className="text-white bg-red-600 px-3 py-2 rounded-md"
                    disabled
                  >
                    <i className="fas fa-spinner fa-spin-pulse"></i>
                  </button>
                ) : (
                  <button
                    className="text-white bg-red-600 px-3 py-2 rounded-md font-semibold"
                    onClick={() => handleRemoveClick(product._id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className=" py-40  flex justify-center items-center">
          <img src={emptyWishlist}  alt="empty"/>
        </div>
      )}
    </section>
  );
}
