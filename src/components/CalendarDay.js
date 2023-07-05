import React from "react";
/// import styled from 'styled-components';
import PropTypes from 'prop-types';


// const DatesWrapper = styled.section`
//   border-radius: 10px;
//   height: 300px;
//   grid-gap: 0px;
//   grid-row: 1;
//   background-color: rgb(247, 243, 236);
// `;

function CalendarDay ({ month, availablePercent }) {
  console.log('m', month)
  console.log('av perc', availablePercent[0].availability);
  const days = ['SU', 'M', 'TU', 'W', 'TH', 'F', 'SA'];
  const dates = month.map(x => x.date.charAt(8) === '0' ? x.date.substring(9) : x.date.substring(8));
  const elements = [...days, ...month];
  console.log('elements', elements)

  return (
    <React.Fragment>
      {/* <DatesWrapper> */}
        {elements.map((item, index) => 
          <>
            <div className={`list-item-cal-${index + 1}`} key={index}>
              { index > 6 ? 
                <>
                  <p className="date">{item.date.charAt(8) === '0' ? item.date.substring(9) : item.date.substring(8)}</p>
                  <p className="prop-percent">{availablePercent[0].availability[item.date]}</p> 
                </>
              : 
                <p className="date">{item}</p> 
              }
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