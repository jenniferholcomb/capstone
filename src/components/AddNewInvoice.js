import React from "react";
import PropTypes from 'prop-types';
import "./GoodsList.scss";
import "./AddNewInvoice.scss";
import { v4 } from 'uuid';

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
    <>
      <div className="bar-wrapper">
        <div className="name-wrapper">
          COST OF GOODS
        </div>
        <div className="container-wrapper">
          <button className="nav-6" onClick={props.onReset}>CANCEL</button>
        </div>
      </div>
      <div className="goods-list-wrapper">
        <div className="new-invoice-wrapper">
          <h4 className="head-add">START NEW INVOICE</h4>
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
            <button class="nav-inv-list-3" type='submit'>NEXT</button>
          </form>
        </div>
      </div>
    </>
  );
}

AddNewInvoice.propTypes = {
  onNewInvoiceCreation: PropTypes.func,
  onReset: PropTypes.func
};

export default AddNewInvoice;