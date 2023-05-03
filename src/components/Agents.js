import React from "react";
import Weather from "./Weather";
import ShortTermRental from "./ShortTermRental";
import Events from "./Events";
import Holidays from "./Holidays";

function Agents () {
  return (
    <div id="agents">
      <React.Fragment>
        <Weather />
        <ShortTermRental />
        <Events />
        <Holidays />
      </React.Fragment>
    </div>
  );
}

export default Agents;