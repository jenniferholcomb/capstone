import React, { useEffect, useState } from 'react';
import Listing from './PropertyListing';
import styled from 'styled-components';
import db from './../firebase.js';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const ShortTermRentalWrapper = styled.section`
  border-bottom: 1px solid black; 
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

function ShortTermRental () {
  const initialProperties = [{propertyId:'47700213'}, {propertyId:'48145151'}, {propertyId:'50636849'}, {propertyId:'574769491394496704'}, {propertyId:'45065826'}, {propertyId:'37282385'}, {propertyId:'15835761'}, {propertyId:'32240051'}, {propertyId:'43848210'}, {propertyId:'32292475'}];
  
  const [startLoading, setStartLoading] = useState(true);
  const [propLoaded, setPropLoaded] = useState(false);
  const [sendProps, setSendProps] = useState(false);
  const [propertyList, setPropertyList] = useState(initialProperties);
  const [listComplete, setListComplete] = useState(false);
  const [listingList, setListingList] = useState(null);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const unSubscribe = onSnapshot(
  //     collection(db, "properties"),
  //     (collectionSnapshot) => {
  //       const properties = [];
  //       collectionSnapshot.forEach((doc) => {
  //         properties.push({
  //           propertyId: doc.data().propertyId,
  //           id: doc.id
  //         });
  //       });
  //       setPropertyList(properties);
        
  //     },
  //     (error) => {
  //       setError(error);
  //     }
  //   );
  //   return () => unSubscribe();
  // }, []);


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
          handlePropertiesSuccess(jsonifiedResponse.properties); // update code with logic in reducer when start making airdna calls
        })
        .catch((error) => {
          setError(error)
        });
    }
  }, [])

  const handlePropertiesSuccess = (freshProperties) => {
    console.log("fresh properties");
    const handleFilteringProperties = freshProperties.filter(listing => listing.platforms.airbnb_property_id !== null 
      && listing.room_type === "Entire home/apt"
      && listing.latitude < 44.10125
      && listing.latitude > 44.03699
      && listing.longitude > -121.36035
      && listing.longitude < -121.27744);
    
    const propertiesId = handleFilteringProperties.reduce((array, listing) => array.concat(listing.airbnb_property_id), []);

    setPropertyList(propertiesId);
    setStartLoading(false);
    //setPropLoaded(true);
    setSendProps(true)
  };

  // useEffect(() => {
  //   if (propLoaded) {
  //     console.log("sending data")
  //     console.log(propertyList)
  //     propertyList.map(id => addDoc(collection(db, "properties"), id));
  //   }
  //   setPropLoaded(false);
  //   setSendProps(true);
  // }, [propLoaded])

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
  } else if (sendProps) {
    console.log('were moving')
    return (
      <ShortTermRentalWrapper>


      </ShortTermRentalWrapper>
    )
  } else if (!propLoaded) {
    return (
      <ShortTermRentalWrapper>

        <h1>...Loading...</h1>
      </ShortTermRentalWrapper>
    );
  } else {
    <p>somethings wrong</p>
  }
}

export default ShortTermRental;


// {properties.map(id => 
//   <Listing 
//     id={id}
//     onAvailabilityCall = {handleAvailabilityData} />
// )} 

// const newProperties = action.properties.filter(listing => listing.platforms.airbnb_property_id !== null 
//   && listing.room_type === "Entire home/apt"
//   && listing.latitude < 44.10125
//   && listing.latitude > 44.03699
//   && listing.longitude > -121.36035
//   && listing.longitude < -121.27744);

