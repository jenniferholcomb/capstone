import React from "react";
import styled from 'styled-components';

const BoxWrapper = styled.section`
  background-color: black;
`;

function CalendarDay () {
  return (
    <React.Fragment>
      <BoxWrapper>
        <div className="cal-item-1" id='l-border'></div>
        <div className="cal-item-2">1</div>
        <div className="cal-item-3">2</div>
        <div className="cal-item-4">3</div>
        <div className="cal-item-5">4</div>
        <div className="cal-item-6">5</div>
        <div className="cal-item-7">6</div>
        <div className="cal-item-8" id='l-border'>7</div>
        <div className="cal-item-9">8</div>
        <div className="cal-item-10">9</div>
        <div className="cal-item-11">10</div>
        <div className="cal-item-12">11</div>
        <div className="cal-item-13">12</div>
        <div className="cal-item-14">13</div>
        <div className="cal-item-15" id='l-border'>14</div>
        <div className="cal-item-16">15</div>
        <div className="cal-item-17">16</div>
        <div className="cal-item-18">17</div>
        <div className="cal-item-19">18</div>
        <div className="cal-item-20">19</div>
        <div className="cal-item-21">20</div>
        <div className="cal-item-22" id='l-border'>21</div>
        <div className="cal-item-23">22</div>
        <div className="cal-item-24">23</div>
        <div className="cal-item-25">24</div>
        <div className="cal-item-26">25</div>
        <div className="cal-item-27">26</div>
        <div className="cal-item-28">27</div>
        <div className="cal-item-29" id='l-border'>28</div>
        <div className="cal-item-30">29</div>
        <div className="cal-item-31">30</div>
        <div className="cal-item-32">31</div>
        <div className="cal-item-33"></div>
        <div className="cal-item-34"></div>
        <div className="cal-item-35"></div>
      </BoxWrapper>
    </React.Fragment>
  );
}

export default CalendarDay;