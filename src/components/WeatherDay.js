import React from "react";
import PropTypes from 'prop-types';

function WeatherDay(props) {

  const icon1 = require(`./../img/icons/${props.newForecast[2]}.png`);
  const icon2 = require(`./../img/icons/${props.newForecast[6]}.png`);
  const icon3 = require(`./../img/icons/${props.newForecast[10]}.png`);
  const icon4 = require(`./../img/icons/${props.newForecast[14]}.png`);
  const icon5 = require(`./../img/icons/${props.newForecast[18]}.png`);
  const icon6 = require(`./../img/icons/${props.newForecast[22]}.png`);
  const icon7 = require(`./../img/icons/${props.newForecast[26]}.png`);

  return (
    <React.Fragment>
      <div className="wea-item-1">{props.newForecast[0]}°</div>
      <div className="wea-item-2">{props.newForecast[4]}°</div>
      <div className="wea-item-3">{props.newForecast[8]}°</div>
      <div className="wea-item-4">{props.newForecast[12]}°</div>
      <div className="wea-item-5">{props.newForecast[16]}°</div>
      <div className="wea-item-6">{props.newForecast[20]}°</div>
      <div className="wea-item-7">{props.newForecast[24]}°</div>

      <div className="wea-item-8">{props.newForecast[1]}°</div>
      <div className="wea-item-9">{props.newForecast[5]}°</div>
      <div className="wea-item-10">{props.newForecast[9]}°</div>
      <div className="wea-item-11">{props.newForecast[13]}°</div>
      <div className="wea-item-12">{props.newForecast[17]}°</div>
      <div className="wea-item-13">{props.newForecast[21]}°</div>
      <div className="wea-item-14">{props.newForecast[25]}°</div>

      <div className="wea-item-15"><img className="logo"src={icon1} alt={props.newForecast[3]} /></div>
      <div className="wea-item-16"><img className="logo"src={icon2} alt={props.newForecast[7]} /></div>
      <div className="wea-item-17"><img className="logo"src={icon3} alt={props.newForecast[11]} /></div>
      <div className="wea-item-18"><img className="logo"src={icon4} alt={props.newForecast[15]} /></div>
      <div className="wea-item-19"><img className="logo"src={icon5} alt={props.newForecast[19]} /></div>
      <div className="wea-item-20"><img className="logo"src={icon6} alt={props.newForecast[23]} /></div>
      <div className="wea-item-21"><img className="logo"src={icon7} alt={props.newForecast[27]} /></div> 
    </React.Fragment>
  )
}

WeatherDay.propTypes = {
  newForecast: PropTypes.array
};

export default WeatherDay;