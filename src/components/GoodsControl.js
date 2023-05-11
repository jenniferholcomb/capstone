import React, { useReducer } from "react";
import Header from "./Header";
import AddNewInvoice from "./AddNewInvoice";
import { getFormVisible, getAddInvoice } from "../actions";
// import CurrentDay from "./CurrentDay";
// import GoodsDetail from "./GoodsDetail";
import styled from 'styled-components';
import goodsControlReducer from "../reducers/goods-control-reducer";

const initialState = {
  formVisible: false,
  invoiceData: []
}

const GoodsControlWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  outline: 1px solid black;
  margin-left: 30px;
`;

function GoodsControl () {
  const [state, dispatch] = useReducer(goodsControlReducer, initialState);

  const handleClick = () => {
    const action = getFormVisible();
    dispatch(action);
  }

  const handleAddingNewInvoice = (invoice) => {
    const action = getAddInvoice(invoice);
    dispatch(action);
  }

  const { formVisible, invoiceData } = state;
  console.log(invoiceData);
 
  return (
    <React.Fragment>
      <Header />
      { formVisible ? 
        <AddNewInvoice 
          onNewInvoiceCreation={handleAddingNewInvoice}/>
      :
        <GoodsControlWrapper>
          <button onClick={handleClick}>ADD NEW INVOICE</button>
        </GoodsControlWrapper>
      }
    </React.Fragment>
  );
}

export default GoodsControl;
