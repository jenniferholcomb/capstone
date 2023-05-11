import * as c from './ActionTypes';

// export const getPropertiesSuccess = (properties) => ({
//   type: c.GET_PROPERTIES_SUCCESS,
//   properties
// });

export const getListingSuccess = (listings) => ({
  type: c.GET_LISTING_SUCCESS,
  listings
});

export const getWeatherSuccess = (forecast) => ({
  type: c.GET_WEATHER_SUCCESS,
  forecast
});

export const getEventsSuccess = (eventsList) => ({
  type: c.GET_EVENTS_SUCCESS,
  eventsList
});

export const getHolidaySuccess = (holidayList) => ({
  type: c.GET_HOLIDAY_SUCCESS,
  holidayList
});

export const getFetchFailure = (error) => ({
  type: c.GET_FETCH_FAILURE,
  error
});

export const getFormVisible = () => ({
  type: c.GET_FORM_VISIBLE
});

export const getAddInvoice = () => ({
  type: c.GET_ADD_INVOICE
});

