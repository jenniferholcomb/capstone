import React, { useEffect, useState } from "react"
import "./Goods.scss";
import PropTypes from 'prop-types';

function Goods(props) {
  const [newList, setNewList] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);
  const [color, setColor] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line
    const sortedArray = props.itemCodeList.sort((a,b) => {
      return new Date(a.date) - new Date(b.date);
    });
    const ascendingArray = sortedArray.reverse();
    
    if (ascendingArray.length >= 2) {
      if (ascendingArray[0].unitPrice < ascendingArray[1].unitPrice) {
        setColor("rgb(211, 238, 206, 0.8)");
      } else if (ascendingArray[0].unitPrice > ascendingArray[1].unitPrice) {
        setColor("rgb(254, 232, 218")
      } else {
        setColor("rgb(247, 243, 236)");
      }
    } else {
      setColor("rgb(247, 243, 236)");
    }
    setNewList(ascendingArray);
    setListLoaded(true); // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      {
        listLoaded ?
          <div style={{borderLeft: `18px solid ${color}`}} className="itemCard-2">
            {/* <h5 className="list-values">{newList[0].description}</h5> */}
            <table className="table-goods">
              <tbody className="goods-list">
                <th className="list-values">{newList[0].description}</th>
                <tr>
                  <th>Date</th>
                  <th>Price</th>
                </tr>
                {newList.map((value, index) => 
                  <React.Fragment key={index}>
                    <tr>
                      <td className="list-values">{value.date}</td>
                      <td className="list-values">{value.unitPrice.toFixed(2)}</td>
                    </tr>
                  </React.Fragment>
                )}
                <tr className="list-values-3">
                  <th>Item Code</th>
                  <td className="list-values">{newList[0].itemCode}</td>
                </tr>
              </tbody>
            </table>
          </div>
        :
          <React.Fragment>
            <p><em>...is loading...</em></p>
          </React.Fragment>
      }

    </React.Fragment>
  );
}

Goods.propTypes = {
  itemCode: PropTypes.string,
  description: PropTypes.string,
  unitPrice: PropTypes.number,
  date: PropTypes.string
};

export default Goods;
