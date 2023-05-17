import React from "react";
import Weather from "./Weather";
import PropertyListing from "./PropertyListing";
import Calendar from "./Calendar";
// import Events from "./Events";
// import Holidays from "./Holidays";
import styled from 'styled-components';

const AgentsWrapper = styled.section`
  grid-column: 3;
  grid-row: 1  / span 3;

  margin-right: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  display: grid;
`;

function Agents () {
  return (
    // <div id="agents">
      <AgentsWrapper>
        <Weather />
        <PropertyListing />
        <Calendar />
        {/* <Events />
        <Holidays /> */}
      </AgentsWrapper>
    // </div>
  );
}

export default Agents;

