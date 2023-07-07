import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

function CalendarDay ({ month, availablePercent, monthName }) {
  const [monthBg, setMonthBg] = useState();
  console.log('m', month)
  console.log('av perc', availablePercent[0].availability);
  console.log('mm', month[0].background);

  useEffect(() => {
    console.log('here')
    const newMonth = month.map(item => {
      if (availablePercent[0].availability[item.date] >= 90) { 
        return {
          ...item,
          background: 'rgb(254, 232, 218'
        } 
      } else if (availablePercent[0].availability[item.date] >= 70) {
        return {
          ...item,
          background: 'rgba(249, 249, 223, 0.903)'
        }
      } else {
        if (item.background) {
          return { ...item };
        } else {
          return {
            ...item,
            background: 'none'
          };
        }
      }
    });

    console.log('nm', newMonth);
    setMonthBg(newMonth);
  }, []);


  return (
    <React.Fragment>
      {monthBg && (
        <>
          <div className="cal-month">
            <p>{monthName}</p>
          </div>
          {monthBg.map((item, index) => 
            <>
              <div className={`list-item-cal-${index + 1}`} key={index} style={{backgroundColor: `${item.background}`}}>
                <>
                  <p className="date">{item.date.charAt(8) === '0' ? item.date.substring(9) : item.date.substring(8)}</p>
                  <p className="prop-percent">{availablePercent[0].availability[item.date]}</p> 
                </>
              </div>
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
}

CalendarDay.propTypes = {
  month: PropTypes.array
};

export default CalendarDay;