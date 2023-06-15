import React from "react";
import PropTypes from 'prop-types';

function ListingDays (props) {

  console.log(props.listings)
  return (
    <React.Fragment>
      {props.days.map((item, index) => 
        <div className={`list-item-str-${index + 1}`}>{item}</div>
      )}

      {props.listings.slice(0, 14).map((item, index) => 
        <div className={`list-item-${index + 8}`}>{item}</div>
      )}
    </React.Fragment>
  );
}

ListingDays.propTypes = {
  days: PropTypes.array,
  listings: PropTypes.array
};

export default ListingDays;