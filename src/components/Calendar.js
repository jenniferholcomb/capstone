import React from "react";
import CalendarDay from "./CalendarDay";

function Calendar () {
  return (
    <div id="calendar">
      <React.Fragment>
        <CalendarDay />
      </React.Fragment>
    </div>
  );
}

export default Calendar;