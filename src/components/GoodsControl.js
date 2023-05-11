import React from "react";
import Header from "./Header";
import CurrentDay from "./CurrentDay";
import GoodsDetail from "./GoodsDetail";

function GoodsControl () {
  return (
    <React.Fragment>
      <Header />

      <GoodsDetail />
    </React.Fragment>
  );
}

export default GoodsControl;
