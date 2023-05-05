import React, { useEffect, useReducer } from 'react';
import weatherReducer from '../reducers/weather-reducer';
import { getWeatherFailure, getWeatherSuccess } from '../actions';
import styled from 'styled-components';

const WeatherWrapper = styled.section`
  border-bottom: 1px solid black;
`;

const initialState = {
  isLoaded: false,
  properties: [],
  error: null
};

function Weather () {

  const [state, dispatch] = useReducer(weatherReducer, initialState)

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=bend,or,us&cnt=14&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        const action = getWeatherSuccess(jsonifiedResponse.list)
        dispatch(action)
      })
      .catch((error) => {
        const action = getWeatherFailure(error.message)
        dispatch(action)
      });
  }, [])
  return (
    <WeatherWrapper>
      <p>Weather</p>
    </WeatherWrapper>
  );
}

export default Weather;








function ShortTermRental () {



  // const handleAvailabilityData = (availability) => {
  //   console.log(availability);
  // };

  const { error, isLoaded, properties } = state;

  if (error) {
    return ( 
      <ShortTermRentalWrapper>
        <h1>Error: {error}</h1>
      </ShortTermRentalWrapper> 
    );
  } else if (!isLoaded) {
    return (
      <ShortTermRentalWrapper>
        <h1>...Loading...</h1>
      </ShortTermRentalWrapper>
    );
  } else {
    return (

      <ShortTermRentalWrapper>
        <p>{properties}</p>

      </ShortTermRentalWrapper>
    );
  }
}

export default ShortTermRental;
