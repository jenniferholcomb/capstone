import React from "react";
import PropTypes from 'prop-types';

function InvoiceDetail (props) {
  const { invoice } = props;
  console.log(invoice)
  return (
    <>
      <div className="bar-inv-wrapper">
        <div className="name-inv-wrapper">
          INVOICE DETAIL
        </div>
        <div className="container-inv-wrapper">
          <button className="nav-inv-list-1" onClick={props.onReset}>BACK TO LIST</button>
        </div>
      </div>

      <div className="invoice-list-wrapper">
        <div className="invoice-det-container">
          <div className="heading-wrapper">
            <h3>INVOICE# {invoice[0].invoiceNumber}</h3>
            <h5>TOTAL <strong>${invoice[0].total}</strong></h5>
          </div>  
            <div className="date-wrapper">
              {invoice[0].date}
            </div>
            <div className="inv-print-wrapper">
            <table className="detail-table">
              <tr>
                <th className="det-head-1">No.</th>
                <th className="det-head-2">Item#</th>
                <th className="det-head-5">Description</th>
                <th className="det-head-2">Units</th>
                <th className="det-head-3">Unit/Price</th>
                <th className="det-head-4">Amount</th>
              </tr>
              
              {invoice.slice(1).map((item, index) => 
                <>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.itemCode}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitPrice.toFixed(2)}</td>
                    <td>{item.extendedAmount.toFixed(2)}</td>
                  </tr>
                </>
              )}
            </table>
            <div className="button-wrapper">
              <button className="nav-inv-list-2" onClick={ props.onClickingEdit }>EDIT INVOICE</button>
              <button className="nav-inv-list-2" onClick={ props.onClickingDelete }>DELETE INVOICE</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

InvoiceDetail.propTypes = {
  invoice: PropTypes.array,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onManageInvoices: PropTypes.func
}

export default InvoiceDetail;

