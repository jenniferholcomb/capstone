import React, { useEffect, useState } from 'react';

function ShortTermRental (props) {
 
  // const [startLoading, setStartLoading] = useState(true);
  // const [propLoaded, setPropLoaded] = useState(false);
  // const [sendProps, setSendProps] = useState(false);
  // const [propertyList, setPropertyList] = useState([]);
  // const [listComplete, setListComplete] = useState(false);
  // const [listingList, setListingList] = useState(null);
  // const [error, setError] = useState(null);


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
        handlePropertiesSuccess(jsonifiedResponse.properties); // update code with logic in reducer when start making airdna calls
      })
      .catch((error) => {
        setError(error)
      });
  }, [])

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
    
    handleSendingProps(propObj);
    setPropertyList(propertiesId);
    setStartLoading(false);
    setPropLoaded(true);
    //setSendProps(true)
  };

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
        <ListingDay days={props.currentWeek} />        
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

