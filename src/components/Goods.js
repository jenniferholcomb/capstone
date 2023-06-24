import React, { useEffect, useState } from "react"
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
        setColor("rgb(223, 238, 206)");
      } else if (ascendingArray[0].unitPrice > ascendingArray[1].unitPrice) {
        setColor("rgb(254, 232, 218")
      } else {
        setColor("rgba(255, 255, 255, 0.785)");
      }
    }
    setNewList(ascendingArray);
    setListLoaded(true);
  }, [])

  return (
    <React.Fragment>
      {
        listLoaded ?
          <div style={{backgroundColor: `${color}`}} className="itemCard-2">
            <table>
              <tbody>
                <tr>
                  <th>ITEM CODE</th>
                  <td className="list-values">{newList[0].itemCode}</td>
                </tr>
                <tr><td className="list-values">{newList[0].description}</td></tr>
                <tr>
                  <th>DATE</th>
                  <th>PRICE</th>
                </tr>
                {newList.map((value, index) => 
                  <React.Fragment key={index}>
                    <tr>
                      <td className="list-values">{value.date}</td>
                      <td className="list-values">{value.unitPrice.toFixed(2)}</td>
                    </tr>
                  </React.Fragment>
                )}
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
