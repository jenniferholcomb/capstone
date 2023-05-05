import React, { useEffect, useReducer } from 'react';
import weatherReducer from '../reducers/weather-reducer';
import { getWeatherFailure, getWeatherSuccess } from '../actions';
import styled from 'styled-components';

const WeatherWrapper = styled.section`
  border-bottom: 1px solid black;
`;

const initialState = {
  isLoaded: false,
  forecast: [],
  error: null
};

function Weather () {

  const [state, dispatch] = useReducer(weatherReducer, initialState)

  useEffect(() => {
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=44.06&lon=-121.32&appid=${process.env.REACT_APP_API_KEY2}&units=imperial`)
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

  const { error, isLoaded, forecast } = state;

  if (error) {
    return ( 
      <WeatherWrapper>
        <h1>Error: {error}</h1>
      </WeatherWrapper> 
    );
  } else if (!isLoaded) {
    return (
      <WeatherWrapper>
        <h1>...Loading...</h1>
      </WeatherWrapper>
    );
  } else {
    return (

      <WeatherWrapper>
        <p>{forecast}</p>

      </WeatherWrapper>
    );
  }
}

export default Weather;




