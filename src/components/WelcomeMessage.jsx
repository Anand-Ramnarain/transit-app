import React from 'react';
import styled from 'styled-components';

const WelcomeMessage = () => {
  return (
    <Wrapper>
      <h1>Welcome to Transsitting</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin-top: 4rem; /* Adjust the margin as needed */
`;

export default WelcomeMessage;
