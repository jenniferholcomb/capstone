import * as c from '../actions/ActionTypes';

const listingReducer = (state, action) => {
  console.log("run");
  switch (action.type) {
    case c.GET_LISTING_SUCCESS:
      const oneMonthAvailabile = action.data[0].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
      const twoMonthAvailable = action.data[1].days.reduce((array, day) => array.concat(day.date).concat(day.available), []);
      const daysAvailable = oneMonthAvailabile.concat(twoMonthAvailable);
      const today = new Date().toISOString().substring(0,10);
      const twoWeeks = daysAvailable.slice(daysAvailable.indexOf(today), daysAvailable.indexOf(today)+28).filter((e, i) =>  i % 2 !== 0);
      return {
        ...state,
        isLoaded: true,
        listingAvailability: twoWeeks
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

