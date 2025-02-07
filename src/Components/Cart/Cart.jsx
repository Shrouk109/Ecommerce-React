import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/cartContext";
import Loading from "../Loading/Loading";
import emptyCart from "../../assets/images/empty-cart.png";
import { Link } from "react-router-dom";

export default function Cart() {
  let {
    getCart,
    cart,
    updateProductCount,
    deleteProductFromCart,
    loading,
    deleteAllProductsFromCart,
  } = useContext(CartContext);

  // for each item
  const [loadingItems, setLoadingItems] = useState({});

  const [deletingProductId, setDeletingProductId] = useState(null);

  const handleDeleteProduct = (productId) => {
    setDeletingProductId(productId);
    deleteProductFromCart(productId).then(() => {
      setDeletingProductId(null);
    });
  };

  useEffect(() => {
    getCart();
  }, []);

  const handleUpdateCount = async (productId, newCount) => {
    setLoadingItems((prev) => ({ ...prev, [productId]: true }));
    try {
      await updateProductCount(productId, newCount);
    } catch (error) {
      console.error(error);
    }
    setLoadingItems((prev) => ({ ...prev, [productId]: false }));
  };

  return (
    <>
      <section className="py-14 min-h-screen w-[90%] mx-auto">
        {!cart || cart.data.products.length === 0 ? (
          <div className="flex flex-col items-center justify-center my-10">
            {loading ? (
              <Loading />
            ) : (
              <img
                src={emptyCart}
                className="max-w-[200px] py-40 h-auto"
                alt="empty"
              />
            )}
          </div>
        ) : (
          <div className="my-5">
            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => deleteAllProductsFromCart()}
                className="bg-red-600 hover:bg-red-500 duration-700 text-white px-4 py-2 rounded-md w-auto"
              >
                Delete All
              </button>
              <Link
                to={"/checkout"}
                className="bg-green-600 text-center hover:bg-green-500 duration-700 text-white px-4 py-2 rounded-md w-auto"
              >
                Check Out
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
              {cart?.data.products.map((product, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow rounded-lg flex flex-col sm:flex-row items-center gap-4"
                >
                  <img
                    src={product.product.imageCover}
                    className="w-28 h-28 object-contain"
                    alt={product.product.title}
                  />

                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900">
                      {product.product.title}
                    </h3>
                    <p className="text-gray-700 my-2">{product.price} EGP</p>

                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                      <button
                        onClick={() =>
                          handleUpdateCount(
                            product.product.id,
                            product.count - 1
                          )
                        }
                        className="bg-gray-200 text-gray-700 p-2 rounded-full w-8 h-8 flex items-center justify-center"
                        disabled={loadingItems[product.product.id]}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="text-lg">
                        {loadingItems[product.product.id] ? (
                          <i className="fas fa-spinner fa-pulse"></i>
                        ) : (
                          product.count
                        )}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateCount(
                            product.product.id,
                            product.count + 1
                          )
                        }
                        className="bg-gray-200 text-gray-700 p-2 rounded-full w-8 h-8 flex items-center justify-center"
                        disabled={loadingItems[product.product.id]}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteProduct(product.product.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-500 duration-700 w-full sm:w-auto"
                    disabled={deletingProductId === product.product.id}
                  >
                    {deletingProductId === product.product.id ? (
                      <i className="fas fa-spinner fa-pulse"></i>
                    ) : (
                      "Remove"
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6 bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold">
                Total Cart Price : {cart.data.totalCartPrice} EGP
              </h3>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
