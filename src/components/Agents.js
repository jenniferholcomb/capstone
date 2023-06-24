import React, { useState, useEffect } from "react";
import Weather from "./Weather";
import STRController from "./STRController";
import Calendar from "./Calendar";
import Events from "./Events";
// import Holidays from "./Holidays";
import styled from 'styled-components';
//import PropertyListing from "./PropertyListing";

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

  const [days, setDays] = useState([]);

  useEffect(() => {
    const current = new Date().getDay();
    const d = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
    const week = d.slice(current).concat(d.slice(0, current));
    setDays(week);
  }, [])

  return (
    // <div id="agents">
      <AgentsWrapper>
        <Weather />
        <STRController currentWeek={days} />
        <Calendar currentWeek={days} />
        <Events />
      </AgentsWrapper>
    // </div>
  );
}

export default Agents;

