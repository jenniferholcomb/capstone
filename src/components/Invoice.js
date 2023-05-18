import React from "react"
import PropTypes from 'prop-types';

function Invoice(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenInvoiceClicked(props.invoiceNumber)}>
        <div className="itemCard-1">
          <table >
            <tr>
              <th>INVOICE#</th>
              <td className="list-values">{props.invoiceNumber}</td>
            </tr>
            <tr>
              <th>DATE</th>
              <td className="list-values">{props.date}</td>
            </tr>
            <tr>
              <th>PURVEYOR</th>
              <td className="list-values">{props.purveyor}</td>
            </tr>
            <tr>
              <th>NO. ITEMS</th>
              <td className="list-values">{props.numberItems}</td>
            </tr>
            <tr>
              <th>TOTAL</th>
              <td className="list-values">${props.total}</td>
            </tr>
          </table>
        </div>
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

