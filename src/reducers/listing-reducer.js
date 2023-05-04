import * as c from '../actions/ActionTypes';

const listingReducer = (state, action) => {
  switch (action.type) {
    case c.GET_LISTING_SUCCESS:
      const newWeeklyAvailability = action.data[0].days.reduce((array, day) => array.concat(day.available), []);
      return {
        ...state,
        isLoaded: true,
        properties: newWeeklyAvailability
      };
    case c.GET_LISTING_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default listingReducer;

