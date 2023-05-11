import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import AddNewInvoice from "./AddNewInvoice";
import { getFormVisible, getCreateInvoice, getInvoices, 
         getAddItemsInvoice, getCompleteInvoice, getInvoicesFailure } from "../actions";
// import CurrentDay from "./CurrentDay";
// import GoodsDetail from "./GoodsDetail";
import styled from 'styled-components';
import goodsControlReducer from "../reducers/goods-control-reducer";
import db from './../firebase.js';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import AddNewItems from "./AddNewItems";

const initialState = {
  formVisible: false,
  itemsFormVisible: false,
  addItemsAgain: false,
  invoiceData: [],
  createInvoice: [],
  currentInvoiceId: null,
  error: null
};

const GoodsControlWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 2 / span 2;
  outline: 1px solid black;
  margin-left: 30px;
`;

function GoodsControl () {
  const [state, dispatch] = useReducer(goodsControlReducer, initialState);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "invoices"),
      (collectionSnapshot) => {
        const invoices = [];
        collectionSnapshot.forEach((doc) => {
          invoices.push({
            purveyor: doc.data().purveyor,
            invoiceNumber: doc.data().invoiceNumber,
            date: doc.data().date,
            total: doc.data().total,
            itemCode: doc.data().itemCode,
            description: doc.data().description,
            quantity: doc.data().quantity,
            unitPrice: doc.data().unitPrice,
            extendedAmount: doc.data().extendedAmount,
            id: doc.id
          });
        });
        const action = getInvoices(invoices);
        dispatch(action);
      },
      (error) => {
        const action = getInvoicesFailure(error.message);
        dispatch(action);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    const action = getFormVisible();
    dispatch(action);
  }

  const handleCompleteAddingItems = async () => {
    //await addDoc(collection(db, "invoices"), newInvoiceData);

    const action = getCompleteInvoice();
    dispatch(action);
  }

  const handleAddingInvoiceInfo = (newInfo) => {
    const action = getCreateInvoice(newInfo);
    dispatch(action);
  }

  const handleAddingMoreItems = (newItemsData) => {
    const action = getAddItemsInvoice(newItemsData);
    dispatch(action);
  }

  const { formVisible, itemsFormVisible, invoiceData, currentInvoiceId, error } = state;
  console.log(invoiceData);
 
  return (
    <React.Fragment>
      <Header />
      { 
      error ?
        <p>Theres was an error: {error}</p>
      : formVisible ? 
        <AddNewInvoice 
          onNewInvoiceCreation={handleAddingInvoiceInfo}/>
      : itemsFormVisible ?
        <React.Fragment>
          <AddNewItems
            onAddItemsCreation={handleAddingMoreItems}
            onCompleteAddingItems={handleCompleteAddingItems}
            invoiceId={currentInvoiceId}/>
        </React.Fragment>
      :
        <GoodsControlWrapper>
          <button onClick={handleClick}>ADD NEW INVOICE</button>
        </GoodsControlWrapper>
      }
    </React.Fragment>
  );
}

export default GoodsControl;
