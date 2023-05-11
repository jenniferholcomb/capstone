import * as c from '../actions/ActionTypes';

const goodsControlReducer = (state, action) => {

  switch (action.type) {

    case c.GET_FORM_VISIBLE:
      return {
        ...state,
        formVisible: true
      }
    case c.GET_ADD_INVOICE:
      return {
        ...state,
        formVisible: false
      }

    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default goodsControlReducer;
