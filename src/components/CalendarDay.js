import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DatesWrapper = styled.section`
  border-radius: 10px;
  grid-template-rows: 14% 43% 43%;
  grid-template-columns: repeat(7, 1fr);
  height: 150px;
  grid-gap: 0px;
  display: grid;
  background-color: rgb(247, 243, 236);
`;

function CalendarDay (props) {
  const elements = [...props.days, ...props.twoWeeks];

  return (
    <React.Fragment>
      <div onClick = {() => props.whenCalendarClicked()}>
        <DatesWrapper>
          {elements.map((item, index) => 
            <div className={`list-item-cal-${index + 1}`}>{item}</div>
          )}
        </DatesWrapper>
      </div>
    </React.Fragment>
  );
}

CalendarDay.propTypes = {
  whenCalendarClicked: PropTypes.func,
  days: PropTypes.array,
  twoWeeks: PropTypes.array
};

export default CalendarDay;