import React, { useEffect, useState, useRef } from 'react';
//import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListingWrapper = styled.section`
  font-style: italic;
`;
//const initialProperties = [{propertyId:'47700213'}, {propertyId:'48145151'}, {propertyId:'50636849'}, {propertyId:'574769491394496704'}, {propertyId:'45065826'}, {propertyId:'37282385'}, {propertyId:'15835761'}, {propertyId:'32240051'}, {propertyId:'43848210'}, {propertyId:'32292475'}];
 
function PropertyListing (props) {
 
  const [loaded, setLoaded] = useState(false);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const currLoaded = useRef(false);

  useEffect(() => {
    console.log("here");
        fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${47700213}`) 
        .then((response) => {
            if (!response.ok) {
              throw new Error(`${response.status}: ${response.statusText}`);
            } else {
              return response.json();
            }
          })
          .then((jsonifiedResponse) => {
            setListings(jsonifiedResponse.data[0].days);
            setLoaded(true);
          })
          .catch((error) => {
            setError(error);
          });
      //}, 2000);
      // return () => {
      //   clearInterval(response);
      // };
      
  }, [])

  const parseData = (newListings) => {
    const oneMonthAvailable = newListings[0].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
    const twoMonthAvailable = newListings[0].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
    setListings([...oneMonthAvailable, ...twoMonthAvailable]);
  }

  // const fetchData = async (id) => {
  //   console.log("herer");
  //   console.log(id)
  //   const response = await fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${id}`, {
  //     method: 'GET'
  //   });
  //   return response;
  // }
 

 console.log("fresh data")

//  const newListings = listings;
//  console.log(listings);
//  const new2Listings = newListings[0];
 const nn = listings[1].days[0].available;
 //const new3Listings = new2Listings
 
  if (error) {
    return ( 
      <ListingWrapper>
        <h1>Error: {error}</h1>
      </ListingWrapper> 
    );
  } else if (!loaded) {
    return (
      <ListingWrapper>
        <h1>...Loading...</h1>
      </ListingWrapper>
    );
  } else {
    return (
      <ListingWrapper>
       <p>e</p>
      </ListingWrapper>
    );
  }
}



export default PropertyListing;
