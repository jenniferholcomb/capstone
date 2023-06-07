import React, { useEffect, useState, useRef } from 'react';
//import ShortTermRental from './ShortTermRental';
import PropertyListing from './PropertyListing';
import ListingDay from './ListingDay';
import styled from 'styled-components';
import db from './../firebase.js';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

function STRController (props) {

  const [propertyList, setPropertyList] = useState(null);
  const [listingList, setListingList] = useState(null);
  //const [getProperties, setGetProperties] = useState(false);
  const [propLoaded, setPropLoaded] = useState(false);
  const [listingLoaded, setListingLoaded] = useState(false);
  const [error, setError] = useState(null);
  const currPropList = useRef(null);

  // const [startLoading, setStartLoading] = useState(false);
  // const [sendProps, setSendProps] = useState(false);
  // const [listComplete, setListComplete] = useState(false);
  // const [listingList, setListingList] = useState(null);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "properties"),
      (collectionSnapshot) => {
        const properties = [];
        collectionSnapshot.forEach((doc) => {
          properties.push({
            propertyId: doc.data().propertiesId,
            date: doc.data().date,
            id: doc.id
          });
        });
        console.log(properties)
        currPropList.current = properties;
        handleGetProperties();
      },
      (error) => {
        setError(error);
      }
    );
    return () => unSubscribe();
  }, []);

  const handleGetProperties = async () => {
    if (currPropList.current.length === 0) {
      await fetch(`https://airdna1.p.rapidapi.com/properties?rapidapi-key=${process.env.REACT_APP_API_KEY}&location=bend`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json()
        }
      })
      .then((jsonifiedResponse) => {
        handlePropertiesSuccess(jsonifiedResponse.properties); // update code with logic in reducer when start making airdna calls
        console.log('effect')
      })
      .catch((error) => {
        setError(error)
      });
    } else {
      setPropLoaded(true);
    }
  }

  const handlePropertiesSuccess = (freshProperties) => {
    const handleFilteringProperties = freshProperties.filter(listing => listing.platforms.airbnb_property_id !== null 
      && listing.room_type === "Entire home/apt"
      && listing.latitude < 44.10125
      && listing.latitude > 44.03699
      && listing.longitude > -121.36035
      && listing.longitude < -121.27744);
    
    const propertiesId = handleFilteringProperties.reduce((array, listing) => array.concat(listing.airbnb_property_id), []);
    const date = new Date().toISOString().substring(0,10);
    const propObj = {date, propertiesId};
    
        // setGetProperties(false);
    currPropList.current = propObj;
    handleSendingProps(propObj);
  };

  const handleSendingProps = async (propertiesId) => {
    await addDoc(collection(db, "properties"), propertiesId);
    setPropLoaded(true);
  };

  console.log(currPropList.current);

  if (error) {
    return ( 
      <ShortTermRentalWrapper>
        <h1>Error: {error}</h1>
      </ShortTermRentalWrapper> 
    );
  } else if (propLoaded) {
    return (
      <ShortTermRentalWrapper>
        <PropertyListing days={props.currentWeek} 
                         propIds={currPropList.current} />        
      </ShortTermRentalWrapper>
    );
  } else {
    return (
      <ShortTermRentalWrapper>
        <h1>...Loading...</h1>
      </ShortTermRentalWrapper>
    );
  }
}

export default STRController;
