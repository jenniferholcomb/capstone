import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 } from 'uuid';

const NewItemsWrapper = styled.section`
  display: grid;
  width: 90%;
  height: 90%;
  justify-content: center;
  padding: 30px;
  text-align: center;
  
  
  outline: 1px solid black;
  border-radius: 10px;
  grid-column: 1 ;
  grid-row: 1 / span 6;
`;

function AddNewItems(props) {
  const { currentInvoice } = props;

  const handleNewItemsSubmission = (event) => {
    event.preventDefault();
    props.onAddItemsCreation({
      itemCode: event.target.itemCode.value,
      description: event.target.description.value,
      quantity: parseInt(event.target.quantity.value),
      unitPrice: parseFloat(event.target.unitPrice.value),
      extendedAmount: parseInt(event.target.quantity.value) * parseFloat(event.target.unitPrice.value), 
      invoiceNumber: currentInvoice.current[0].invoiceNumber,
      date: currentInvoice.current[0].date,
      key: v4()
    });
    event.target.reset();
  };

  const handleCompleteItemSubmission = (event) => {
    event.preventDefault();
    props.onCompleteAddingItems({
      itemCode: event.target.itemCode.value,
      description: event.target.description.value,
      quantity: parseInt(event.target.quantity.value),
      unitPrice: parseFloat(event.target.unitPrice.value),
      extendedAmount: parseInt(event.target.quantity.value) * parseFloat(event.target.unitPrice.value), 
      invoiceNumber: currentInvoice.current[0].invoiceNumber,
      date: currentInvoice.current[0].date,
      key: v4()
    });
  }

  return (
    <React.Fragment>
      <NewItemsWrapper>
      <h5>ADD ITEMS</h5>
        <form onSubmit={(event) => {
          const buttonName = event.nativeEvent.submitter.name;
          if (buttonName === 'submitItems') handleCompleteItemSubmission(event);
          if (buttonName === 'addMore') handleNewItemsSubmission(event);
          }} >
          <input
            class="items"
            type='number'
            name='itemCode'
            placeholder='&nbsp;&nbsp;&nbsp;Item Code' required/>
          <textarea
            class="items"
            name='description'
            placeholder='Description' required/>
          <input
            class="items"
            type='number'
            name='quantity'
            placeholder='&nbsp;&nbsp;&nbsp;Quantity' required/>
          <input
            class="items"
            type='number'
            name='unitPrice'
            step= '.01'
            placeholder='&nbsp;&nbsp;&nbsp;$/Unit' required/><br /><br />
          <button type='submit' class="items-button" name='addMore'>ADD MORE ITEMS</button><br /><br />
          <button class="items-button" type='submit' name='submitItems'>FINISH INVOICE</button>
          <button class="items-button" onClick={props.onReset}>CANCEL</button>
        </form>
      </NewItemsWrapper>
      <div className="">
        <React.Fragment>
          <h3>{currentInvoice.current[0].invoiceNumber} - {currentInvoice.current[0].date}</h3>
          {currentInvoice.current.slice(1).map(item => 
            <p>{item.itemCode} - {item.description} - {item.quantity} - {item.extendedAmount}</p>
          )}
        </React.Fragment>
        
      </div><br />
      
    </React.Fragment>
  );
}

AddNewItems.propTypes = {
  onAddItemsCreation: PropTypes.func,
  onCompleteAddingItems: PropTypes.func,
  invoiceNumber: PropTypes.number,
  date: PropTypes.string,
  currentInvoice: PropTypes.object
};

export default AddNewItems;

