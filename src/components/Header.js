import React from "react";
import styled from "styled-components";
import logoArt from "./../img/BendSpoon.svg"

const HeaderWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 1;
  
  margin-left: 80px;
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 170px;
  align-items: center;
`;

const ImgWrapper = styled.section`

`;

function Header () {
  return (
    <HeaderWrapper>
      <ImgWrapper>
        <img className="logo"src={logoArt} alt="Logo" />
      </ImgWrapper>
    </HeaderWrapper>
  );
}

export default Header;