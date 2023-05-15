import React from "react";
import PropTypes from 'prop-types';

function InvoiceDetail (props) {
  const { invoice } = props;

  return (
    <React.Fragment>

      <button onClick={ props.onClickingEdit }>Edit Invoice</button>
      <button onClick={ props.onClickingDelete }>Delete Invoice</button>
      <button onClick={props.onReset}>HOME</button>
    </React.Fragment>
  );
}

InvoiceDetail.propTypes = {
  invoice: PropTypes.array,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func,
  onReset: PropTypes.func
}

export default InvoiceDetail;

