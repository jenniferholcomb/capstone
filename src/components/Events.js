import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getEventsSuccess } from '../actions';
import EventsItem from './EventsItem';
import styled from 'styled-components';

const EventsWrapper = styled.section`
outline: 1px solid black;
border-radius: 10px;
  
`;

const initialState = {
  isLoaded: true,
  eventsList: [],
  error: null
};

function Events (props) {

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
  //       console.log(jsonifiedResponse);
  //       const action = getEventsSuccess(jsonifiedResponse._embedded.events)
  //       dispatch(action)
  //     })
  //     .catch((error) => {
  //       const action = getFetchFailure(error.message)
  //       dispatch(action)
  //     });
  // }, [])

  const { error, isLoaded, eventsList } = state;

  console.log(eventsList);

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
        <button className="exit" onClick={props.onExitEvents}>EXIT</button>
        <table>
          <tr>
            <th>DATE</th>
            <th>EVENT</th>
          </tr>
          <tr><td>May 19</td><td>Matchbox Twenty</td></tr>
          <tr><td>May 28</td><td>James Taylor</td></tr>
          <tr>
            <th>DATE</th>
            <th>HOLIDAY</th>
          </tr>
          <tr><td>May 22</td><td>Memorial Day</td></tr>
        </table>
      </EventsWrapper>
    );
  }
}

export default Events;


