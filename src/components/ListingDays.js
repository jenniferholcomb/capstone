import React from "react";
import PropTypes from 'prop-types';

function ListingDays (props) {

  const { listings, days } = props;

  return (
    <React.Fragment>
      {days.map((item, index) => 
        <div className={`list-item-str-${index + 1}`} key={index}>{item}</div>
      )}

      {listings[0].availability.slice(0, 14).map((item, index) => 
        <div className={`list-item-${index + 8}`} key={index + 7}>{item}</div>
      )} 
    </React.Fragment>
  );
}

ListingDays.propTypes = {
  days: PropTypes.array,
  listings: PropTypes.array
};

export default ListingDays;