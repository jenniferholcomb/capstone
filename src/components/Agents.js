import React from "react";
import Weather from "./Weather";
//import ShortTermRental from "./ShortTermRental";
import Calendar from "./Calendar";
// import Events from "./Events";
// import Holidays from "./Holidays";
import styled from 'styled-components';
import PropertyListing from "./PropertyListing";

const AgentsWrapper = styled.section`
  grid-column: 3;
  width: 83%;
  height: auto;
  margin-right: 30px;
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 30px;
  display: grid;
`;

function Agents () {
  return (
    // <div id="agents">
      <AgentsWrapper>
        <Weather />
        {/* <ShortTermRental /> */}
        <PropertyListing />
        <Calendar />
        {/* <Events />
        <Holidays /> */}
      </AgentsWrapper>
    // </div>
  );
}

export default Agents;

