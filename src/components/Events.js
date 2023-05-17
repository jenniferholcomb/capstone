import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getEventsSuccess } from '../actions';
import EventsItem from './EventsItem';
import styled from 'styled-components';

const EventsWrapper = styled.section`
  border-bottom: 1px solid black; 
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const initialState = {
  isLoaded: false,
  eventsList: [],
  error: null
};

function Events () {

  const [state, dispatch] = useReducer(agentsReducer, initialState)

  // useEffect(() => {
  //   fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${process.env.REACT_APP_API_KEY_TICKET}&postalCode=97701&radius=20&locale=*&endDateTime=2023-05-21T15:01:00Z`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`${response.status}: ${response.statusText}`);
  //       } else {
  //         return response.json()
  //       }
  //     })
  //     .then((jsonifiedResponse) => {
  //       const action = getEventsSuccess(jsonifiedResponse._embedded.events)
  //       dispatch(action)
  //     })
  //     .catch((error) => {
  //       const action = getFetchFailure(error.message)
  //       dispatch(action)
  //     });
  // }, [])

  const { error, isLoaded, eventsList } = state;

  if (error) {
    return ( 
      <EventsWrapper>
        <h1>Error: {error}</h1>
      </EventsWrapper> 
    );
  } else if (!isLoaded) {
    return (
      <EventsWrapper>
        <h1>...Loading...</h1>
      </EventsWrapper>
    );
  } else {
    return (

      <EventsWrapper>
        <p>{eventsList}</p>

      </EventsWrapper>
    );
  }
}

export default Events;


