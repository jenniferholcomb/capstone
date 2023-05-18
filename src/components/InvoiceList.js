import React from "react";
import Invoice from "./Invoice";
import PropTypes from 'prop-types';
import styled from "styled-components";

const ContainerWrapper = styled.section`
  grid-column: 1 / span 3;
  justify-self: start;
  padding-left: 10px;
`;

const InvListWrapper = styled.section`
  grid-column: 1 / span 3;
  grid-row: 2;
  padding-top: 60px;
  padding: 20px;
  display: inline-flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: center;
`;

function InvoiceList (props) {
  return (
    <React.Fragment>
      <ContainerWrapper>
        <button className="inv-list-btn" onClick={props.onReset}>BACK TO GOODS</button>
      </ContainerWrapper>
      <InvListWrapper>
        {props.invoices.map((entry, index) => 
          <Invoice
            whenInvoiceClicked= {props.onInvoiceSelection}
            purveyor={entry.purveyor}
            invoiceNumber={entry.invoiceNumber}
            date={entry.date}
            numberItems={entry.numberItems}
            total={entry.total}
            key={index} />
        )}
      </InvListWrapper>
    </React.Fragment>
  );
}

InvoiceList.propTypes = {
  onInvoiceSelection: PropTypes.func,
  invoices: PropTypes.array,
  onReset: PropTypes.func
};

export default InvoiceList;