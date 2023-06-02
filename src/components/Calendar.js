import React, { useState } from "react";
import CalendarDay from "./CalendarDay";
import styled from 'styled-components';
import Events from "./Events";

const CalendarWrapper = styled.section`
  margin-top: 20px;
  
`;

const NameWrapper = styled.section` 
  display: grid;
  justify-items: end;
  font-size: 23px;
  font-weight: bold;
  font-style: italic;
`;

// const DatesWrapper = styled.section`
//   outline: 1px solid black;
//   border-radius: 10px;
//   grid-template-rows: 55px 55px 55px 55px 55px;
//   grid-template-columns: repeat(7, 1fr);
//   grid-gap: 0px;
//   display: grid;
// `;



function Calendar () {
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [days, setDays] = useState(['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA']);

  const handleCalendarSelection = () => {
    setEventsLoaded(true);
  }

  const handleExitEvens = () => {
    setEventsLoaded(false);
  }

  return (
    <React.Fragment>
      <CalendarWrapper>
        <NameWrapper>
          CALENDAR 
        </NameWrapper>
        
          {
          eventsLoaded ?
            <Events onExitEvents={handleExitEvens}/>  
          :
          
            <CalendarDay whenCalendarClicked= {handleCalendarSelection}/>
      
          }
        
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;