import React from "react";
import PropTypes from 'prop-types';

function AddNewItems(props) {

  const handleNewItemsSubmission = (event) => {
    event.preventDefault();
    props.onAddItemsCreation({
      itemCode: event.target.itemCode.value,
      description: event.target.description.value,
      quantity: event.target.quantity.value,
      unitPrice: event.target.unitPrice.value,
      extendedAmount: event.target.extendedAmount.value, 
      invoiceId: props.invoiceId
    });
  };

  const handleCompleteItemSubmission = (event) => {
    event.preventDefault();
    handleNewItemsSubmission(event);
    props.onCompleteAddingItems();
  }

  return (
    <React.Fragment>
      <form onSubmit={handleCompleteItemSubmission}>
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
        <input
          type='number'
          name='extendedAmount'
          step= '.01'
          placeholder='Extended Amount' required/>
        <button type='submit'>SUBMIT</button>
        <button type='submit' formaction={handleNewItemsSubmission}>ADD MORE ITEMS</button>
      </form>
    </React.Fragment>
  );
}

AddNewItems.propTypes = {
  onAddItemsCreation: PropTypes.func,
  onCompleteAddingItems: PropTypes.func,
  invoiceId: PropTypes.number
};

export default AddNewItems;