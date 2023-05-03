import React from "react";
import styled from 'styled-components';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
`;

function ShortTermRental () {
  return (
    <ShortTermRentalWrapper>
      <p>Short Term Rental</p>
    </ShortTermRentalWrapper>
  );
}

export default ShortTermRental;