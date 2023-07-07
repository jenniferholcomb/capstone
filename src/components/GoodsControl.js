import React, { useEffect, useReducer, useRef } from "react";
import Header from "./Header";
import AddNewInvoice from "./AddNewInvoice";
import AddNewItems from "./AddNewItems";
import GoodsList from './GoodsList';
import InvoiceList from './InvoiceList';
import InvoiceDetail from "./InvoiceDetail";
import UpdateInvoiceForm from "./UpdateInvoiceForm";
import { getFormVisible, getCreateInvoice, getInvoices, 
         getAddItemsInvoice, getCompleteInvoice, getDataFailure,
         getManageInvoice, getSelectedInvoice, getGoodsList,
         getEditInvoice, getGoods, getReset, getUpdatedItems } from "../actions";
import styled from 'styled-components';
import goodsControlReducer from "../reducers/goods-control-reducer";
import db from './../firebase.js';
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';

const initialState = {
  formVisible: false,
  itemsFormVisible: false,
  addItemsAgain: false,
  invoiceData: [],
  goodsData: [],
  goodsLoaded: false,
  createInvoice: [],
  selectedInvoice: [],
  manageInvoiceVisible: false,
  invoiceDetailVisible: false,
  editFormVisible: false,
  // goodsList: true,
  error: null
};

const GoodsControlWrapper = styled.section`
  grid-column: 2 / span 2;
  grid-row: 1 / span 3;
  margin-top: 30px;
  margin-left: 0px;
  margin-bottom: 30px;
  margin-right: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(6, 1fr);
  justify-items: center;
  align-items: center;
  overflow-y: scroll;
  background-color: rgba(240, 238, 234, 0.942)
`;

const GoodsListWrapper = styled.section`
  // outline: 1px solid black;
  grid-column: 1 / span 3;
  margin-top: -30px;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const UpdateWrapper = styled.section`
  grid-column: 1 / span 3;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  margin-top: 20px;
  gap: 20px;
`;

function GoodsControl () {
  const [state, dispatch] = useReducer(goodsControlReducer, initialState);
  const currentItems = useRef(state.createInvoice);
  const currentGoods = useRef(state.goodsData);
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
            date: doc.data().date,
            id: doc.id
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
    await currentItems.current.slice(0, infoIndex).map(item => 
      addDoc(collection(db, "items"), item)
    );
    clearInterval(internalRef.current);
    internalRef.current = null;
    const action = getReset();
    dispatch(action);
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

  const handleSelectedInvoice = (id) => {
    const action = getSelectedInvoice(id);
    dispatch(action);
  } 

  const handleDeleteClick = async () => {
    await deleteDoc(doc(db, "invoices", createInvoice[0].id));
    await createInvoice.slice(1).map(entry => 
      deleteDoc(doc(db, "items", entry.id))
    );
    dispatch(getReset());
  }

  const handleUpdatingInvoice = async (updatedInvoice) => {
    const invoiceRef = doc(db, "invoices", updatedInvoice[0].id);
    await updateDoc(invoiceRef, updatedInvoice[0]);
    await updatedInvoice.slice(1).map(item => {
      const itemsRef = doc(db, "items", item.id);
      updateDoc(itemsRef, item);
    });
    dispatch(getManageInvoice());
  }

  const handleDeletingItem = async (itemId, updatedItems) => {
    await deleteDoc(doc(db, "items", itemId));
    currentItems.current = updatedItems;
    dispatch(getUpdatedItems(updatedItems));
  }

  const { formVisible, itemsFormVisible, invoiceData, goodsData, goodsLoaded, createInvoice, invoiceDetailVisible, manageInvoiceVisible, editFormVisible, goodsList, error } = state;
  currentItems.current = createInvoice;
  currentGoods.current = goodsData;
  console.log(goodsData)
  console.log("inv")
  console.log(createInvoice)

  return (
    <React.Fragment>
      <Header />
      <GoodsControlWrapper className="goods-shadow">
      { 
      error ?
        <p>Theres was an error: {error}</p>
      : formVisible ? 
        <AddNewInvoice 
          onNewInvoiceCreation={handleAddingInvoiceInfo}
          onReset={() => dispatch(getReset())} />
      : itemsFormVisible ?
        <React.Fragment>
          <AddNewItems
            onAddItemsCreation={handleAddingMoreItems}
            onCompleteAddingItems={handleCompleteAddingItems}
            currentInvoice={currentItems}
            onReset={() => dispatch(getReset())} />
        </React.Fragment>
      : manageInvoiceVisible ?
        <React.Fragment>
          <InvoiceList 
            onInvoiceSelection={handleSelectedInvoice}
            invoices={invoiceData}
            onReset={() => dispatch(getReset())} />
        </React.Fragment>  
      : invoiceDetailVisible ?
        <React.Fragment>
          <InvoiceDetail 
            invoice={currentItems.current} 
            onClickingDelete = {handleDeleteClick}
            onClickingEdit = {() => dispatch(getEditInvoice())}
            onReset={() => dispatch(getReset())} />
        </React.Fragment>
      : editFormVisible ?
        <UpdateWrapper>
          <UpdateInvoiceForm
            invoice={currentItems.current}
            onEditFormCreation={handleUpdatingInvoice} 
            onDeleteItem={handleDeletingItem} 
            onClickingDelete = {handleDeleteClick}
            onReset={() => dispatch(getReset())}/>
        </UpdateWrapper> 
      : goodsLoaded ?
        <React.Fragment>
          <GoodsList
            goods={currentGoods.current} 
            onManageInvoicesClick={() => dispatch(getManageInvoice())}
            onAddInvoiceClick={() => dispatch(getFormVisible())} />
        </React.Fragment>
      :
        <React.Fragment>
          <button className="nav-2" onClick={() => dispatch(getManageInvoice())}>MANAGE INVOICES</button>
          <button className="nav-1" onClick={() => dispatch(getFormVisible())}>ADD NEW INVOICE</button>
          <p><em>...Loading</em></p>
        </React.Fragment>

      }   
      </GoodsControlWrapper>
    </React.Fragment>
  );
}

export default GoodsControl;

{/* <button class="nav-3" onClick={() => dispatch(getGoodsList())}>LIST BY ITEM</button> */}