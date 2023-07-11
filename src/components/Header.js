import React from "react";
import logoArt from "./../img/BendSpoon.svg"
import "./Header.scss";

function Header () {
  return (
    <>
      <div className="header-wrapper">
        <div className='img-container'>
          <img className="logo"src={logoArt} alt="Logo" />
          <div className="subhead-wrap">
            <div className="tag-wrap">BENDING BUSINESS TO CUSTOMER FORECASTS </div>
            <div className="empty"> </div>
            <div className="loc-wrap">BEND, OREGON</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;