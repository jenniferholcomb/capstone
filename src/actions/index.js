import * as c from './ActionTypes';

export const getPropertiesSuccess = (properties) => ({
  type: c.GET_PROPERTIES_SUCCESS,
  properties
});

// export const getListingSuccess = (listing) => ({
//   type: c.GET_LISTING_SUCCESS,
//   listingAvailability
// });

export const getWeatherSuccess = (forecast) => ({
  type: c.GET_WEATHER_SUCCESS,
  forecast
});

export const getEventsSuccess = (forecast) => ({
  type: c.GET_EVENTS_SUCCESS,
  forecast
});

export const getFetchFailure = (error) => ({
  type: c.GET_FETCH_FAILURE,
  error
});
