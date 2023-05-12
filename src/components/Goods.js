import React from "react"
import PropTypes from 'prop-types';

function Goods(props) {
  return (
    <React.Fragment>
      <div className="">
        <p>{props.date} - ${props.unitPrice}</p>
      </div>
    </React.Fragment>
  );
}

Goods.propTypes = {
  itemCode: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.number,
  unitPrice: PropTypes.number,
  extendedAmount: PropTypes.number, 
  invoiceId: PropTypes.number,
  date: PropTypes.string
};

export default Goods;


