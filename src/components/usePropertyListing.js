import { useEffect, useState, useRef } from 'react';
import db from '../firebase.js';
import { collection, addDoc, onSnapshot } from 'firebase/firestore'; // doc, deleteDoc, updateDoc, 
// import useSTRController from "./useSTRController.js";
 
function usePropertyListing (properties) {
  // const [properties] = useSTRController(); // propError
  const [error, setError] = useState(null);
  const [listingAvailability, setListingAvailability] = useState(null);

  const listingsArr = useRef();
  const percentArr = useRef(null);
  const propLength = useRef();

  const loadListings = async () => {
    const unSubscribe = onSnapshot(
      collection(db, "listings"),
      (collectionSnapshot) => {
        const listings = [];
        collectionSnapshot.forEach((doc) => {
          listings.push({
            date: doc.data().date,
            availability: doc.data().datesPercent,
            month: parseInt(doc.data().month),
            year: doc.data().year,
            id: doc.id
          });
        });
        percentArr.current = listings;
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
      setListingAvailability(percentArr.current);
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
      filterMonth.forEach(x => handleSendingAvail(x));
    }
    loadListings();
  }
  
  const handleSendingAvail = async (percents) => {
    await addDoc(collection(db, "listings"), percents);
  };

  useEffect(() => {
    if (properties) {
      propLength.current = properties.length;
      loadListings();
    }  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties]);

  // console.log('list Avail', listingAvailability);
  // console.log('properties', properties);

  return [listingAvailability, error];
}

export default usePropertyListing;
