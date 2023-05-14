import React from "react";
import styled from 'styled-components';

const CurrentDayWrapper = styled.section`
  grid-column: 1 / span 2;
  grid-row: 2;
  outline: 1px solid black;
  margin-left: 30px;
`;

function CurrentDay () {
  return (
    <CurrentDayWrapper>
      <p>Current Day</p>
    </CurrentDayWrapper>
  );
}

export default CurrentDay;

// const handleItemsValues = (event) => {
//   return {
//     itemCode: event.target.itemCode.value,
//     description: event.target.description.value,
//     quantity: parseInt(event.target.quantity.value),
//     unitPrice: parseInt(event.target.unitPrice.value),
//     extendedAmount: parseInt(event.target.quantity.value) * parseInt(event.target.unitPrice.value), 
//     invoiceNumber: currentInvoice.current[0].invoiceNumber,
//     date: currentInvoice.current[0].date,
//     key: v4()
//   };
// }

// const handleNewItemsSubmission = (event) => {
//   event.preventDefault();
//   const newi = handleItemsValues(event);
//   props.onAddItemsCreation(newi);
//   event.target.reset();
// };

// const handleCompleteItemSubmission = (event) => {
//   event.preventDefault();
//   props.onCompleteAddingItems(handleItemsValues(event));
//   event.target.reset();
// }