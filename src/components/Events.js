import React, { useEffect, useReducer } from 'react';
import eventsReducer from '../reducers/events-reducer';
import { getEventFailure, getEventSuccess } from '../actions';
import styled from 'styled-components';

const EventsWrapper = styled.section`
  border-bottom: 1px solid black; 
`;

const initialState = {
  isLoaded: false,
  eventsList: [],
  error: null
};

function Events () {

  const [state, dispatch] = useReducer(eventsReducer, initialState)

  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.REACT_APP_API_KEY_TICKET}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        const action = getEventsSuccess(jsonifiedResponse._embedded.events)
        dispatch(action)
      })
      .catch((error) => {
        const action = getEventsFailure(error.message)
        dispatch(action)
      });
  }, [])

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


