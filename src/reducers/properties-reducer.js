import * as c from '../actions/ActionTypes';

const propertiesReducer = (state, action) => {
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

