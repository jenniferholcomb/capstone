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
  //isLoaded: false,
  //forecast: [],

  isLoaded: true,
  forecast: [67, 36, 'c02d', 'Few clouds', 69, 42, 'c02d', 'Few clouds', 75, 45, 'c02d', 'Few clouds', 78, 50, 'c02d', 'Few clouds', 81, 52, 'c02d', 'Few clouds', 84, 55, 'r02d', 'Moderate rain', 77, 55, 'c03d', 'Broken clouds'],
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




