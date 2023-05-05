import * as c from '../actions/ActionTypes';

const weatherReducer = (state, action) => {

  switch (action.type) {
    case c.GET_WEATHER_SUCCESS:
      console.log("herer")
      const newForecast = action.forecast.reduce((array, list) => array.concat(list.main.temp_max).concat(list.weather[0].main), []);

    return {
        ...state,
        isLoaded: true,
        forecast: newForecast
      };
    case c.GET_WEATHER_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: action.error
      };
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default weatherReducer;

