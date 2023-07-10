import React, { useEffect, useState } from "react";
import Goods from "./Goods";
import PropTypes from 'prop-types';
import styled from "styled-components";
import "./GoodsList.scss";
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

const GoodsListWrapper = styled.section`
  display: grid;
  grid-row: 2 / span 6;
  grid-column: 1 / span 4;
  margin-left: 20px;
  margin-bottom: 30px;
  margin-right: 35px;
  justify-items: center;
  align-items: center;
  overflow-y: scroll;
`;

const BarWrapper = styled.section`
  display: grid;
  grid-row: 1;
  grid-column: 1 / span 4;  
  background-color: rgba(100, 99, 99, 0.71);
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 35px;
  padding-top: 6px;
  padding-left: 20px;
`;

const NameWrapper = styled.section` 
  font-size: 21px;
  color: white;
  justify-content: start;
  margin-top: 1px;
  padding-left: 3px;
`;

const ContainerWrapper = styled.section`
  display: flex;
  grid-row: 1;
  grid-column: 2 / span 3;
  justify-self: end;
  margin-right: 20px;
  margin-top: 1px;
  gap: 10px;
`;

const IconWrapper = styled.section`
  grid-column: 3 / span 2;;
  display: flex;
  justify-self: end:
  margin-top: 10px;
  margin-right: 13px;
  padding-left: 10px;
  width: 100%;
`;

const DownWrap = styled.section`
  margin-top: 10px;
  margin-left: 2px;
  display: flex;
  height: 32px;
  justify-content: center;
  border-radius: 5px;
  padding-top: 9px;
  background-color: rgba(211, 238, 206, 0.80);
  box-shadow: 0 0px 5px 0 rgba(239, 239, 239, 0.459), 1px 1px 10px 0 rgba(121, 121, 121, 0.25); 
  width: 32px;
`;

const UpWrap = styled.section`
  margin-top: 10px;
  margin-left: 10px;
  display: flex;

  height: 32px;
  justify-content: center;
  border-radius: 5px;
  padding-top: 7px;
  background-color: rgb(254, 232, 218);
  box-shadow: 0 0px 5px 0 rgba(239, 239, 239, 0.459), 1px 1px 10px 0 rgba(121, 121, 121, 0.25); 
  width: 32px;
`;

const InvListWrapper = styled.section`
  grid-column: 1 / span 4;
  grid-row: 2;
  padding: 10px;
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
      <BarWrapper>
        <NameWrapper>
          COST OF GOODS
        </NameWrapper>
        <ContainerWrapper>
          <button className="nav-5" onClick={props.onManageInvoicesClick}>MANAGE INVOICES</button>
          <button className="nav-6" onClick={props.onAddInvoiceClick}>ADD NEW INVOICE</button>
        </ContainerWrapper>
      </BarWrapper>
      <GoodsListWrapper className="goods-shadow">
        <IconWrapper>
          <DownWrap className="goods-icon">
            <FaArrowDown />
            <span className="icon-text">COST DOWN</span>
          </DownWrap>
          <UpWrap className="goods-icon">
            <FaArrowUp />
            <span className="icon-text">COST UP</span>
          </UpWrap>
        </IconWrapper>    

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
      </GoodsListWrapper>
    </React.Fragment>
  );
}

GoodsList.propTypes = {
  goods: PropTypes.array
};

export default GoodsList;