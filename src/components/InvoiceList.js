import React from "react";
import Invoice from "./Invoice";
import PropTypes from 'prop-types';

function InvoiceList (props) {
  return (
    <React.Fragment>
      {props.invoices.map((entry, index) => 
        <Invoice
          whenInvoiceClicked= {props.onInvoiceSelection}
          purveyor={entry.purveyor}
          invoiceNumber={entry.invoiceNumber}
          date={entry.date}
          numberItems={entry.numberItems}
          total={entry.total}
          key={index} />
      )};
      <br />
      <button onClick={props.onReset}>HOME</button>
    </React.Fragment>
  );
}

InvoiceList.propTypes = {
  onInvoiceSelection: PropTypes.func,
  invoices: PropTypes.array,
  onReset: PropTypes.func
};

export default InvoiceList;