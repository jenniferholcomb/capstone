import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getWeatherSuccess } from '../actions';
import styled from 'styled-components';
import WeatherDay from './WeatherDay';

const CompWrapper = styled.section`
  grid-row: 1;
`;

const WeatherWrapper = styled.section`
  outline: px solid white;
  border-radius: 10px;
  display: grid;
  grid-row: 1;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0px;
  height: 150px;
  background-color: rgb(247, 243, 236);
`;

const NameWrapper = styled.section` 
  display: grid;
  justify-items: end;
  font-size: 23px;
  font-weight: bold;
  font-style: italic;
`;

// const ElementWrapper = styled.section`
// outline: 1px solid black;
// border-radius: 10px;
// display: grid;
// grid-template-columns: repeat(7, 1fr);
// grid-gap: 0px;
// height: 170px;
// `;

const initialState = {
  // isLoaded: false,
  // forecast: [],

  isLoaded: true,
  forecast: [36, 41, 44, 48, 51, 58, 59, 64, 69, 75, 79, 81, 83, 80, 'c02d', 'c01d', 'c02d', 'c02d', 'c02d', 'c02d', 'c02d', 'Few clouds', 'Clear Sky', 'Few clouds', 'Few clouds', 'Few clouds', 'Few clouds', 'Few clouds'],
  error: null
};

function Weather () {

  const [state, dispatch] = useReducer(agentsReducer, initialState)
  

  // useEffect(() => {
  //   fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=Bend,OR&key=${process.env.REACT_APP_API_KEY_WEATHER}&units=I&days=7`)
  //   .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`${response.status}: ${response.statusText}`);
  //       } else {
  //         return response.json()
  //       }
  //     })
  //     .then((jsonifiedResponse) => {
  //       console.log(jsonifiedResponse)
  //       const action = getWeatherSuccess(jsonifiedResponse.data)
  //       dispatch(action)
  //     })
  //     .catch((error) => {
  //       const action = getFetchFailure(error.message)
  //       dispatch(action)
  //     });
  // }, [])

  const { error, isLoaded, forecast } = state;

  console.log(forecast);

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
      <CompWrapper>
        <WeatherWrapper>
          <WeatherDay newForecast={forecast}/>
        </WeatherWrapper>
      </CompWrapper>
    );
  }
}

export default Weather;




