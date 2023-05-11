import React from "react";
// import Weather from "./Weather";
// import ShortTermRental from "./ShortTermRental";
// import Events from "./Events";
// import Holidays from "./Holidays";
import styled from 'styled-components';

const AgentsWrapper = styled.section`
  grid-column: 3;
  grid-row: 2 / span 2;
  outline: 1px solid black;
  margin-right: 30px;
  display: grid;
`;

function Agents () {
  return (
    // <div id="agents">
      <AgentsWrapper>
   
      </AgentsWrapper>
    // </div>
  );
}

export default Agents;

{/* <Weather />
<ShortTermRental />
<Events />
<Holidays /> */}