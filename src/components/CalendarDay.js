import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DatesWrapper = styled.section`
  border-radius: 10px;
  grid-template-rows: 8% 18% 18% 18% 18% 18%;
  grid-template-columns: repeat(7, 1fr);
  height: 300px;
  grid-gap: 0px;
  display: grid;
  background-color: rgb(247, 243, 236);
`;

function CalendarDay (props) {
  const days = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
  const elements = [...days, ...props.twoWeeks];

  return (
    <React.Fragment>
      <DatesWrapper>
        {elements.map((item, index) => 
          <div className={`list-item-cal-${index + 1}`} key={index}>{item}</div>
        )}
      </DatesWrapper>
    </React.Fragment>
  );
}

CalendarDay.propTypes = {
  days: PropTypes.array,
  twoWeeks: PropTypes.array
};

export default CalendarDay;