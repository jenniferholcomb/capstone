import React from "react";
import PropTypes from 'prop-types';

function ListingDay (props) {
  return (
    <React.Fragment>
      {props.days.map((item, index) => 
        <div className={`list-item-str-${index + 1}`}>{item}</div>
      )}

      <div className="list-item-8">86</div>
      <div className="list-item-9">95</div>
      <div className="list-item-10">96</div>
      <div className="list-item-11">93</div>
      <div className="list-item-12">54</div>
      <div className="list-item-13">16</div>
      <div className="list-item-14">21</div>
      <div className="list-item-15">86</div>
      <div className="list-item-16">95</div>
      <div className="list-item-17">96</div>
      <div className="list-item-18">93</div>
      <div className="list-item-19">54</div>
      <div className="list-item-20">16</div>
      <div className="list-item-21">21</div>
    </React.Fragment>
  );
}

ListingDay.propTypes = {
  days: PropTypes.array,
  propIds: PropTypes.array
};

export default ListingDay;