import * as c from '../actions/ActionTypes';

const propertiesReducer = (state, action) => {
  switch (action.type) {
    case c.GET_PROPERTIES_SUCCESS:
      const newFilterProperties = action.properties.filter(listing => listing.platforms.airbnb_property_id !== null 
                                                                   && listing.room_type === "Entire home/apt"
                                                                   && listing.latitude < 44.10125
                                                                   && listing.latitude > 44.03699
                                                                   && listing.longitude > -121.36035
                                                                   && listing.longitude < -121.27744);
      console.log(newFilterProperties);
      return {
        ...state,
        isLoaded: true,
        properties: newFilterProperties
      };
    case c.GET_PROPERTIES_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default propertiesReducer;