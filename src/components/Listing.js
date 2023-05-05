import React, { useEffect, useReducer } from 'react';
import listingReducer from '../reducers/listing-reducer';
import { getListingFailure, getListingSuccess } from '../actions';
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

function Listing (props) {

  const [state, dispatch] = useReducer(listingReducer, initialState);
  const id = props.id;

  useEffect(() => {
    setInterval(() => {
      console.log("herer");
      fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${id}`, {
        method: 'GET'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          } else {
            return response.json()
          }
        })
        .then((jsonifiedResponse) => {
          const action = getListingSuccess(jsonifiedResponse.data)
          dispatch(action)
        })
        .catch((error) => {
          const action = getListingFailure(error.message)
          dispatch(action)
        });
    }, 2000);

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
  id: PropTypes.array,
  onAvailabilityCall: PropTypes.func
};

export default Listing;
