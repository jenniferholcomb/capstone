import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getListingSuccess } from '../actions';  //getPropertiesSuccess
// import Listing from './Listing';
import styled from 'styled-components';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const initialState = {
  isPropertiesLoaded: true,
  isListingLoaded: false,
  properties: ['47700213', '48145151', '50636849', '574769491394496704', '45065826', '37282385', '15835761', '32240051', '43848210', '32292475'],
  listings: [],
  counter: 0,
  error: null
};

function ShortTermRental () {

  const [state, dispatch] = useReducer(agentsReducer, initialState);

  const { error, isPropertiesLoaded, isListingLoaded, properties, counter, listings } = state;

  // useEffect(() => {
  //   fetch(`https://airdna1.p.rapidapi.com/properties?rapidapi-key=${process.env.REACT_APP_API_KEY}&location=bend`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(`${response.status}: ${response.statusText}`);
  //       } else {
  //         return response.json()
  //       }
  //     })
  //     .then((jsonifiedResponse) => {
  //       const action = getPropertiesSuccess(jsonifiedResponse.properties)
  //       dispatch(action)
  //     })
  //     .catch((error) => {
  //       const action = getFetchFailure(error.message)
  //       dispatch(action)
  //     });
  // }, [])

  // useEffect(() => {
  //   if (isPropertiesLoaded) {
  //     setInterval(() => {
  //       fetch(`https://airbnb19.p.rapidap.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${properties[counter]}`)
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error(`${response.status}: ${response.statusText}`);
  //         } else {
  //           return response.json()
  //         }
  //       })
  //       .then((jsonifiedResponse) => {
  //         const action = getListingSuccess(jsonifiedResponse.data)
  //         dispatch(action)
  //       })
  //       .catch((error) => {
  //         const action = getFetchFailure(error.message)
  //         dispatch(action)
  //       });
  //     }, 2000);
  //     return () => {
  //       clearInterval(isPropertiesLoaded);
  //     };
  //   }
  // }, [] )

  // const handleAvailability = () => {
  //   properties.map( item => <p>item</p>)
  // }
  // create a listener to check if properties !== []. If true make second api call 

  // console.log(listings);
  

  if (error) {
    return ( 
      <ShortTermRentalWrapper>
        <h1>Error: {error}</h1>
      </ShortTermRentalWrapper> 
    );
  } else if (!isListingLoaded ) {
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

