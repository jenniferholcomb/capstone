import React from "react";
import Goods from "./Goods";
import PropTypes from 'prop-types';

function GoodsList (props) {
  return (
    <React.Fragment>
      <h3>{props.goods[0].itemCode} - {props.goods.description}</h3>
      
      {props.goods.map((entry, index) => 
        <Goods
          itemCode={entry.itemCode}
          description={entry.description}
          quantity={entry.quantity}
          unitPrice={entry.unitPrice}
          extendedAmount={entry.extendedAmount} 
          invoiceId={entry.invoiceId}
          date={entry.date}
          key={index} />
      )}
    </React.Fragment>
  );
}

GoodsList.propTypes = {
  onInvoiceSelection: PropTypes.func,
  goods: PropTypes.array
};

export default GoodsList;