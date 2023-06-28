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

const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [year, setYear] = useState();

  useEffect(() => {
    const today = new Date();
    const monthNow = today.getMonth();
    setYear(today.getFullYear());

    const oneIndex = new Date(today.getFullYear(), monthNow, 1).getDay();

    const lastMonth = Array.from(Array(35)).map((x, i) =>  { 
      return { ['date']: new Date(year, monthNow + 1, (monthDays[monthNow - 1] - i)).toISOString().substring(0,10) }
    }).reverse();
    console.log('lastMonth', lastMonth);

    // const dateString = Object.keys(lastMonth[0]);
    // console.log('dateString', dateString[0]);

    // const thisMonth = Array.from(Array(monthDays[monthNow])).map((x, i) =>  { return {[i + 1]: null} });
    // console.log('thismonth', thisMonth);

    // const nextMonth = Array.from(Array(35 - (oneIndex + monthDays[monthNow]))).map((x, i) =>  { return {[i + 1]: null} });
    // console.log('nextMonth', nextMonth);

    // const allDays = [...lastMonth, ...thisMonth, ...nextMonth];
    // console.log('alldays', allDays);

    const fortnight = [...Array(14)].map((x, i) => new Date(new Date().setDate(today.getDate() + i)).getDate());
    setDates(fortnight);
  }, []);

  const monthDays = [31, (( year % 4 ) === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  console.log('month days', monthDays);

  // const [openUserListingForms, setOpenUserListingForms] = useState({})
  // const handleEditClick = (ulId) => {
  //   const newids = { ...openUserListingForms };
  //   newids[ulId] = true;
  //   setOpenUserListingForms(newids);
  // };

  // const handleCancelClick = (ulId) => {
  //   const newids = { ...openUserListingForms };
  //   delete newids[ulId];
  //   setOpenUserListingForms(newids);
  // };

  return (
    <React.Fragment>
      <CalendarWrapper>
        <NameWrapper>
          CALENDAR 
        </NameWrapper>
        <CalendarDay twoWeeks={dates} />
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;

// {
//   eventsLoaded ?
//     <Events onExitEvents={handleExitEvents}/>  
//   :
//     <CalendarDay 
//       whenCalendarClicked={handleCalendarSelection}
//       days={props.currentWeek} 
//       twoWeeks={dates} />
//   }