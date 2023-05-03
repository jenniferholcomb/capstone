import React from "react";
import styled from 'styled-components';

const HolidayWrapper = styled.section`
  border-bottom: 1px solid black; 
`;

function Holidays () {
  return (
    <HolidayWrapper>
      <p>Holidays</p>
    </HolidayWrapper>
  );
}

export default Holidays;