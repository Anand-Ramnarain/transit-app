import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";
import { BsCartX } from "react-icons/bs";

const TicketPurchasePage = () => {
  const { cartItems, setCartItems } = useCart();
  // Hook for navigation, this is so can move to a different page after click the checkout button
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  // Function to remove a ticket from the cart
  const handleRemoveTicket = (id) => {
    const filteredCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCartItems);
  };

  // Function to handle change in ticket quantity. So the user can change the nunder of tickets
  const handleTicketChange = (id, quantity) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Function to handle checkout. This checks if the quantity is over 0 if not it will show a error message if it is over it will go the the confirmation page
  const handleCheckout = () => {
    const hasInvalidQuantity = cartItems.some((item) => item.quantity <= 0);
    if (hasInvalidQuantity) {
      setErrorMessage(
        "Please make sure the quantity for all tickets is greater than 0."
      );
    } else {
      navigate("/confirmation");
    }
  };

  return (
    <Wrapper>
      <BackLink to="/">Back</BackLink>
      <h1>Ticket Purchase</h1>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {cartItems.length === 0 ? (
        <EmptyCartMessage>
          <BsCartX size={64} />
          <p>Your cart is empty</p>
        </EmptyCartMessage>
      ) : (
        <>
          {cartItems.map((item) => (
            <TicketItem key={item.id}>
              <TicketDetails>
                <h3>{item.title}</h3>
                <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                <p>Price: ${item.price}</p>
                <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  value={item.quantity}
                  onChange={(e) =>
                    handleTicketChange(item.id, parseInt(e.target.value))
                  }
                />
              </TicketDetails>
              <TicketActions>
                <RemoveButton onClick={() => handleRemoveTicket(item.id)}>
                  Remove
                </RemoveButton>
              </TicketActions>
            </TicketItem>
          ))}
          <TotalAmount>
            Total Amount: <BoldText>${calculateTotalAmount()}</BoldText>
          </TotalAmount>
          <CheckoutButton onClick={handleCheckout}>Checkout</CheckoutButton>
        </>
      )}
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.div`
  text-align: center;
`;

const BackLink = styled(Link)`
  margin-bottom: 1rem;
  display: inline-block;
  color: blue;
  text-decoration: none;
`;

const TicketItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  position: relative;
`;

const TicketDetails = styled.div`
  flex-grow: 1;
`;

const TicketActions = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RemoveButton = styled.button`
  background-color: #ff4c4c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
`;

const TotalAmount = styled.div`
  text-align: right;
  margin-top: 1rem;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const CheckoutButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-size: 24px;
`;

export default TicketPurchasePage;
