import * as c from './ActionTypes';

export const getPropertiesSuccess = (properties) => ({
  type: c.GET_PROPERTIES_SUCCESS,
  properties
});

export const getPropertiesFailure = (error) => ({
  type: c.GET_PROPERTIES_FAILURE,
  error
});

// export const getListingSuccess = (listing) => ({
//   type: c.GET_LISTING_SUCCESS,
//   listingAvailability
// });

// export const getListingFailure = (error) => ({
//   type: c.GET_LISTING_FAILURE,
//   error
// });

export const getWeatherSuccess = (forecast) => ({
  type: c.GET_WEATHER_SUCCESS,
  forecast
});

export const getWeatherFailure = (error) => ({
  type: c.GET_WEATHER_FAILURE,
  error
});