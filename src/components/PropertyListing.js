import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListingDay from './ListingDay';
import db from './../firebase.js';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

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
 
function PropertyListing (props) {
  const fornightList = Array.from({length: 14}, () => ([]));

  const [availability, setAvailability] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [error, setError] = useState(null);
  const getListings = useRef(true);
  const listingsArr = useRef(fornightList);

  const properties = props.propIds[0].propertyId.slice(0, 25);
  console.log(properties)

  const apiCall = async (singleId) => {
    await fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${singleId}`) 
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
  }

  useEffect(() => {
    if (getListings) {
      properties.forEach((id, index) => {
        setTimeout(() => {
          apiCall(id);
        }, index * 750)
      })
    }
    getListings.current = false;
  }, [])

  const parseData = (newListings) => {
    const today = new Date().toISOString().substring(0,10);
    const index = newListings.map(e => e.date).indexOf(today);
    const fortnight = newListings.splice(index, 14);
    const available = fortnight.reduce((array, day) => array.concat(day.available), []);

    const availArr = listingsArr.current;
    available.forEach((item, index) => availArr[index].push(item));
    listingsArr.current = availArr;
    console.log(availArr)

    if (availArr[0].length === properties.length) {
      const finalArr = availArr.map(function(item) {
        return (
            item.reduce(function(tally, avail) {
            tally[avail] = (tally[avail] || 0) + 1;
             return tally; 
            }, {}))
      });
      const percentArr = finalArr.map(item => {
        if(item.true) {
          return (item.true/properties.length).toFixed(2).substring(2);
        } else {
          return '0';
        }
      });
      console.log(percentArr);
      //setAvailability(percentArr);
    }
    //setListings( ? );
    // NEXT! push available to array

    // setListings(newListingsAvailable);
    // setLoaded(true);
  }
  
  console.log(availability);

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
          <ListingDay days={props.days} />
        </ElementWrapper>
      </ListingWrapper>
    );
  }
}

PropertyListing.propTypes = {
  propIds: PropTypes.array,
  days: PropTypes.array,
};

export default PropertyListing;
