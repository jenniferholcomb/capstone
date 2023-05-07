import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getListingSuccess } from '../actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListingWrapper = styled.section`
  font-style: italic;
`;

const initialState = {
  isLoaded: false,
  listingAvailability: [],
  error: null
};

const fetchData = async (id) => {
  console.log("herer");
  const response = await fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${id}`, {
    method: 'GET'
  });
  return response;
}

function Listing (props) {

  const [state, dispatch] = useReducer(agentsReducer, initialState);
  const id = props.id;

  useEffect(() => {
    setInterval(() => {
 
        const response = Promise.any(fetchData(id))
          .then(response => {
            if (!response.ok) {
              throw new Error(`${response.status}: ${response.statusText}`);
            } else {
              return response.json()
            }
          })
          .then((jsonifiedResponse) => {
            const action = getListingSuccess(jsonifiedResponse.data)
            console.log(action)
            dispatch(action)
          })
          .catch((error) => {
            const action = getFetchFailure(error.message)
            dispatch(action)
          });
    }, 2000);
    return () => {
      clearInterval(response);
    };
  }, [])

  const { error, isLoaded, listingAvailability } = state;

  if (error) {
    return ( 
      <ListingWrapper>
        <h1>Error: {error}</h1>
      </ListingWrapper> 
    );
  } else if (!isLoaded) {
    return (
      <ListingWrapper>
        <h1>...Loading...</h1>
      </ListingWrapper>
    );
  } else {
    return (
      <ListingWrapper>
       {props.onAvailabilityCall(listingAvailability)}
      </ListingWrapper>
    );
  };
}

Listing.propTypes = {
  id: PropTypes.string,
  onAvailabilityCall: PropTypes.func
};

export default Listing;
