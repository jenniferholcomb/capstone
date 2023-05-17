import React from "react";
import CalendarDay from "./CalendarDay";
import styled from 'styled-components';


const CalendarWrapper = styled.section`
  margin-top: 20px;
  grid-row: 3;
`;

const NameWrapper = styled.section` 
  grid-column: 1 / span 7 ;
  justify-self: center;
  align-self: end;
  font-size: 30px;
  font-weight: bold;
`;

const DatesWrapper = styled.section`
  outline: 1px solid black;
  border-radius: 10px;
  grid-template-rows: 55px 55px 55px 55px 55px;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0px;
  display: grid;
`;

function Calendar () {
  return (
    <React.Fragment>
      <CalendarWrapper>
        <NameWrapper>
          MAY 
        </NameWrapper>
        <DatesWrapper>
          <CalendarDay />
        </DatesWrapper>
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;