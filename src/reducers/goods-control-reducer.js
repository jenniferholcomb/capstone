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
      const newInvoice = [...state.createInvoice, action.values];
      const numItems = (newInvoice.length) - 1;
      const totalAmt = newInvoice.slice(1)
                    .reduce((accum, current) => accum + current.extendedAmount, 0);
      const newInfo = {...newInvoice[0], numberItems: numItems, total: totalAmt};
      const completeInvoice = newInvoice.slice(1);
      completeInvoice.push(newInfo);
      return {
        ...state,
        createInvoice: completeInvoice,
        itemsFormVisible: false
      }
    case c.GET_INVOICES:
      return {
        ...state,
        invoiceData: action.invoices
      }
    case c.GET_GOODS:
      return {
        ...state,
        goodsData: action.goods
      }
    case c.GET_DATA_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case c.GET_MANAGE_INVOICES:
      return {
        ...state,
        manageInvoiceVisible: true
      }
    case c.GET_GOODS_LIST:
      return {
        ...state,
        goodsList: true
      }
    case c.GET_SELECTED_INVOICE:
      const currentInv = state.invoiceData.filter((entry) => entry.invoiceNumber === action.id);
      console.log(currentInv)
      console.log("id")
      const currentItems = state.goodsData.filter((entry) => entry.invoiceNumber === action.id);
      return {
        ...state,
        manageInvoiceVisible: false,
        invoiceDetailVisible: true,
        createInvoice: [...currentInv, ...currentItems]
      }
    case c.GET_EDIT_INVOICE:
      return {
        ...state,
        editFormVisible: true,
        invoiceDetailVisible: false
      }
    case c.GET_RESET:
      return {
        ...state,
        formVisible: false,
        addItemsAgain: false,
        createInvoice: [],
        updateInvoice: false,
        goodsList: false,
        invoiceDetailVisible: false
      }
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default goodsControlReducer;
