import React, { useState, useEffect } from "react";
import CalendarDay from "./CalendarDay";
import styled from 'styled-components';
// import Events from "./Events";

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

const Calendar = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const today = new Date();
    const monthNow = today.getMonth();
    const year = today.getFullYear();
    const monthDays = [31, (( year % 4 ) === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const oneIndex = new Date(today.getFullYear(), monthNow, 1).getDay();

    const preMonthArr = Array.from(Array(oneIndex)).map((x, i) =>  { 
      return { 'date': new Date(
        monthNow === 0 ? year - 1 : year, 
        monthNow === 0 ? 11 : monthNow - 1, 
        monthDays[monthNow - 1] - i
        ).toISOString().substring(0,10) }
    }).reverse();

    const thisMonthArr = Array.from(Array(monthDays[monthNow])).map((x, i) =>  { 
      return { 'date': new Date(
        year, 
        5, 
        i + 1
        ).toISOString().substring(0,10) }
    });

    const endMonthArr = Array.from(Array(35 - (oneIndex + monthDays[monthNow]))).map((x, i) =>  { 
      return { 'date': new Date(
        monthNow === 11 ? year + 1 : year, 
        monthNow === 11 ? 0 : monthNow + 1, 
        i + 1
        ).toISOString().substring(0,10) }
    });

    const allMonth = [...preMonthArr, ...thisMonthArr, ...endMonthArr];
    setDates(allMonth);

    // const dateString = Object.keys(lastMonth[0]);
    // console.log('dateString', dateString[0]);
  }, []);

  

  return (
    <React.Fragment>
      <CalendarWrapper>
        <NameWrapper>
          CALENDAR 
        </NameWrapper>
        <CalendarDay month={dates} />
      </CalendarWrapper>
    </React.Fragment>
  );
}

export default Calendar;

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