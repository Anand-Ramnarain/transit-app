import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCart } from "../context/CartContext";
import mockData from "../data/mockdata.json";

const RouteInformationPage = () => {
  // This is to get access to the cartItems and setCartItems from CartContext
  const { cartItems, setCartItems } = useCart();
  // This gets the route ID from URL parameters
  const { id } = useParams();
  // This finds the routees data in the mackdata.json file based on the ID
  const route = mockData.find((route) => route.id === id);
  // State for number of tickets
  const [numTickets, setNumTickets] = useState(1);
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(new Date());
  // State for tracking if item is added to cart
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Function to handle ticket purchase. and add the tickets and all relavant route data to the cart.
  const handleTicketPurchase = () => {
    setIsAddedToCart(true);
    const newTicket = {
      id: route.id,
      title: route.title,
      duration: route.duration,
      price: route.price,
      quantity: numTickets,
      date: selectedDate,
    };
    const updatedCartItems = [...cartItems, newTicket];
    setCartItems(updatedCartItems);
    // Reset isAddedToCart after 2 seconds. This is to show that the tickets have been added to the cart and to make it so more tickets can be added
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  return (
    <Wrapper>
      {/* Link to navigate back to the home page */}
      <BackLink to="/">Back</BackLink>
      <RouteDetails>
        <h1>{route.title}</h1>
        <p>Duration: {route.duration}</p>
        <p>Stops: {route.stops}</p>
        <p>Price: ${route.price}</p>
        <p>Description: {route.description}</p>
        {/* Input field for number of tickets */}
        <TicketInputWrapper>
          <label htmlFor="numTickets">Number of Tickets:</label>
          <TicketInput
            type="number"
            id="numTickets"
            min="1"
            value={numTickets}
            onChange={(e) => setNumTickets(parseInt(e.target.value))}
          />
        </TicketInputWrapper>
        {/* Date picker for selecting date */}
        <DatePickerWrapper>
          <label htmlFor="datepicker">Select Date:</label>
          <DatePicker
            id="datepicker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MM/dd/yyyy"
          />
        </DatePickerWrapper>
        {/* Button to handle ticket purchase */}
        <PurchaseButton onClick={handleTicketPurchase}>
          Purchase Tickets
        </PurchaseButton>
        {/* Confirmation message when item is added to cart */}
        {isAddedToCart && <CartConfirmation>Added to cart</CartConfirmation>}
      </RouteDetails>
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

const RouteDetails = styled.div`
  margin-top: 2rem;
`;

const TicketInputWrapper = styled.div`
  margin-top: 1rem;
`;

const TicketInput = styled.input`
  width: 50px;
`;

const DatePickerWrapper = styled.div`
  margin-top: 1rem;
`;

const PurchaseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
`;

const CartConfirmation = styled.div`
  margin-top: 1rem;
  color: green;
`;

export default RouteInformationPage;
