import React, { useEffect, useReducer } from 'react';
import propertiesReducer from '../reducers/properties-reducer';
import { getPropertiesFailure, getPropertiesSuccess } from '../actions';
// import Listing from './Listing';
import styled from 'styled-components';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
`;

const initialState = {
  isLoaded: false,
  properties: [],
  error: null
};

function ShortTermRental () {

  const [state, dispatch] = useReducer(propertiesReducer, initialState)

  useEffect(() => {
    fetch(`https://airdna1.p.rapidapi.com/properties?rapidapi-key=${process.env.REACT_APP_API_KEY}&location=bend`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        const action = getPropertiesSuccess(jsonifiedResponse.properties)
        dispatch(action)
      })
      .catch((error) => {
        const action = getPropertiesFailure(error.message)
        dispatch(action)
      });
  }, [])

  // const handleAvailabilityData = (availability) => {
  //   console.log(availability);
  // };

  const { error, isLoaded, properties } = state;

  if (error) {
    return ( 
      <ShortTermRentalWrapper>
        <h1>Error: {error}</h1>
      </ShortTermRentalWrapper> 
    );
  } else if (!isLoaded) {
    return (
      <ShortTermRentalWrapper>
        <h1>...Loading...</h1>
      </ShortTermRentalWrapper>
    );
  } else {
    return (

      <ShortTermRentalWrapper>
        <p>{properties}</p>

      </ShortTermRentalWrapper>
    );
  }
}

export default ShortTermRental;

        //  {properties.map(id => 
        //   <Listing 
        //   id={id}
        //   onAvailabilityCall = {handleAvailabilityData} />
        // )} 

        // <Listing 
        // id={properties[0]}
        // onAvailabilityCall = {handleAvailabilityData} />