import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListingDays from './ListingDays';
import db from '../firebase.js';
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
  outline: px solid white;
  border-radius: 10px;
  display: grid;
  grid-row: 1;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 14% 43% 43%;
  grid-gap: 0px;
  height: 150px;
  background-color: rgb(247, 243, 236);
`;
 
function PropertyListing (props) {
  const [error, setError] = useState(null);
  //const getListings = useRef(true);
  const [listingLoaded, setListingLoaded] = useState(false);
  const [fortnightAvail, setFortnightAvail] = useState(null);
  const listingsArr = useRef();
  const percentArr = useRef(null);

  const { days, properties } = props;
  // const properties = properties.slice(0,5);
  const propLength = useRef(properties.length);

  const loadListings = async () => {
    const unSubscribe = onSnapshot(
      collection(db, "listings"),
      (collectionSnapshot) => {
        const listings = [];
        collectionSnapshot.forEach((doc) => {
          listings.push({
            availability: doc.data().availability,
            id: doc.id
          });
        });
        setFortnightAvail(listings);
        percentArr.current = listings;
        // eslint-disable-next-line
        handleGetListingAvail();
      },
      (error) => {
        setError(error);
      }
    );
    return () => unSubscribe();
  }

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
        if(jsonifiedResponse.status === true) {
          parseData(jsonifiedResponse.data);
        } else {
          propLength.current = propLength.current - 1;
        }
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleGetListingAvail = () => {
    if (percentArr.current.length === 0) {
      properties.forEach((id, index) => {
        setTimeout(() => {
          apiCall(id);
        }, index * 750)
      })
    } else {
      setListingLoaded(true);
    }
  };

  const parseData = (newListings) => {
    const sixMonths = newListings.slice(0,6).reduce((array, month) => array.concat(month.days), []);
    const available = sixMonths.reduce((array, day) => array.concat(day.available), []);

    if (!listingsArr.current) {
      const availArr = available.map(item => [item]);
      listingsArr.current = availArr;
    } else {
      const availArr = listingsArr.current;
      const newAvailArr = availArr.map((item, index) => [...item, available[index]]);  
      listingsArr.current = newAvailArr;
    };

    console.log('availarr length', listingsArr.current[0].length)
    console.log('proplength length', propLength.current)

    if (listingsArr.current[0].length === propLength.current) {
      const finalArr = listingsArr.current.map(function(item) {
        return (
            item.reduce(function(tally, avail) {
            tally[avail] = (tally[avail] || 0) + 1;
             return tally; 
            }, {}))
      });
      const availability = finalArr.map(item => {
        if(item.false) {
          return (item.false/properties.length).toFixed(2).substring(2);
        } else {
          return '0';
        }
      });
      const dates = sixMonths.reduce((array, day) => array.concat(day.date), []);
      const finalObj = dates.reduce((accumulator, value, i) => {
        return {...accumulator, [value]: availability[i]};
      }, {});

      const today = new Date().toISOString().substring(0,10);
      const allMonths = dates.map(x => x.substring(0,7));
      const uniqueMonths = [...new Set(allMonths)];
      
      const filterMonth = uniqueMonths.map(item => {
        return {
          'date': today,
          'month': item.substring(5), 
          'year': item.substring(0,4),
          'datesPercent': Object.keys(finalObj).filter((key) => key.substring(0,7) === item).reduce((obj, key) => {
            return Object.assign(obj, {
              [key]: finalObj[key]
            });
        }, {})} 
      });
      console.log('fitler month', filterMonth);
      filterMonth.forEach(x => handleSendingAvail(x));
    }
  }
  
  const handleSendingAvail = async (percents) => {
    await addDoc(collection(db, "listings"), percents);
    loadListings();
    setListingLoaded(true);
  };

  useEffect(() => {
    loadListings();
  }, []);

  console.log(fortnightAvail);

  if (error) {
    return ( 
      <ListingWrapper>
        <h1>Error: {error}</h1>
      </ListingWrapper> 
    );
  } else if (listingLoaded) {
    return (
      <ListingWrapper>
         <NameWrapper>
          STR OCCUPANCY %
        </NameWrapper>
        <ElementWrapper>
          <ListingDays days={props.days} 
                       />
        </ElementWrapper>
      </ListingWrapper>
    );
  } else {
    return (
      <ListingWrapper>
        <h1>...Loading...</h1>
      </ListingWrapper>
    );
  }
}

PropertyListing.propTypes = {
  propIds: PropTypes.array,
  days: PropTypes.array,
};

export default PropertyListing;

// import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import ListingDays from './ListingDays';
// import db from './../firebase.js';
// import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

// const ListingWrapper = styled.section`
//   grid-row: 2;
//   margin-top: 20px;
// `;

// const NameWrapper = styled.section` 
//   display: grid;
//   justify-items: end;
//   font-size: 23px;
//   font-weight: bold;
//   font-style: italic;
// `;

