import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getWeatherSuccess } from '../actions';
import styled from 'styled-components';
import WeatherDay from './WeatherDay';

const WeatherWrapper = styled.section`
  outline: 1px solid black;
  border-radius: 10px;
  display: grid;
  grid-row: 1;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0px;
  height: 170px;
`;

const initialState = {
  isLoaded: true,
  forecast: [],
  error: null
};

function Weather () {

  const [state, dispatch] = useReducer(agentsReducer, initialState)

  // useEffect(() => {
  //   fetch(`https://api.open-meteo.com/v1/forecast?latitude=44.06&longitude=-121.32&hourly=temperature_2m,precipitation_probability&temperature_unit=fahrenheit&forecast_days=14&timezone=America%2FLos_Angeles`)
    
  //   .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`${response.status}: ${response.statusText}`);
  //       } else {
  //         return response.json()
  //       }
  //     })
  //     .then((jsonifiedResponse) => {
  //       const action = getWeatherSuccess(jsonifiedResponse.list)
  //       dispatch(action)
  //     })
  //     .catch((error) => {
  //       const action = getFetchFailure(error.message)
  //       dispatch(action)
  //     });
  // }, [])

  const { error, isLoaded, forecast } = state;

  //console.log(forecast);

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
        <WeatherDay />
        {/* <p>{forecast}</p> */}

      </WeatherWrapper>
    );
  }
}

export default Weather;




