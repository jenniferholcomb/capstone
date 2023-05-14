import React from "react";
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

function AddNewItems(props) {
  const { currentInvoice } = props;

  const handleNewItemsSubmission = (event) => {
    event.preventDefault();
    props.onAddItemsCreation({
      itemCode: event.target.itemCode.value,
      description: event.target.description.value,
      quantity: parseInt(event.target.quantity.value),
      unitPrice: parseInt(event.target.unitPrice.value),
      extendedAmount: parseInt(event.target.quantity.value) * parseInt(event.target.unitPrice.value), 
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
      unitPrice: parseInt(event.target.unitPrice.value),
      extendedAmount: parseInt(event.target.quantity.value) * parseInt(event.target.unitPrice.value), 
      invoiceNumber: currentInvoice.current[0].invoiceNumber,
      date: currentInvoice.current[0].date,
      key: v4()
    });
  }

  return (
    <React.Fragment>
      <form onSubmit={(event) => {
        const buttonName = event.nativeEvent.submitter.name;
        if (buttonName === 'submitItems') handleCompleteItemSubmission(event);
        if (buttonName === 'addMore') handleNewItemsSubmission(event);
        }} >
        <input
          type='number'
          name='itemCode'
          placeholder='Item Code' required/>
        <textarea
          name='description'
          placeholder='Description' required/>
        <input
          type='number'
          name='quantity'
          placeholder='Quantity' required/>
        <input
          type='number'
          name='unitPrice'
          step= '.01'
          placeholder='Unit Price' required/>
        <button type='submit' name='submitItems'>SUBMIT</button>
        <button type='submit' name='addMore'>ADD MORE ITEMS</button>
      </form>
      <div className="">
        <React.Fragment>
          <h3>{currentInvoice.current[0].invoiceNumber} - {currentInvoice.current[0].date}</h3>
          {currentInvoice.current.slice(1).map(item => 
            <p>{item.itemCode} - {item.description} - {item.quantity} - {item.extendedAmount}</p>
          )}
        </React.Fragment>
        
      </div>
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

