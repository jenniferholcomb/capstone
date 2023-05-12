import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 } from 'uuid';

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
      invoiceNumber: parseInt(event.target.invoiceNumber.value),
      date: event.target.date.value,
      key: v4()
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
          <button type='submit'>NEXT</button>
        </form>
      </NewInvoiceWrapper>
    </React.Fragment>
  );
}

AddNewInvoice.propTypes = {
  onNewInvoiceCreation: PropTypes.func
};

export default AddNewInvoice;