import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { BsCartCheck } from "react-icons/bs";
import { BiMessageSquare } from "react-icons/bi";
import { TbRouteSquare2 } from "react-icons/tb";
import { LiaRouteSolid } from "react-icons/lia";

// Functional component for the Navbar
const Navbar = () => {
  // State for tracking the number of items in the cart
  const [cartItemCount, setCartItemCount] = useState(0);
  // Get the current location using react-router's useLocation hook
  const location = useLocation();

  // Effect to update cart item count when the path changes
  useEffect(() => {
    // Retrieve cart items from local storage or initialize as an empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // Calculate total number of items in the cart
    const itemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    // Update cart item count state
    setCartItemCount(itemCount);
  }, [location.pathname]);

  /*This is the container the shows what need to be rendered and it's a holder for the links in the navbar to it take the user to the page they need to go to */

  return (
    <NavbarContainer>
      <LogoLink to="/">
        <Logo>
          <LiaRouteSolid />
          Transitting
        </Logo>
      </LogoLink>
      <NavLinks>
        <NavItem>
          <NavLink to="/" activeClassName="active">
            <TbRouteSquare2 />
            <h4>Available Routes</h4>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/ticket-purchase" activeClassName="active">
            <BsCartCheck />
            <h4>Cart {cartItemCount > 0 && `(${cartItemCount})`}</h4>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/messages" activeClassName="active">
            <BiMessageSquare />
            <h4>Messages</h4>
          </NavLink>
        </NavItem>
      </NavLinks>
    </NavbarContainer>
  );
};

// Styled components for the Navbar
const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  padding: 0.3rem;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.ul`
  list-style-type: none;
  display: flex;
  gap: 10px;
`;

const NavItem = styled.li`
  padding: 0.3rem;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(35deg, #494949, #313131);
  width: 1.5cm;
  height: 1.5rem;
  cursor: pointer;
  color: white;
  text-decoration: none;
  margin-right: 30px;

  h4 {
    display: none;
    color: white;
    font-size: 0.8rem;
  }

  svg {
    color: white;
    font-size: 1.5rem;
    transition: color 0.3s ease;
  }

  &:hover {
    h4 {
      display: block;
    }
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);

    svg {
      color: white;
    }
    h4 {
      display: block;
      background: linear-gradient(to right, #f27121, #e94057);
    }
  }
`;

export default Navbar;
