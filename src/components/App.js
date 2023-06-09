import React from 'react';
import GoodsControl from './GoodsControl';
import Agents from './Agents';
import styled from 'styled-components';

const BodyWrapper = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 375px 1fr 1fr;
  grid-template-rows: 200px 283px 282px;
`;

function App() {
  return (
    <div id="main-body">
      <BodyWrapper>
        <GoodsControl />
        <Agents />
      </BodyWrapper>
    </div>
  );
}

export default App;
