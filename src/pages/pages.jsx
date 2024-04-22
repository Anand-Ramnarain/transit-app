import React from "react";
import { Routes, Route } from "react-router-dom";
import AvailableRoutesPage from "./AvailableRoutesPage";
import RouteInformationPage from "./RouteInformationPage";
import TicketPurchasePage from "./TicketPurchasePage";
import ConfirmationPage from "./ConfirmationPage";
import Messages from "./Messages";
import { CartProvider } from "../context/CartContext";

const Pages = () => {
  return (
    // THis is to wrap routes in CartProvider to provide cart context to components
    <CartProvider>
      <Routes>
        <Route path="/" element={<AvailableRoutesPage />} />
        <Route path="/routes/:id" element={<RouteInformationPage />} />
        <Route path="/ticket-purchase" element={<TicketPurchasePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </CartProvider>
  );
};

export default Pages;
