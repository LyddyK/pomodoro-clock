import React from 'react';
import moment from 'moment/moment';
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);


const Break = ({
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreakLengthByOneMinute,
  }) => {
    
const breakLengthInMinutes = moment.duration(breakLength, 's').asMinutes();

return (
    <div>
      <p id="break-label" className="title-labels">Break</p>
      <div className="format">
      <button id="break-decrement" className="inc-dec" onClick={decrementBreakLengthByOneMinute}>
        -
      </button>
      <p id="break-length" className="time-labels">{breakLengthInMinutes}</p>
      <button id="break-increment" className="inc-dec" onClick={incrementBreakLengthByOneMinute}>
        +
      </button></div>
    </div>
  );
};

export default Break;