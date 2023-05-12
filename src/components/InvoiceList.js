import React from "react";
import Invoice from "./Invoice";
import PropTypes from 'prop-types';

function InvoiceList (props) {
  return (
    <React.Fragment>
      {props.invoices.map((entry, index) => 
        <Invoice
          whenInvoiceClicked= {entry.onInvoiceSelection}
          purveyor={entry.purveyor}
          invoiceNumber={entry.invoiceNumber}
          date={entry.date}
          numberItems={props.invoices.length - 1}
          total={entry.total}
          key={index} />
      )}
    </React.Fragment>
  );
}

InvoiceList.propTypes = {
  onInvoiceSelection: PropTypes.func,
  invoices: PropTypes.array
};

export default InvoiceList;