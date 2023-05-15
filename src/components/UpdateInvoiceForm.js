import React, { useState } from "react";
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

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
            
                <label htmlFor="purveyor">PURVEYOR</label>
                <input
                  type='text'
                  name='purveyor'
                  placeholder={invoice[0].purveyor} 
                  value={invoice[0].purveyor}
                  onChange={(e) => handleChange(e, 0)}
                  required />
                <label htmlFor="invoiceNumber">INVOICE NUMBER</label>
                <input
                  type='number'
                  name='invoiceNumber'
                  placeholder={invoice[0].invoiceNumber} 
                  value={invoice[0].invoiceNumber} 
                  onChange={(e) => handleAllChange(e)}       
                  required />
                <label htmlFor="date">DATE</label>
                <input
                  type='date'
                  name='date'
                  placeholder={invoice[0].date}
                  value={invoice[0].date} 
                  onChange={(e) => handleAllChange(e)}                  
                  required />

                {invoice.slice(1).map((item, index) => 
                  <React.Fragment>
                    <label htmlFor="itemCode">ITEM CODE</label>
                    <input
                      type='text'
                      name='itemCode'
                      placeholder={item.itemCode}
                      value={item.itemCode} 
                      onChange={(e) => handleChange(e, (index+1))}                
                      required />
                    <label htmlFor="description">DESCRIPTION</label>
                    <textarea
                      name='description'
                      placeholder={item.description}
                      value={item.description} 
                      onChange={(e) => handleChange(e, (index+1))} 
                      required />
                    <label htmlFor="quantity">QUANTITY</label>
                    <input
                      type='number'
                      name='quantity'
                      placeholder={item.quantity}
                      value={item.quantity}  
                      onChange={(e) => handleChange(e, (index+1))}               
                      required />
                    <label htmlFor="unitPrice">UNIT PRICE</label>
                    <input
                      type='number'
                      name='unitPrice'
                      placeholder={item.unitPrice}
                      value={item.unitPrice}  
                      onChange={(e) => handleChange(e, (index+1))}               
                      required />
                    <button onClick={() => handleDeleteItem(index)}>DELETE ITEM</button>
                  </React.Fragment>
                )};
              <button type="submit">UPDATE INVOICE</button>
          </form>
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