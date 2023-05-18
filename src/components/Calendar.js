import React from "react";
import CalendarDay from "./CalendarDay";
import styled from 'styled-components';


const CalendarWrapper = styled.section`
  margin-top: 20px;
  grid-row: 3;
`;

const NameWrapper = styled.section` 
  display: grid;
  justify-items: end;
  font-size: 23px;
  font-weight: bold;
  font-style: italic;
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
          CALENDAR 
        </NameWrapper>
        <DatesWrapper>
          <CalendarDay />
        </DatesWrapper>
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;