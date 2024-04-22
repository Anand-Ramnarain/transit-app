import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ConfirmationPage = () => {
  const { cartItems, setCartItems, addMessage } = useCart();

  // Function to calculate the total amount of the purchase. Get the price of each ticket in the cart and multiples by the the quanity of tickets to get the total amount
  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to get the current date and time and puts it in a string to be read
  const getCurrentDate = () => {
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Function to clear the cart, removes whatever is in the cart when in the confirmation page, as the user should have nothing after checkedout in the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Trying to added a message componeent here
  const sendMessageToMessages = () => {
    const message = `You bought these tickets: ${cartItems
      .map((item) => `${item.title} (${item.quantity})`)
      .join(", ")}`;
    addMessage(message);
  };
  // This is what is going to be shown
  return (
    <Wrapper>
      <ConfirmationMessage>
        <h2>Thank you for your purchase!</h2>
        <p>Date: {getCurrentDate()}</p>
        <p>Total Amount: ${calculateTotalAmount()}</p>
        <p>Details:</p>
        <ul>
          {/* List of purchased items */}
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.title} - Quantity: {item.quantity}
            </li>
          ))}
        </ul>
      </ConfirmationMessage>
      {/* Button to navigate back to the home page */}
      <BackToHomeButton
        to="/"
        onClick={() => {
          clearCart();
          sendMessageToMessages();
        }}
      >
        Back to Home
      </BackToHomeButton>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.div`
  text-align: center;
`;

const ConfirmationMessage = styled.div`
  margin-bottom: 2rem;
`;

const BackToHomeButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

export default ConfirmationPage;
