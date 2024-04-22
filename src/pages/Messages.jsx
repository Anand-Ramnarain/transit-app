import React from "react";
import styled from "styled-components";
import { BiMessageRoundedX } from "react-icons/bi";

// This component is something i wanted to have in there but its not working
const Messages = () => {
  const messages = [];

  return (
    <Wrapper>
      {messages.length === 0 ? (
        <NoMessages>
          <BiMessageRoundedX size={48} />
          <p>You have no messages</p>
        </NoMessages>
      ) : (
        <MessageList></MessageList>
      )}
    </Wrapper>
  );
};

// Styled components
const Wrapper = styled.div`
  text-align: center;
`;

const NoMessages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-size: 24px;
`;

const MessageList = styled.div`
  /* Add styles for message list if needed */
`;

export default Messages;
