import React from 'react';
import moment from 'moment/moment';
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const Session = ({
    sessionLength,
    decrementSessionLengthByOneMinute,
    incrementSessionLengthByOneMinute,
  }) => {
const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes();

    
return (
    <div>
      <p id="session-label" className="title-labels">Session</p>
      <div className="format">
      <button id="session-decrement" className="inc-dec" onClick={decrementSessionLengthByOneMinute}>
        -
      </button>
      <p id="session-length" className="time-labels">{sessionLengthInMinutes}</p>
      <button id="session-increment" className="inc-dec" onClick={incrementSessionLengthByOneMinute}>
        +
      </button></div>
    </div>
  );
};


export default Session;