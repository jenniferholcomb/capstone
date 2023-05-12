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
            invoiceId: doc.data().invoiceId,
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

  const handleClick = () => {
    const action = getFormVisible();
    dispatch(action);
  }

  const handleInvoicesClick = () => {
    const action = getFormUpdate();
    dispatch(action);
  }

  const handleGoodsClick = () => {
    const action = getGoodsList();
    dispatch(action);
  }

  const handleCompleteAddingItems = async () => {
    const action = getCompleteInvoice();
    dispatch(action);

    await addDoc(collection(db, "invoices"), createInvoice[0]);
    const itemsInvoice = currentItems.current;
    console.log(itemsInvoice)
    // await itemsInvoice.map(item => 
    //   addDoc(collection(db, "items"), item)
    // );

    const action2 = getReset();
    dispatch(action2);
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
          <button onClick={handleClick}>ADD NEW INVOICE</button>
          <button onClick={handleInvoicesClick}>MANAGE INVOICES</button>
          <button onClick={handleGoodsClick}>LIST BY ITEM</button>
        </GoodsControlWrapper>
      }   
    </React.Fragment>
  );
}

export default GoodsControl;
