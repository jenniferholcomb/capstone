import React from 'react';
import GoodsControl from './GoodsControl';
import Agents from './Agents';

function App() {
  return (
    <div id="main-body">
      <React.Fragment>
        <GoodsControl />
        <Agents />
      </React.Fragment>
    </div>
  );
}

export default App;
