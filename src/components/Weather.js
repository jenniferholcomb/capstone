import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getWeatherSuccess } from '../actions';
import styled from 'styled-components';
import WeatherDay from './WeatherDay';

const CompWrapper = styled.section`
  grid-row: 2;
`;

const WeatherWrapper = styled.section`
  outline: px solid white;
  border-radius: none;
  display: grid;
  grid-row: 1;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0px;
  height: 150px;
  background-color: rgb(247, 243, 236);
  box-shadow: 0 0px 10px 0 rgba(247, 243, 243, 0.459), -15px 20px 25px 0 rgba(77, 76, 76, 0.25);
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
  forecast: [51, 48, 50, 49, 52, 62, 64, 87, 82, 83, 81, 84, 90, 95, 'c02d', 'c01d', 'c02d', 'c02d', 'c02d', 'c02d', 'c02d', 'Few clouds', 'Clear Sky', 'Few clouds', 'Few clouds', 'Few clouds', 'Few clouds', 'Few clouds'],
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




