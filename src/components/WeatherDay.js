import React from "react";
import PropTypes from 'prop-types';

function WeatherDay(props) {

  const { newForecast } = props;

  return (
    <React.Fragment>
      {newForecast.slice(0, 21).map((item, index) => 
        (index < 14) ? <div className={`wea-item-${index + 1}`} key={index}>{item}°</div>
        : 
        <div className={`wea-item-${index + 1}`} key={index}><img className="logo" src={require(`./../img/icons/${item}.png`)} alt={props.newForecast[index + 7]} /></div>       
      )}
    </React.Fragment>
  );
}

WeatherDay.propTypes = {
  newForecast: PropTypes.array
};

export default WeatherDay;
