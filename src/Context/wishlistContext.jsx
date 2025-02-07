/*eslint-disable*/
import React, { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export let wishListContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [loading, setloading] = useState(false);
  const [wishList, setwishList] = useState([]);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    const fetchWishList = async () => {
      try {
        setloading(true);
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
        setwishList(data.data || []); 
      } catch (error) {
        // toast.error("Failed to fetch wishList");
      } finally {
        setloading(false);
      }
    };

    if (wishList.length === 0) {
      fetchWishList(); 
    }
  }, []);

  
async function addProductToWishList(productId) {
  const loadingToast = toast.loading("Adding product to wishList...");
  try {
    setloading(true);
    let { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers }
    );
    
    console.log(data); 
    
    if (data?.data && Array.isArray(data.data)) {
      toast.dismiss(loadingToast);
      toast.success("Product added to wishList!");
      
   
      fetchWishList(); 
    } else {
      toast.dismiss(loadingToast);
      toast.error("Received data is not an array");
    }
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Failed to add product to wishList!");
  }
  setloading(false);
}


async function removeProductFromWishList(productId) {
  const loadingToast = toast.loading("Removing product from wishList...");
  try {
    setloading(true);
    let { data } = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      { headers }
    );
    
    console.log(data); 
    
    if (data?.data && Array.isArray(data.data)) {
      toast.dismiss(loadingToast);
      toast.success("Product removed from wishList!");
      
    
      fetchWishList();  
    } else {
      toast.dismiss(loadingToast);
      toast.error("Received data is not an array");
    }
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Failed to remove product from wishList!");
  }
  setloading(false);
}


const fetchWishList = async () => {
  try {
    setloading(true);
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
    setwishList(data.data || []);  
  } catch (error) {
    // toast.error("Failed to fetch wishList");
  } finally {
    setloading(false);
  }
};

  

  async function removeProductFromWishList(productId) {
    const loadingToast = toast.loading("Removing product from wishList...");
    try {
      setloading(true);
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers }
      );
      
      if (Array.isArray(data.data)) {
        toast.dismiss(loadingToast);
        toast.success("Product removed from wishList!");
        
  
        setwishList(prevWishList => prevWishList.filter(item => item._id !== productId));  
      } else {
        toast.dismiss(loadingToast);
        toast.error("Received data is not an array");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to remove product from wishList!");
    }
    setloading(false);
  }
  

  async function getProductDetails(productId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`, { headers });
      return data;
    } catch (error) {
      console.error("Failed to fetch product details", error);
      return null;
    }
  }

  return (
    <wishListContext.Provider value={{ wishList, setwishList, loading, addProductToWishList, removeProductFromWishList }}>
      {children}
    </wishListContext.Provider>
  );
}
