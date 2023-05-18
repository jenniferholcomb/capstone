import React from "react";
import styled from "styled-components";
import logoArt from "./../img/BendSpoon.svg"

const HeaderWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 1;
  
  margin-left: 40px;
  margin-top: 30px;
  display: flex;
  grid-template-columns: repeat(3, 1fr);
  height: 170px;
  align-items: center;
`;

const LinerWrapper = styled.section`
  
`;

// const ImgWrapper = styled.section`
//   background: ${logoArt}:
// `;

function Header () {
  return (
    <React.Fragment>
    <HeaderWrapper>
      <div className='img-container'>
        <img className="logo"src={logoArt} alt="Logo" />
        <div></div>
      </div>
    </HeaderWrapper>
    </React.Fragment>
  );
}

export default Header;