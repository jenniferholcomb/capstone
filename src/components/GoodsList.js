import React, { useEffect, useState } from "react";
import Goods from "./Goods";
import PropTypes from 'prop-types';

function GoodsList (props) {

  const [allItemID, setAllItemId] = useState(null);
  const { goods } = props;

  useEffect(() => {
    console.log(goods);
    const allItemCode = goods.reduce((array, value) => array.concat(value.itemCode), []);
    console.log(allItemCode);
    const uniqueGoodsCode = [...new Set(allItemCode)];
    console.log(uniqueGoodsCode);
    const goodsList = uniqueGoodsCode.map(item => {
      return [goods.filter(value => value.itemCode === item)];
    });
    console.log(goodsList);
    //setAllItemId(uniqueGoodsCode);
  })
  
  return (
    <React.Fragment>
      {/* <h3>{props.goods[0].itemCode} - {props.goods.description}</h3>
      
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
      )} */}
    </React.Fragment>
  );
}

GoodsList.propTypes = {
  onInvoiceSelection: PropTypes.func,
  goods: PropTypes.array
};

export default GoodsList;