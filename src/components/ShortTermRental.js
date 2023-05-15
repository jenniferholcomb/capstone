import React, { useEffect, useReducer } from 'react';
import agentsReducer from '../reducers/agents-reducer';
import { getFetchFailure, getPropertiesSuccess, getListingSuccess, getDataPush, getDataSuccess, getDataFailure } from '../actions';  //getPropertiesSuccess
import Listing from './Listing';
import styled from 'styled-components';
import db from './../firebase.js';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const initialState = {
  isPropertiesLoaded: false,
  isListingLoaded: false,
  //properties: ['47700213', '48145151', '50636849', '574769491394496704', '45065826', '37282385', '15835761', '32240051', '43848210', '32292475'],
  properties: [],
  makeListingCall: false,
  listings: [],
  counter: 0,
  error: null
};

function ShortTermRental () {

  const [state, dispatch] = useReducer(agentsReducer, initialState);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "properties"),
      (collectionSnapshot) => {
        const properties = [];
        collectionSnapshot.forEach((doc) => {
          properties.push({
            propertyId: doc.data().propertyId,
            id: doc.id
          });
        });
        const action = getDataSuccess(properties); //
        dispatch(action);
      },
      (error) => {
        const action = getDataFailure(error.message);
        dispatch(action);
      }
    );

    return () => unSubscribe();
  }, []);


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


  useEffect(() => {
    if (isPropertiesLoaded) {
      properties.map(id => addDoc(collection(db, "properties"), id));
    }
    const action = getDataPush();
    dispatch(action);
  }, [])

  useEffect(() => {
    if (makeListingCall) {
      setInterval(() => {
        fetch(`https://airbnb19.p.rapidap.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${properties[counter]}`)
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
          const action = getFetchFailure(error.message)
          dispatch(action)
        });
      }, 2000);
      return () => {
        clearInterval(makeListingCall);
      };
    }
  }, [] )

  const handleAvailabilityData = () => {
    console.log("here in avail")
  }
  // create a listener to check if properties !== []. If true make second api call 

  const { error, isPropertiesLoaded, isListingLoaded, properties, makeListingCall, counter, listings } = state;
  console.log("props")
  console.log(properties);
  console.log("lists")
  console.log(listings);

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
        {properties.map(id => 
          <Listing 
            id={id}
            onAvailabilityCall = {handleAvailabilityData} />
        )} 

        
      </ShortTermRentalWrapper>
    );
  }
}

export default ShortTermRental;

