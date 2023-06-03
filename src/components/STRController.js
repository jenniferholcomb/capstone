import React, { useEffect, useState } from 'react';
import ShortTermRental from './ShortTermRental';
//import PropertyListing from './PropertyListing';
//import ListingDay from './ListingDay';
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
  const [getProperties, setGetProperties] = useStaet(false);
  //const [startLoading, setStartLoading] = useState(false);
  const [error, setError] = useState(null);


  // const [propLoaded, setPropLoaded] = useState(false);
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
        setPropertyList(properties);
      },
      (error) => {
        setError(error);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if(propertyList.length > 0) {
     
    } else {
      setGetProperties(true);
    }
  }, []);

  // const handleSendingProps = async (propertiesId) => {
  //   await addDoc(collection(db, "properties"), propertiesId);
  //   setPropLoaded(false);
  //   setSendProps(true);
  // };

  // const handleAvailabilityData = (listingData) => {
  //   setListingList(listingData);
  //   setListComplete(true);
  // }

  console.log(propertyList);

  if (error) {
    return ( 
      <ShortTermRentalWrapper>
        <h1>Error: {error}</h1>
      </ShortTermRentalWrapper> 
    );
  } else if (getProperties) {
    return (
      <ShortTermRentalWrapper>
        <ShortTermRental onGetProperties={handleSendingProps} />
      </ShortTermRentalWrapper>
    );
  // } else if (!propLoaded) {
  //   console.log('were moving')
  //   return (
  //     <ShortTermRentalWrapper>
  //       <ListingDay days={props.currentWeek} />        
  //     </ShortTermRentalWrapper>
  //   )

  } else {
    <ShortTermRentalWrapper>
      <h1>...Loading...</h1>
    </ShortTermRentalWrapper>
  }
}

export default STRController;
