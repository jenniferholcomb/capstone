import React, { useEffect, useReducer } from 'react';
import listingReducer from '../reducers/properties-reducer';
import { getListingFailure, getListingSuccess } from '../actions';
import styled from 'styled-components';

const ListingWrapper = styled.section`
  font-style: italic;
`;

const initialState = {
  isLoaded: false,
  listingAvailability: [],
  error: null
};

function Listing () {

  const [state, dispatch] = useReducer(propertiesReducer, initialState)

  useEffect(() => {
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
        {listingAvailability.forEach(available =>
          <p>available</p>
        )}
      </ListingWrapper>
    );
  }
}

export default Listing;
