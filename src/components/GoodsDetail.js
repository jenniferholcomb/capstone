import React from "react";
import styled from 'styled-components';

const GoodsDetailWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  outline: 1px solid black;
  margin-left: 30px;
`;

function GoodsDetail () {
  return (
    <GoodsDetailWrapper>
      <p>Goods Detail</p>
    </GoodsDetailWrapper>
  );
}

export default GoodsDetail;