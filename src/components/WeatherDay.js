import React from "react";
import lightning from "./../img/lightning.png"
import sun from "./../img/sun.png"
import mostlyCloudy from "./../img/mostly-cloudy.png"
import mostlySunny from "./../img/mostly-sunny.png"

function WeatherDay () {
  return (
    <React.Fragment>
      <div className="wea-item-1">83°</div>
      <div className="wea-item-2">86°</div>
      <div className="wea-item-3">85°</div>
      <div className="wea-item-4">74°</div>
      <div className="wea-item-5">68°</div>
      <div className="wea-item-6">69°</div>
      <div className="wea-item-7">70°</div>
      <div className="wea-item-8">55°</div>
      <div className="wea-item-9">55°</div>
      <div className="wea-item-10">54°</div>
      <div className="wea-item-11">42°</div>
      <div className="wea-item-12">40°</div>
      <div className="wea-item-13">42°</div>
      <div className="wea-item-14">46°</div>
      <div className="wea-item-15"><img className="logo"src={mostlySunny} alt="mostly-sunny" /></div>
      <div className="wea-item-16"><img className="logo"src={lightning} alt="lightning" /></div>
      <div className="wea-item-17"><img className="logo"src={lightning} alt="lightning" /></div>
      <div className="wea-item-18"><img className="logo"src={mostlyCloudy} alt="mostly cloudy" /></div>
      <div className="wea-item-19"><img className="logo"src={mostlySunny} alt="mostly-sunny" /></div>
      <div className="wea-item-20"><img className="logo"src={mostlySunny} alt="mostly-sunny" /></div>
      <div className="wea-item-21"><img className="logo"src={sun} alt="sun" /></div>
    </React.Fragment>
  )
}

export default WeatherDay;