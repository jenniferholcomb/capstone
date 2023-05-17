import React, { useState } from "react";
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import styled from "styled-components";


const InvoiceWrapper = styled.section`
display: grid;
justify-content: center;
outline: 1px solid black;
`;

const TableWrapper = styled.section`
  display: grid;
  grid-column: 1 / span 3;
  grid-row: 2;
  width: 95%
  outline: 1px solid black;
`;

const CancelWrapper = styled.section`
  display: flex;
  grid-column: 3;
  grid-row: 1;
  outline: 1px solid black;
`;

function UpdateInvoiceForm(props) {
  const { invoice } = props;
  const [state, setState] = useState(invoice);

  const handleChange = (event, index) => {
    const { value, name, type } = event.target;

    const newState = [...state];
    if ( type === 'text') {
      newState[index] = {
        ...newState[index],
        [name]: value
      };
    } else if (name === 'unitPrice' || name === 'quantity') {
      newState[index] = {
        ...newState[index],
        [name]: parseFloat(value)
      };
      newState[index] = {
        ...newState[index],
        'extendedAmount': parseFloat(newState[index].unitPrice * newState[index].quantity)
      };
    } else {
      newState[index] = {
        ...newState[index],
        [name]: parseInt(value)
      };
    }
    setState(newState);
  };

  const handleAllChange = (event) => {
    const { value, name } = event.target;

    const newState = [...state];
    newState.map((entry, index) => 
      newState[index] = {
        ...newState[index],
        [name]: value
      }
    );
    setState(newState);
  }

  const handleDeleteItem = (index) => {
    const newState = [...state];
    if (newState.length === 2) {
      props.onClickingDelete();
    } else {
      const deleteId = newState[index+1].id;
      const updatedItems = [...newState.slice(0,index+1), ...newState.slice(index+2, newState.length)];
      console.log(updatedItems);
      console.log('up')
      setState(updatedItems);
      props.onDeleteItem(deleteId, updatedItems);
    }
  }

  const handleEditsSubmission = (event) => {
    event.preventDefault();
    const newState = [...state];
    props.onEditFormCreation(newState);
  }

  return (
    <React.Fragment>
      
        
        <form onSubmit={handleEditsSubmission}>
        <InvoiceWrapper>
        <table>
        <tr>
          <td><label htmlFor="purveyor">PURVEYOR</label></td>
          <td><input
              type='text'
              name='purveyor'
              placeholder={invoice[0].purveyor} 
              value={invoice[0].purveyor}
              onChange={(e) => handleChange(e, 0)}
              required /></td>
        </tr>
        <tr>
          <td><label htmlFor="invoiceNumber">INVOICE NUMBER</label></td>
          <td><input
                type='number'
                name='invoiceNumber'
                placeholder={invoice[0].invoiceNumber} 
                value={invoice[0].invoiceNumber} 
                onChange={(e) => handleAllChange(e)}       
                required /></td>
        </tr>
        <tr> 
          <td><label htmlFor="date">DATE</label></td>
              <input
                type='date'
                name='date'
                placeholder={invoice[0].date}
                value={invoice[0].date} 
                onChange={(e) => handleAllChange(e)}                  
                required />
        </tr>
        <tr>
          <th>Item#</th>
          <th>Description</th>
          <th>Units</th>
          <th>Price/Unit</th>
        </tr>
        </table>
        
        
        <TableWrapper>
        <table>
        
            {invoice.slice(1).map((item, index) => 
              <React.Fragment>
                <tr>
                <td><input
                  class="input-1"
                  type='text'
                  name='itemCode'
                  placeholder={item.itemCode}
                  value={item.itemCode} 
                  onChange={(e) => handleChange(e, (index+1))}                
                  required /></td>      
                <td><textarea
                  class="input-2"
                  name='description'
                  placeholder={item.description}
                  value={item.description} 
                  onChange={(e) => handleChange(e, (index+1))} 
                  required /></td>
                <td><input
                  class="input-3"
                  type='number'
                  name='quantity'
                  placeholder={item.quantity}
                  value={item.quantity}  
                  onChange={(e) => handleChange(e, (index+1))}               
                  required /></td>
                <td><input
                  class="input-4"
                  type='number'
                  name='unitPrice'
                  placeholder={item.unitPrice}
                  value={item.unitPrice}  
                  onChange={(e) => handleChange(e, (index+1))}               
                  required /></td>
                <td><button onClick={() => handleDeleteItem(index)}>DELETE</button></td>
                </tr>
              </React.Fragment>
            )};
          </table>
          </TableWrapper>
          <CancelWrapper><button onClick={props.onReset}>CANCEL</button>
          <button type="submit">UPDATE INVOICE</button></CancelWrapper>
          </InvoiceWrapper>
        </form><br />
      
          
          
    </React.Fragment>
  );
}

UpdateInvoiceForm.propTypes = {
  invoice: PropTypes.array,
  onEditFormCreation: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default UpdateInvoiceForm;