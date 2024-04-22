import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Pages from "./pages/pages";

function App() {
  return (
    <Router>
      <MainContainer>
        <Navbar />
        <ContentContainer>
          <Pages />
        </ContentContainer>
      </MainContainer>
    </Router>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  padding-top: 10rem; /* Adjust the value based on the height of your Navbar */
`;

export default App;
