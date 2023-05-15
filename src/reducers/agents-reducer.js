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
      console.log(propertiesId);
      return {
        ...state,
        isPropertiesLoaded: true,
        properties: shortenedPropertiesList
      };
    
    case c.GET_DATA_PUSH:
      return {
        ...state,
        isPropertiesLoaded: false,
        properties: []
      }

    case c.GET_DATA_SUCCESS:
      return {
        ...state,
        makeListingCall: true,
        properties: action.properties
      }

    case c.GET_LISTING_SUCCESS:

      // const oneMonthAvailable = action.listings[0].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
      const oneMonthAvailable = action.listings[0].days;
      console.log(oneMonthAvailable);
      // const twoMonthAvailable = action[1].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
      // const daysAvailable = oneMonthAvailabile.concat(twoMonthAvailable);
      // const today = new Date().toISOString().substring(0,10);
      // const twoWeeks = daysAvailable.slice(daysAvailable.indexOf(today), daysAvailable.indexOf(today)+28).filter((e, i) =>  i % 2 !== 0);
      return {
        ...state,
        makeListingCall: false,
        isListingLoaded: true,
        listings: oneMonthAvailable,
        // counter: (state.counter + 1)
      };

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
      const newEventsList = action.eventsList.reduce((array, list) => 
                                          array.concat(list.name)
                                          .concat(list.dates.start.localDate), 
      []);
      return {
          ...state,
          isLoaded: true,
          eventsList: newEventsList
        };

    case c.GET_HOLIDAY_SUCCESS:
      const newHolidayList = action.holidayList.filter((e, i) => e.primary_type === "State Holiday") 
                                                                 // e.primary_type === "Christian" )
                                               .reduce((array, list) => array.concat(list.name).concat(list.date.iso), 
      []);

      const reduceDuplicates = (arr, count) => {
        if (count >= arr.length-2) {
          return arr;
        } else if (arr[count] === arr[count + 2]) {
          return reduceDuplicates(arr.toSpliced(count+2, 2), count);
        } else {
          return reduceDuplicates(arr, count += 2);
        }
      };

      const uniqueList = reduceDuplicates(newHolidayList, 0);

      // const today = new Date().getDate();
      // const month = today.getMonth();
      // if ((today + 14) >= 30) {

      // } else {

      // }
      // const twoWeekList = uniqueList.filter(e => e.)

      return {
          ...state,
          isLoaded: true,
          holidayList: uniqueList
        };

    case c.GET_FETCH_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
    
    case c.GET_DATA_FAILURE:
      return {
        ...state,
        error: action.error
      }
  }
}

export default agentsReducer;



