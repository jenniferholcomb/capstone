import React from "react";
import CalendarDay from "./CalendarDay";
import styled from 'styled-components';


const CalendarWrapper = styled.section`

  margin-top: 20px;
  display: grid;
  grid-row: 3;
  grid-template-rows: 20px 55px 55px 55px 55px 55px;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0px;
`;



const NameWrapper = styled.section`
  grid-row: 1; 
  grid-column: 1 / span 7 ;
  justify-self: center;
  align-self: end;
  font-size: 30px;
  font-weight: bold;
`;

function Calendar () {
  return (
    <React.Fragment>
      <CalendarWrapper>
        <NameWrapper>
          MAY 
        </NameWrapper>
        <CalendarDay />
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;