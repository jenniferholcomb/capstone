import React from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

// const DetailsWrapper = styled.section`
//   display: flext;
// `;

const InvPrintWrapper = styled.section`
  display: grid;
  grid-column: 1 / span 3;
  width: 70%

`;

const HeadingWrapper = styled.section`
  grid-column: 1;
  padding-top: 40px;
  padding-bottom: 20px;
`;

const DateWrapper = styled.section`
  grid-column: 3;
  justify-self: end;
  font-weight: bold;
  padding-top: 40px;
  padding-bottom: 40px;
  padding-right: 50px;
`;

const ButtonWrapper = styled.section`
  padding-top: 40px;
  grid-column: 1 / span 3;
  display: flex;
  gap: 20px;
  height: 100%
`;

function InvoiceDetail (props) {
  const { invoice } = props;
  console.log(invoice)
  return (
    <React.Fragment>
      <HeadingWrapper>
        <h3>INVOICE# {invoice[0].invoiceNumber}</h3>
        <h5>TOTAL <strong>${invoice[0].total}</strong></h5>
      </HeadingWrapper>  
        <DateWrapper>
          {invoice[0].date}
        </DateWrapper>
        <InvPrintWrapper>
        <table >
          <tr>
            <th>No.</th>
            <th>Item#</th>
            <th>Description</th>
            <th>Units</th>
            <th>Unit/Price</th>
            <th>Amount</th>
          </tr>
          
          {invoice.slice(1).map((item, index) => 
            <React.Fragment>
              <tr>
                <td>{index + 1}</td>
                <td>{item.itemCode}</td>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice.toFixed(2)}</td>
                <td>{item.extendedAmount.toFixed(2)}</td>
              </tr>
            </React.Fragment>
          )}
        </table>
      </InvPrintWrapper>
      <ButtonWrapper>
        <button className="det-btn-3" onClick={props.onReset}>BACK TO LIST</button>
        <button className="det-btn-1" onClick={ props.onClickingEdit }>EDIT INVOICE</button>
        <button className="det-btn-2" onClick={ props.onClickingDelete }>DELETE INVOICE</button>
      </ButtonWrapper>
    </React.Fragment>
  );
}

InvoiceDetail.propTypes = {
  invoice: PropTypes.array,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onReset: PropTypes.func
}

export default InvoiceDetail;

