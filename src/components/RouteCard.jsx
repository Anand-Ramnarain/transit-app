import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

/*This create a card for each route, it uses the route and the id to get the relavant informtion t each route and it creates a link to when clicked it goes to the selected travels route's ID in the URL. */

const RouteCard = ({ route }) => {
  return (
    <Card>
      {/* Link to the individual route page  */}
      <Link to={`/routes/${route.id}`}>
        <h2>{route.title}</h2>
        <p>Duration: {route.duration}</p>
      </Link>
    </Card>
  );
};

// Styled components for the route card
const Card = styled.div`
  min-height: 10rem;
  border-radius: 1rem;
  overflow: hidden;
  margin: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  /* Style for the link within the card */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Hover effect for the card */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

export default RouteCard;
