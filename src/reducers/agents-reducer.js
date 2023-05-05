import * as c from '../actions/ActionTypes';

const agentsReducer = (state, action) => {
  switch (action.type) {
    case c.GET_PROPERTIES_SUCCESS:
      const newProperties = action.properties.filter(listing => listing.platforms.airbnb_property_id !== null 
                                                                   && listing.room_type === "Entire home/apt"
                                                                   && listing.latitude < 44.10125
                                                                   && listing.latitude > 44.03699
                                                                   && listing.longitude > -121.36035
                                                                   && listing.longitude < -121.27744);
      
      const propertiesId = newProperties.reduce((array, listing) => array.concat(listing.airbnb_property_id), []);
      const shortenedPropertiesList = propertiesId.slice(0, 1);
      return {
        ...state,
        isLoaded: true,
        properties: shortenedPropertiesList
      };

    // case c.GET_LISTING_SUCCESS:
    //   const oneMonthAvailabile = action.data[0].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
    //   const twoMonthAvailable = action.data[1].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
    //   const daysAvailable = oneMonthAvailabile.concat(twoMonthAvailable);
    //   const today = new Date().toISOString().substring(0,10);
    //   const twoWeeks = daysAvailable.slice(daysAvailable.indexOf(today), daysAvailable.indexOf(today)+28).filter((e, i) =>  i % 2 !== 0);
    //   return {
    //     ...state,
    //     isLoaded: true,
    //     listingAvailability: twoWeeks
    //   };

    case c.GET_WEATHER_SUCCESS:
      const newForecast = action.forecast.filter((e, i) => e.dt_txt.includes("9:00:00") || e.dt_txt.includes("15:00:00"))
                                          .reduce((array, list) => array.concat(list.main.temp_max).concat(list.weather[0].main), 
      []);
      return {
          ...state,
          isLoaded: true,
          forecast: newForecast
        };

    case c.GET_EVENTS_SUCCESS:
      console.log(action);
      const newEventsList = action.eventsList.reduce((array, list) => 
                                          array.concat(list.name)
                                          .concat(list.dates.start.localDate), 
      []);
      return {
          ...state,
          isLoaded: true,
          eventsList: newEventsList
        };

    case c.GET_FETCH_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default agentsReducer;

