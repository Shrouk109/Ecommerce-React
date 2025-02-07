/*eslint-disable*/
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  //  حل مشكله ال reload
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserData(localStorage.getItem("userToken"));
    } 
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
}
