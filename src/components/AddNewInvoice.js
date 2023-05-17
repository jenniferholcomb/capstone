import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 } from 'uuid';

const NewInvoiceWrapper = styled.section`
  display: grid;
  width: 60%;
  height: 80%;
  justify-content: center;
  padding: 30px;
  text-align: center;
  
  
  outline: 1px solid black;
  border-radius: 10px;
  grid-column: 1 / span 2;
  grid-row: 1 / span 6;
`;

function AddNewInvoice(props) {

  function handleNewInvoiceSubmission(event) {
    event.preventDefault();
    props.onNewInvoiceCreation({
      purveyor: event.target.purveyor.value,
      invoiceNumber: parseInt(event.target.invoiceNumber.value),
      date: event.target.date.value,
      key: v4()
    });
  }

  return (
    <React.Fragment>
      <NewInvoiceWrapper>
      <h3>START NEW INVOICE</h3>
        <form onSubmit={handleNewInvoiceSubmission}>
          <input
            class="inv"
            type='text'
            name='purveyor'
            placeholder='Purveyor' required/><br />
          <input 
          class="inv"
            type='number'
            name='invoiceNumber'
            placeholder='Invoice #' required/><br />
          <input 
            class="inv"
            type='date'
            name='date'
            placeholder='Date' required/><br />
          <button class="inv-button" type='submit'>NEXT</button>
        </form>
        <button class="inv-button" onClick={props.onReset}>CANCEL</button>
      </NewInvoiceWrapper>
    </React.Fragment>
  );
}

AddNewInvoice.propTypes = {
  onNewInvoiceCreation: PropTypes.func,
  onReset: PropTypes.func
};

export default AddNewInvoice;