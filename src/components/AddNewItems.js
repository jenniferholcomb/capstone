import React from "react";
import PropTypes from 'prop-types';

function AddNewItems(props) {

  const handleNewItemsSubmission = (event) => {
    console.log("here")
    event.preventDefault();
    props.onAddItemsCreation({
      itemCode: event.target.itemCode.value,
      description: event.target.description.value,
      quantity: parseInt(event.target.quantity.value),
      unitPrice: parseInt(event.target.unitPrice.value),
      extendedAmount: parseInt(event.target.quantity.value) * parseInt(event.target.unitPrice.value), 
      invoiceId: props.invoiceId,
      date: props.date
    });
  };

  const handleCompleteItemSubmission = (event) => {
    event.preventDefault();
    handleNewItemsSubmission(event);
    props.onCompleteAddingItems();
  }

  return (
    <React.Fragment>
      <form onSubmit={(event) => {
        const buttonName = event.nativeEvent.submitter.name;
        if (buttonName === 'submitItems') handleCompleteItemSubmission(event);
        if (buttonName === 'addMore') handleNewItemsSubmission(event);
        }}
      >
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
    </React.Fragment>
  );
}

AddNewItems.propTypes = {
  onAddItemsCreation: PropTypes.func,
  onCompleteAddingItems: PropTypes.func,
  invoiceId: PropTypes.number,
  date: PropTypes.string
};

export default AddNewItems;