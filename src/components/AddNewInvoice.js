import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewInvoiceWrapper = styled.section`
  display: grid;
  justify-content: center;
  margin-left: 30px;
 
`;

function AddNewInvoice(props) {

  function handleNewInvoiceSubmission(event) {
    event.preventDefault();
    props.onNewInvoiceCreation({
      purveyor: event.target.purveyor.value,
      invoiceNumber: event.target.invoiceNumber.value,
      date: event.target.date.value,
      total: event.target.total.value,
      itemCode: event.target.itemCode.value,
      description: event.target.description.value,
      quantity: event.target.quantity.value,
      unitPrice: event.target.unitPrice.value,
      extendedAmount: event.target.extendedAmount.value
    });
  }

  return (
    <React.Fragment>
      <NewInvoiceWrapper>
        <form onSubmit={handleNewInvoiceSubmission}>
          <input
            type='text'
            name='purveyor'
            placeholder='Purveyor' required/>
          <input 
            type='number'
            name='invoiceNumber'
            placeholder='Invoice #' required/>
          <input 
            type='date'
            name='date'
            placeholder='Date' required/>
          <input
            type='number'
            name='total'
            step= '.01'
            placeholder='Invoice Total' required/>
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
          <button type='submit'>ADD INVOICE</button>
        </form>
      </NewInvoiceWrapper>
    </React.Fragment>
  );
}

AddNewInvoice.propTypes = {
  onNewInvoiceCreation: PropTypes.func
};

export default AddNewInvoice;