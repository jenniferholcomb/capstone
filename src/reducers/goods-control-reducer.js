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
      const numberItems = state.createInvoice.length - 1;
      console.log(numberItems)
      const total = state.createInvoice.slice(1)
                    .reduce((accum, current) => accum + current.extendedAmount, 0);
      console.log(total)
      const newInfo = [ Object.assign(state.createInvoice[0], {totalGoods: numberItems, totalAmount: total}) ];
      console.log(newInfo)
      const newCreateInvoice = state.createInvoice.slice(1).push(newInfo);
      console.log(newCreateInvoice)
      return {
        ...state,
        createInvoice: newCreateInvoice
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
    case c.GET_FORM_UPDATE:
      return {
        ...state,
        updateInvoice: true
      }
    case c.GET_GOODS_LIST:
      return {
        ...state,
        goodsList: true
      }
    case c.GET_RESET:
      return {
        ...state,
        formVisible: false,
        addItemsAgain: false,
        createInvoice: [],
        updateInvoice: false,
        goodsList: false
      }
    default:
      throw new Error(`There is no action matching ${action.type}.`);
  }
}

export default goodsControlReducer;
