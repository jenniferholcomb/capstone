import * as c from './ActionTypes';

export const getPropertiesSuccess = (properties) => ({
  type: c.GET_PROPERTIES_SUCCESS,
  properties
});

export const getPropertiesFailure = (error) => ({
  type: c.GET_PROPERTIES_FAILURE,
  error
});