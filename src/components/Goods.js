import React, { useEffect, useState } from "react"
import PropTypes from 'prop-types';

function Goods(props) {
  const [newList, setNewList] = useState(null);
  const [listLoaded, setListLoaded] = useState(false);

  useEffect(() => {
    const sortedArray = props.itemCodeList.sort((a,b) => {
      return new Date(a.date) - new Date(b.date);
    });
    const ascendingArray = sortedArray.reverse();
    setNewList(ascendingArray);
    setListLoaded(true);
  }, [])

  console.log(newList)
  console.log("newList")

  return (
    <React.Fragment>
      {
        listLoaded ?
          <div className="itemCard-2">
            <table >
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
                <React.Fragment>
                  <tr>
                    <td className="list-values">{value.date}</td>
                    <td className="list-values">{value.unitPrice.toFixed(2)}</td>
                  </tr>
                </React.Fragment>
              )}
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


