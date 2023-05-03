import React from "react";
import Calendar from "./Calendar";

function Header () {
  return (
    <div id="header">
      <React.Fragment>
        <p>Header</p>
        <Calendar />
      </React.Fragment>
    </div>
  );
}

export default Header;