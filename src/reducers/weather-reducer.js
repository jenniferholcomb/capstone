import * as c from '../actions/ActionTypes';

const weatherReducer = (state, action) => {

  switch (action.type) {
    case c.GET_WEATHER_SUCCESS:
      console.log(action);
      const newForecast = action.forecast.filter((e, i) => e.dt_txt.includes("9:00:00") || e.dt_txt.includes("15:00:00"))
                                         .reduce((array, list) => array.concat(list.main.temp_max).concat(list.weather[0].main), 
      []);

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

