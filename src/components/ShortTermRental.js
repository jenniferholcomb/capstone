import React, { useEffect, useReducer, useRef } from 'react';
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
  startLoading: false,
  isPropertiesLoaded: false,
  isListingLoaded: false,
  properties: [{propertyId:'47700213'}, {propertyId:'48145151'}, {propertyId:'50636849'}, {propertyId:'574769491394496704'}, {propertyId:'45065826'}, {propertyId:'37282385'}, {propertyId:'15835761'}, {propertyId:'32240051'}, {propertyId:'43848210'}, {propertyId:'32292475'}],
  //properties: [],
  makeListingCall: false,
  listings: [],
  counter: 0,
  error: null
};

function ShortTermRental () {
  const [state, dispatch] = useReducer(agentsReducer, initialState);
  const currentLoadedProp = useRef(state.isPropertiesLoaded);
  const currentProperties = useRef(state.properties);
  const currentListingCall = useRef(state.makeListingCall);
  const internalRef = useRef(null);

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
    if (startLoading) {
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
          dispatch(action);
        })
        .catch((error) => {
          const action = getFetchFailure(error.message)
          dispatch(action)
        });
    }
  }, [])


  useEffect(() => {
    console.log(currentLoadedProp.current)
    if (currentLoadedProp.current === true) {
      console.log("sending data")
      console.log(currentProperties)
      currentProperties.current.map(id => addDoc(collection(db, "properties"), id));
    }
    currentLoadedProp.current = false;
    // const action = getDataPush();
    // dispatch(action);
    currentListingCall.current = true;
  }, [])

  // useEffect(() => {
  //   console.log('currentlistingcall')
  //   console.log(currentListingCall.current)
  //   if (currentListingCall.current === true) {

  //     internalRef.current = setInterval(() => {
  //       console.log(properties[0].propertyId)
  //       fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=47700213`)
        
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error(`${response.status}: ${response.statusText}`);
  //         } else {
  //           return response.json()
  //         }
  //       })
  //       .then((jsonifiedResponse) => {
  //         currentListingCall.current = false;
  //         const action = getListingSuccess(jsonifiedResponse.data);
  //         dispatch(action);
  //       })
  //       .catch((error) => {
  //         const action = getFetchFailure(error.message)
  //         dispatch(action)
  //       });
  //      }, 2000);

  //     clearInterval(internalRef);
  //     internalRef.current = null;
  //   }
  // }, [])

  const handleAvailabilityData = () => {
    console.log("here in avail")
  }
  // create a listener to check if properties !== []. If true make second api call 

  const { error, startLoading, isPropertiesLoaded, isListingLoaded, properties, makeListingCall, counter, listings } = state;
  currentLoadedProp.current = isPropertiesLoaded;
  currentProperties.current = properties;
  currentListingCall.current = makeListingCall;
  console.log("making lising calllll")
  console.log(currentListingCall.current)
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
        <Listing 
         id={properties}
         onAvailabilityCall = {handleAvailabilityData} />

      </ShortTermRentalWrapper>
    );
  }
}

export default ShortTermRental;

// {properties.map(id => 
//   <Listing 
//     id={id}
//     onAvailabilityCall = {handleAvailabilityData} />
// )} 