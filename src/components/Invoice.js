import React from "react"
import PropTypes from 'prop-types';

function Invoice(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.onInvoiceSelection(props.invoiceNumber)}>
        <h3>{props.invoiceNumber} - {props.date}</h3>
        <p>{props.purveyor}</p>
        <p>{props.numberItems} - {props.total}</p>
      </div>
    </React.Fragment>
  );
}

Invoice.propTypes = {
  onInvoiceSelection: PropTypes.func,
  purveyor: PropTypes.string,
  invoiceNumber: PropTypes.number,
  date: PropTypes.string,
  numberItems: PropTypes.number,
  total: PropTypes.number
};

export default Invoice;

