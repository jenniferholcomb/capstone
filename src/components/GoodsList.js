import React, { useEffect, useState } from "react";
import Goods from "./Goods";
import PropTypes from 'prop-types';
import "./GoodsList.scss";
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function GoodsList (props) {

  const [goodsListCode, setGoodsListCode] = useState(null);
  const [goodsLoaded, setGoodsLoaded] = useState(false);
  const { goods } = props;

  useEffect(() => {
    const allItemCode = goods.reduce((array, value) => array.concat(value.itemCode), []);
    const uniqueGoodsCode = [...new Set(allItemCode)];
    const goodsList = uniqueGoodsCode.map(item => {
      return goods.filter(value => value.itemCode === item);
    });
    setGoodsListCode(goodsList);
    setGoodsLoaded(true);
  }, [goods])

  return (
    <>
      <div className="bar-wrapper">
        <div className="name-wrapper">
          COST OF GOODS
        </div>
        <div className="container-wrapper">
          <button className="nav-5" onClick={props.onManageInvoicesClick}>MANAGE INVOICES</button>
          <button className="nav-6" onClick={props.onAddInvoiceClick}>ADD INVOICE</button>
        </div>
      </div>
      <div className="goods-list-wrapper">
        <div className="icon-wrapper">
          <div className="down-wrap goods-icon">
            <FaArrowDown />
            <span className="icon-text">COST DOWN</span>
          </div>
          <div className="up-wrap goods-icon">
            <FaArrowUp />
            <span className="icon-text">COST UP</span>
          </div>
        </div>    

        { 
        goodsLoaded ?
        <div className="inv-list-wrapper">
          {goodsListCode.map((entry, index) => 
            <Goods
              itemCodeList={entry} 
              key={index} />
          )}
        </div>
        :
          <p><em>...Loading</em></p>
        }
      </div>
    </>
  );
}

GoodsList.propTypes = {
  goods: PropTypes.array
};

export default GoodsList;