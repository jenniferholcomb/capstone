import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListingDay from './ListingDay';

const ListingWrapper = styled.section`
  grid-row: 2;
  margin-top: 20px;
`;

const NameWrapper = styled.section` 
  display: grid;
  justify-items: end;
  font-size: 23px;
  font-weight: bold;
  font-style: italic;
`;

const ElementWrapper = styled.section`
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 14% 43% 43%;
  grid-gap: 0px;
  height: 150px;
  background-color: rgb(247, 243, 236);
`;

//const initialProperties = [{propertyId:'47700213'}, {propertyId:'48145151'}, {propertyId:'50636849'}, {propertyId:'574769491394496704'}, {propertyId:'45065826'}, {propertyId:'37282385'}, {propertyId:'15835761'}, {propertyId:'32240051'}, {propertyId:'43848210'}, {propertyId:'32292475'}];
 
function PropertyListing (props) {
 
  const [loaded, setLoaded] = useState(true);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${47700213}`) 
    .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        } else {
          return response.json();
        }
      })
      .then((jsonifiedResponse) => {
        parseData(jsonifiedResponse.data[0].days)
      })
      .catch((error) => {
        setError(error);
      });
  }, [])

  const parseData = (newListings) => {
    const today = new Date().toISOString().substring(0,10);
    const index = newListings.map(e => e.date).indexOf(today);
    const fortnight = newListings.splice(index, 14);
    const available = fortnight.reduce((array, day) => array.concat(day.available), []);
    setListings(available);
    setLoaded(true);
  }
  
  console.log(listings);
  //console.log(listings[0].available);

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
         <NameWrapper>
          STR OCCUPANCY %
        </NameWrapper>
        <ElementWrapper>
          <ListingDay days={props.currentWeek} />
        </ElementWrapper>
      </ListingWrapper>
    );
  }
}

PropertyListing.propTypes = {
  currentWeek: PropTypes.array
};

export default PropertyListing;


// const oneMonthAvailable = action.listings[0].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
// console.log(action.listings);
// const twoMonthAvailable = action.listings.data[0].days;
// console.log('month available')
// console.log(twoMonthAvailable);
// const twoMonthAvailable = action[1].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
// const daysAvailable = oneMonthAvailabile.concat(twoMonthAvailable);
// const today = new Date().toISOString().substring(0,10);
// const twoWeeks = daysAvailable.slice(daysAvailable.indexOf(today), daysAvailable.indexOf(today)+28).filter((e, i) =>  i % 2 !== 0);
