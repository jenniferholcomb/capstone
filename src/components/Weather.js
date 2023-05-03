import React from "react";
import styled from 'styled-components';

const WeatherWrapper = styled.section`
  border-bottom: 1px solid black;
`;

function Weather () {
  return (
    <WeatherWrapper>
      <p>Weather</p>
    </WeatherWrapper>
  );
}

export default Weather;