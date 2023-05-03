import React from "react";
import CalendarDay from "./CalendarDay";
import styled from 'styled-components';

const CalendarWrapper = styled.section`
  grid-column: 3;
  margin: 25px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0px;
`;

function Calendar () {
  return (
    <CalendarWrapper>
      <CalendarDay />
    </CalendarWrapper>
  );
}

export default Calendar;