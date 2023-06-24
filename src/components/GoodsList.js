import React, { useEffect, useState } from "react";
import Goods from "./Goods";
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
    console.log("goodslist");
    setGoodsListCode(goodsList);
    setGoodsLoaded(true);
  }, [])

  return (
    <React.Fragment>
      <ContainerWrapper>
        <button className="nav-5" onClick={props.onManageInvoicesClick}>MANAGE INVOICES</button>
        <button className="nav-6" onClick={props.onAddInvoiceClick}>ADD NEW INVOICE</button>
      </ContainerWrapper>
      { 
      goodsLoaded ?
      <InvListWrapper>
        {goodsListCode.map((entry, index) => 
          <Goods
            itemCodeList={entry} 
            key={index} />
        )}
      </InvListWrapper>
      :
        <p><em>...Loading</em></p>
      }
    </React.Fragment>
  );
}

GoodsList.propTypes = {
  goods: PropTypes.array
};

export default GoodsList;