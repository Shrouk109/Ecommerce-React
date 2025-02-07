/* eslint-disable */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const [loading, setloading] = useState(false);
  const [cart, setCart] = useState(null);

  async function addProductToCart(productId) {
    const loadingToast = toast.loading("Adding product to cart...");
    try {
      setloading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        {
          headers,
        }
      );

      toast.dismiss(loadingToast);
      toast.success("Product added to cart!");

      setCart(data);
    } catch (error) {
      toast.dismiss(loadingToast);
      // toast.error("Failed to add product to cart!");
    }
    setloading(false);
  }

  async function getCart() {
    try {
      setloading(true);
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers,
        }
      );

      setCart(data);
    } catch (error) {
      // console.log(error);
    }
    setloading(false);
  }

  async function updateProductCount(productId, count) {
    if (count > 0) {
      try {
        setloading(true);
        let { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
          { count },
          {
            headers,
          }
        );

        setCart(data);
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    } else {
      deleteProductFromCart(productId);
    }
  }

  async function deleteProductFromCart(productId) {
    try {
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers,
        }
      );

      setCart(data);
    } catch (error) {
      toast.error("Failed to remove product from cart!");
    }
    setloading(false);
  }

  async function deleteAllProductsFromCart() {
    try {
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );

      setCart({ data: { products: [] }, message: data.message });
    } catch (error) {
      toast.error("Failed to delete all products from cart!");
    }
    setloading(false);
  }

  async function checkout(shippingAddress) {
    try {
      setloading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`,
        { shippingAddress },
        {
          headers,
        }
      );

      window.location.href = data.session.url;
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  }

  async function clearCart() {
    try {
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers,
        }
      );

      setCart(null);
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        loading,
        addProductToCart,
        getCart,
        cart,
        setCart,
        updateProductCount,
        deleteProductFromCart,
        deleteAllProductsFromCart,
        checkout,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
