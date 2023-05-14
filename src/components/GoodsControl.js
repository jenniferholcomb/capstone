import React, { useEffect, useReducer, useRef } from "react";
import Header from "./Header";
import AddNewInvoice from "./AddNewInvoice";
import AddNewItems from "./AddNewItems";
import GoodsList from './GoodsList';
import InvoiceList from './InvoiceList';
import InvoiceDetail from "./InvoiceDetail";
import { getFormVisible, getCreateInvoice, getInvoices, 
         getAddItemsInvoice, getCompleteInvoice, getDataFailure,
         getFormUpdate, getGoodsList, getGoods, getReset } from "../actions";
// import CurrentDay from "./CurrentDay";
import styled from 'styled-components';
import goodsControlReducer from "../reducers/goods-control-reducer";
import db from './../firebase.js';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const initialState = {
  formVisible: false,
  itemsFormVisible: false,
  addItemsAgain: false,
  invoiceData: [],
  goodsData: [],
  createInvoice: [],
  updateInvoice: false,
  goodsList: false,
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
  const currentItems = useRef(state.createInvoice);
  const internalRef = useRef(null);

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
            numberItems: doc.data().numberItems,
            total: doc.data().total,
            id: doc.id
          });
        });
        const action = getInvoices(invoices);
        dispatch(action);
      },
      (error) => {
        const action = getDataFailure(error.message);
        dispatch(action);
      }
    );

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "items"),
      (collectionSnapshot) => {
        const goods = [];
        collectionSnapshot.forEach((doc) => {
          goods.push({
            itemCode: doc.data().itemCode,
            description: doc.data().description,
            quantity: doc.data().quantity,
            unitPrice: doc.data().unitPrice,
            extendedAmount: doc.data().extendedAmount, 
            invoiceNumber: doc.data().invoiceNumber,
            date: doc.data().date
          });
        });
        const action = getGoods(goods);
        dispatch(action);
      },
      (error) => {
        const action = getDataFailure(error.message);
        dispatch(action);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleSendingData = async () => {
    const infoIndex = currentItems.current.length-1;
    await addDoc(collection(db, "invoices"), currentItems.current[infoIndex]);
    console.log(currentItems.current)
    console.log("here")
    await currentItems.current.slice(0, infoIndex).map(item => 
      addDoc(collection(db, "items"), item)
    );
    clearInterval(internalRef.current);
    internalRef.current = null;
    // const action = getReset();
    // dispatch(action);
  }

  const handleCompleteAddingItems = (finalValues) => {
    const action = getCompleteInvoice(finalValues);
    dispatch(action);

    internalRef.current = setInterval(() => {
      handleSendingData();
    }, 1000);
  }

  const handleAddingInvoiceInfo = (newInfo) => {
    const action = getCreateInvoice(newInfo);
    dispatch(action);
  }

  const handleAddingMoreItems = (newItemsData) => {
    const action = getAddItemsInvoice(newItemsData);
    dispatch(action);
  }

  const handleChangingInvoiceSelection = () => {
    console.log("here");
  }

  const { formVisible, itemsFormVisible, invoiceData, goodsData, createInvoice, updateInvoice, goodsList, error } = state;
  currentItems.current = createInvoice;
  console.log(invoiceData);
  console.log(goodsData);

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
            currentInvoice={currentItems} />
        </React.Fragment>
      : updateInvoice ?
        <React.Fragment>
          <InvoiceList 
            onInvoiceSelection={handleChangingInvoiceSelection}
            invoices={invoiceData} />
        </React.Fragment>  
      : goodsList ?
        <React.Fragment>
          <GoodsList
            goods={goodsData} />
        </React.Fragment>
      :
        <GoodsControlWrapper>
          <button onClick={() => dispatch(getFormVisible())}>ADD NEW INVOICE</button>
          <button onClick={() => dispatch(getFormUpdate())}>MANAGE INVOICES</button>
          <button onClick={() => dispatch(getGoodsList())}>LIST BY ITEM</button>
        </GoodsControlWrapper>
      }   
    </React.Fragment>
  );
}

export default GoodsControl;
