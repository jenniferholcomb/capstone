import React from "react";
import styled from 'styled-components';

const DatesWrapper = styled.section`
  border-radius: 10px;
  grid-template-rows: 14% 43% 43%;
  grid-template-columns: repeat(7, 1fr);
  height: 150px;
  grid-gap: 0px;
  display: grid;
  background-color: rgb(247, 243, 236);
`;

function CalendarDay (props) {

  return (
    <React.Fragment>
      <div onClick = {() => props.whenCalendarClicked()}>
        <DatesWrapper>
        <div className="list-item-1">M</div>
        <div className="list-item-2">TU</div>
        <div className="list-item-3">W</div>
        <div className="list-item-4">TH</div>
        <div className="list-item-5">F</div>
        <div className="list-item-6">SA</div>
        <div className="list-item-7">SU</div>
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
        </DatesWrapper>
      </div>

    </React.Fragment>
  );
}

export default CalendarDay;