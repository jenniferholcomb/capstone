import React from "react";
import Calendar from "./Calendar";
import styled from "styled-components";

const HeaderWrapper = styled.section`
  grid-column: 1 / span 3;
  grid-row: 1;
  outline: 1px solid black;
  margin-left: 30px;
  margin-top: 30px;
  margin-right: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

function Header () {
  return (
    <HeaderWrapper>
      <p>Header</p>
      <Calendar />
    </HeaderWrapper>
  );
}

export default Header;