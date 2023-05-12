import * as c from '../actions/ActionTypes';

const goodsControlReducer = (state, action) => {

  switch (action.type) {

    case c.GET_FORM_VISIBLE:
      return {
        ...state,
        formVisible: true
      }
    case c.GET_CREATE_INVOICE:
      return {
        ...state,
        formVisible: false,
        itemsFormVisible: true,
        createInvoice: [action.newInfo]
      }
    case c.GET_ADD_ITEMS_INVOICE:
      return {
        ...state,
        createInvoice: [...state.createInvoice, action.newItemsData]
      }
    case c.GET_COMPLETE_INVOICE:
      return {
        ...state,
        itemsFormVisible: false,
        currentInvoiceId: null,
        createInvoice: []
      }
    case c.GET_INVOICES:
      
      return {
        ...state,
        invoiceData: action.invoices
      }
    case c.GET_INVOICES_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default goodsControlReducer;
