import React from "react";
import styled from "styled-components";
import logoArt from "./../img/BendSpoon.svg"

const HeaderWrapper = styled.section`
  grid-column: 1;
  grid-row: 1;
  margin-top: 10px;
  display: grid;
`;

const SubheadWrap = styled.section`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-bottom: 0px;
`;

const TagWrap = styled.section`

  font-size: 15px;
  font-weight: 500;
  color: rgba(100, 99, 99, .95);
  margin-top: 11px;
  padding-bottom: 2px;
  border-bottom: .5px solid;
  border-color:rgba(77, 76, 76, 0.25);
`;

const Empty = styled.section`
  width: 100%;
  display: inline-block;
`;

const LocWrap = styled.section`
  margin-top: 12px;
  margin-bottom: 14px;
  color: black;
  font-size: 20px;
  font-weight: 900;
`;

function Header () {
  return (
    <React.Fragment>
    <HeaderWrapper>
      <div className='img-container'>
        <img className="logo"src={logoArt} alt="Logo" />
        <SubheadWrap>
          <TagWrap>BENDING BUSINESS TO CUSTOMER FORECASTS </TagWrap>
          <Empty> </Empty>
          <LocWrap>BEND, OREGON</LocWrap>
        </SubheadWrap>
      </div>
    </HeaderWrapper>
    </React.Fragment>
  );
}

export default Header;