import React, { useState, useEffect } from "react";
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



function Calendar (props) {
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const fortnight = [...Array(14)].map((x, i) => new Date(new Date().setDate(today.getDate() + i)).getDate());
    setDates(fortnight);
  }, []);

  const handleCalendarSelection = () => {
    setEventsLoaded(true);
  }

  const handleExitEvents = () => {
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
            <Events onExitEvents={handleExitEvents}/>  
          :
            <CalendarDay 
              whenCalendarClicked={handleCalendarSelection}
              days={props.currentWeek} 
              twoWeeks={dates} />
          }
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;