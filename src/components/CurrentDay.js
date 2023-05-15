import React from "react";
import styled from 'styled-components';

const CurrentDayWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 2;
  outline: 1px solid black;
  margin-left: 30px;
`;

function CurrentDay () {
  return (
    <CurrentDayWrapper>
      <p>Current Day</p>
    </CurrentDayWrapper>
  );
}

export default CurrentDay;

