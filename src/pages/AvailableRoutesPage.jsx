import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar'; 
import RouteCard from '../components/RouteCard'; 
import { useCart } from '../context/CartContext'; 
import mockData from '../data/mockdata.json';

const AvailableRoutesPage = () => {
  // Accessing cartItems from CartContext using custom hook
  const { cartItems } = useCart(); 

  return (
    <Wrapper>
      <Navbar />
      <Content>
        <WelcomeMessage>Welcome to Transsitting</WelcomeMessage>
        <Heading>Available Routes</Heading>
        <RouteList>
          {/* Mapping over mock data to render RouteCard components by the ID. To display each route*/}
          {mockData.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </RouteList>
      </Content>
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.div`
  text-align: center;
`;

const Content = styled.div`
  margin-top: 2rem;
`;

const WelcomeMessage = styled.h1`
  margin-bottom: 2rem;
`;

const Heading = styled.h2`
  text-align: left;
  margin-bottom: 1rem;
`;

const RouteList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

export default AvailableRoutesPage;
