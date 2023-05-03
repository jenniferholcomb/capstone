import React from "react";
import styled from 'styled-components';

const EventsWrapper = styled.section`
  border-bottom: 1px solid black; 
`;

function Events () {
  return (
    <EventsWrapper>
      <p>Events</p>
    </EventsWrapper>
  );
}

export default Events;