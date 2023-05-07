import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getPropertiesSuccess, getListingSuccess } from '../actions';
// import Listing from './Listing';
import styled from 'styled-components';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
`;

const initialState = {
  isPropertiesLoaded: false,
  isListingLoaded: false,
  properties: [],
  listings: [],
  counter: 0,
  error: null
};

function ShortTermRental () {

  const [state, dispatch] = useReducer(agentsReducer, initialState);

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
        const action = getFetchFailure(error.message)
        dispatch(action)
      });
  }, [])

  const { error, isPropertiesLoaded, isListingLoaded, properties, counter, listings } = state;

  // need to loop through all listings and collect availability, calls at 1/second
  useEffect(() => {
    if (isPropertiesLoaded) {
      setInterval(() => {
        console.log(properties);
        console.log(counter);
        fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${properties[counter]}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
          } else {
            return response.json()
          }
        })
        .then((jsonifiedResponse) => {
          const action = getListingSuccess(jsonifiedResponse)
          dispatch(action)
        })
        .catch((error) => {
          const action = getFetchFailure(error.message)
          dispatch(action)
        });
      }, 2000);
      return () => {
        clearInterval(isPropertiesLoaded);
      };
    }
  }, [isPropertiesLoaded] )

  const handleAvailability = () => {
    properties.map( item => <p>item</p>)
  }
  // create a listener to check if properties !== []. If true make second api call 

  // const handleAvailabilityData = (availability) => {
  //   console.log(availability);
  // };
  console.log(listings);
  

  if (error) {
    return ( 
      <ShortTermRentalWrapper>
        <h1>Error: {error}</h1>
      </ShortTermRentalWrapper> 
    );
  } else if (!isListingLoaded) {
    return (
      <ShortTermRentalWrapper>

        <h1>...Loading...</h1>
      </ShortTermRentalWrapper>
    );
  } else {
    return (

      <ShortTermRentalWrapper>
  

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

