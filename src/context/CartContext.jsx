import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // This is used for storing the State of the items below
  const [cartItems, setCartItems] = useState([]);
  const [messages, setMessages] = useState([]);

  /* This one is used to get/load the cart items from what tickets have been place/stoered in local storage. so the users can add tickets to the cart and leave the page and it will still be there*/
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  /* This one is used to get and update the cart items from what tickets have been place/stoered in local storage. so the users can add tickets or remove them*/
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // This component wraps the children the "values" with a context provider, allowing them to be accessed and used for other functions.
  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, messages, addMessage }}
    >
      {children}
    </CartContext.Provider>
  );
};

/*) Custom hook for accessing cart context. This will allow components to easily access the cart context, giving them access to the cart state. */
export const useCart = () => {
  return useContext(CartContext);
};
