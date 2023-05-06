import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getHolidaySuccess } from '../actions';
import styled from 'styled-components';

const HolidayWrapper = styled.section`
  border-bottom: 1px solid black;
`;

const initialState = {
  isLoaded: false,
  holidayList: [],
  error: null
};

function Holiday () {

  const [state, dispatch] = useReducer(agentsReducer, initialState)

  useEffect(() => {
    fetch(`https://calendarific.com/api/v2/holidays?&api_key=${process.env.REACT_APP_API_KEY_HOLIDAY}&country=US&year=2023`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        const action = getHolidaySuccess(jsonifiedResponse.response.holidays)
        dispatch(action)
      })
      .catch((error) => {
        const action = getFetchFailure(error.message)
        dispatch(action)
      });
  }, [])

  const { error, isLoaded, holidayList } = state;

  if (error) {
    return ( 
      <HolidayWrapper>
        <h1>Error: {error}</h1>
      </HolidayWrapper> 
    );
  } else if (!isLoaded) {
    return (
      <HolidayWrapper>
        <h1>...Loading...</h1>
      </HolidayWrapper>
    );
  } else {
    return (

      <HolidayWrapper>
        <p>{holidayList}</p>

      </HolidayWrapper>
    );
  }
}

export default Holiday;