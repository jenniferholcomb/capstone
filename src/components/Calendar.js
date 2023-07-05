import React, { useState, useEffect } from "react";
import CalendarDay from "./CalendarDay";
import useSTRController from "./useSTRController.js";
import usePropertyListing from "./usePropertyListing";
import styled from 'styled-components';
// import Events from "./Events";

const CompWrapper = styled.section`
  outline: px solid white;
  border-radius: 10px;
  display: grid;
  grid-row: 1;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: 1.5em repeat(5, 1fr);
  grid-gap: 0px;
  height: 300px;
  background-color: rgb(247, 243, 236);
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
  const [month, setMonth] = useState();
  // eslint-disable-next-line
  const [propertyList, loadProperties] = useSTRController();
  const [listingAvailability] = usePropertyListing(propertyList);
  const [monthAvail, setMonthAvail] = useState();

  useEffect(() => {
    loadProperties(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const today = new Date();
    const monthNow = today.getMonth();
    setMonth(monthNow + 1);
    const year = today.getFullYear();
    const monthDays = [31, (( year % 4 ) === 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const oneIndex = new Date(today.getFullYear(), monthNow, 1).getDay();
    console.log('oneIndex', oneIndex);
    
    const preMonthArr = Array.from(Array(oneIndex)).map((x, i) =>  { 
      return { 'date': new Date(
        monthNow === 0 ? year - 1 : year, 
        monthNow === 0 ? 11 : monthNow - 1, 
        monthDays[monthNow - 1] - i
        ).toISOString().substring(0,10) }
    }).reverse();
    console.log('preMOnthARR', preMonthArr);
    const thisMonthArr = Array.from(Array(monthDays[monthNow])).map((x, i) =>  { 
      return { 'date': new Date(
        year, 
        monthNow, 
        i + 1
        ).toISOString().substring(0,10) }
    });
    console.log('thisMonthArr', thisMonthArr);
    const lastIndex = new Date(today.getFullYear(), monthNow, monthDays[monthNow]).getDay();
    console.log('lastINdex', lastIndex);
    const endMonthArr = Array.from(Array(6 - lastIndex)).map((x, i) =>  { 
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

  useEffect(() => {
    if (propertyList && listingAvailability) {
      console.log('list avail', listingAvailability);
      console.log('dates', dates);
      const availMonth = listingAvailability.filter(item => item.month === month);
      console.log('availMonth', availMonth[0].availability['2023-07-04']);
      setMonthAvail(availMonth);
    } else if (propertyList) {
      console.log('property list cal', propertyList);
    }
  }, [propertyList, listingAvailability]);

  return (
    <React.Fragment>
      <div>
        <NameWrapper>
          CALENDAR 
        </NameWrapper>
        <CompWrapper>
          <CalendarDay month={dates} 
                       availablePercent={monthAvail} />
        </CompWrapper>
      </div>
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