// const ElementWrapper = styled.section`
//   outline: px solid white;
//   border-radius: 10px;
//   display: grid;
//   grid-row: 1;
//   grid-template-columns: repeat(7, 1fr);
//   grid-template-rows: 14% 43% 43%;
//   grid-gap: 0px;
//   height: 150px;
//   background-color: rgb(247, 243, 236);
// `;
 
// function PropertyListing (props) {
//   const [error, setError] = useState(null);
//   //const getListings = useRef(true);
//   const [listingLoaded, setListingLoaded] = useState(false);
//   const [availabilityNew, setAvailability] = useState();
//   const listingsArr = useRef();
//   const percentArr = useRef();
//   //const today = new Date().toISOString().substring(0,10);

//   const { days, properties } = props;
//   //const properties = propertiesAll.slice(0,5);
//   const propLength = useRef(properties.length);

//   const loadListings = async () => {
//     const unSubscribe = onSnapshot(
//       collection(db, "listings"),
//       (collectionSnapshot) => {
//         const listings = [];
//         collectionSnapshot.forEach((doc) => {
//           listings.push({
//             availability: doc.data().availability,
//             id: doc.id
//           });
//         });
//         setAvailability(listings);
//         percentArr.current = listings;
//         // eslint-disable-next-line
//         handleGetListingAvail();
//       },
//       (error) => {
//         setError(error);
//       }
//     );
//     return () => unSubscribe();
//   }

//   const apiCall = async (singleId) => {
//     await fetch(`https://airbnb19.p.rapidapi.com/api/v1/checkAvailability?rapidapi-key=${process.env.REACT_APP_API_KEY}&propertyId=${singleId}`) 
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`${response.status}: ${response.statusText}`);
//         } else {
//           return response.json();
//         }
//       })
//       .then((jsonifiedResponse) => {
//         if(jsonifiedResponse.status === true) {
//           parseData(jsonifiedResponse.data);
//         } else {
//           propLength.current = propLength.current - 1;
//         }
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   };

//   const handleGetListingAvail = () => {
//     console.log('here');
//     if (percentArr.current.length === 0) {
//       // const newListingCall = { date: today };

//       // setAvailability(newListingCall);
//       properties.forEach((id, index) => {
//         setTimeout(() => {
//           apiCall(id);
//         }, index * 750)
//       })
//     } else {
//       setListingLoaded(true);
//     }
//   };

//   const parseData = (newListings) => {
//     console.log("here we are")
//     const month = [...newListings.days[0], ...newListings.days[1]];
//     // const today = new Date().toISOString().substring(0,10);
//     // const index = twoMonths.map(e => e.date).indexOf(today);
//     // const fortnight = twoMonths.splice(index, 28);
//     const available = month.reduce((array, day) => array.concat(day.available), []);

//     const availArr = listingsArr.current;
//     available.forEach((item, index) => availArr[index].push(item));
//     listingsArr.current = availArr;

//     console.log('availArr', availArr);
//     console.log('availarr length', availArr[0].length)
//     console.log('proplength length', propLength.current)

//     if (availArr[0].length === propLength.current) {
//       const finalArr = availArr.map(function(item) {
//         return (
//             item.reduce(function(tally, avail) {
//             tally[avail] = (tally[avail] || 0) + 1;
//              return tally; 
//             }, {}))
//       });
//       const availability = finalArr.map(item => {
//         if(item.false) {
//           return (item.false/properties.length).toFixed(2).substring(2);
//         } else {
//           return '0';
//         }
//       });
//       console.log(availability);
//       //const propObj = {today, , availability};
//       handleSendingAvail({availability});
//     }
//   }
  
//   const handleSendingAvail = async (percents) => {
//     await addDoc(collection(db, "listings"), percents);
//     loadListings();
//     setListingLoaded(true);
//   };

//   useEffect(() => {
//     loadListings();
//   }, []);

//   console.log(availabilityNew);

//   if (error) {
//     return ( 
//       <ListingWrapper>
//         <h1>Error: {error}</h1>
//       </ListingWrapper> 
//     );
//   } else if (listingLoaded) {
//     return (
//       <ListingWrapper>
//          <NameWrapper>
//           STR OCCUPANCY %
//         </NameWrapper>
//         <ElementWrapper>
//           <ListingDays days={props.days} 
//                       listings={availabilityNew} />
//         </ElementWrapper>
//       </ListingWrapper>
//     );
//   } else {
//     return (
//       <ListingWrapper>
//         <h1>...Loading...</h1>
//       </ListingWrapper>
//     );
//   }
// }

// PropertyListing.propTypes = {
//   propIds: PropTypes.array,
//   days: PropTypes.array,
// };

// export default PropertyListing;


// // const [openUserListingForms, setOpenUserListingForms] = useState({})
// // const handleEditClick = (ulId) => {
// //   const newids = { ...openUserListingForms };
// //   newids[ulId] = true;
// //   setOpenUserListingForms(newids);
// // };

// // const handleCancelClick = (ulId) => {
// //   const newids = { ...openUserListingForms };
// //   delete newids[ulId];
// //   setOpenUserListingForms(newids);
// // };