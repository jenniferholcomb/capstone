import React from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';


// const DatesWrapper = styled.section`
//   border-radius: 10px;
//   height: 300px;
//   grid-gap: 0px;
//   grid-row: 1;
//   background-color: rgb(247, 243, 236);
// `;

function CalendarDay ({ month }) {
  console.log('m', month)
  const days = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
  const dates = month.map(x => x.date.charAt(8) === '0' ? x.date.substring(9) : x.date.substring(8));
  const elements = [...days, ...dates];
  console.log('elements', elements)

  return (
    <React.Fragment>
      {/* <DatesWrapper> */}
        {elements.map((item, index) => 
          <>
            <div className={`list-item-cal-${index + 1}`} key={index}>
              <p className="date">{item}</p>
              { index > 6 ? <p className="prop-percent">80</p> : '' }
            </div>
          </>
        )}
      {/* </DatesWrapper> */}
    </React.Fragment>
  );
}

CalendarDay.propTypes = {
  month: PropTypes.array
};

export default CalendarDay;