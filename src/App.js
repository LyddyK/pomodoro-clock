import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Break from './components/Break';
import Session from './components/Session';
import TimeLeft from './components/TimeLeft';
import Beep from './Beep.mp3'

function App() {
  const audioElement = useRef(null);
  const [currentSessionType, setCurrentSessionType] = useState('Session');
  const [intervalId, setIntervalId] = useState(null);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(300);
  const [timeLeft, setTimeLeft] = useState(sessionLength);




  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  useEffect(()=>{
    if (timeLeft === 0 ){   
      audioElement.current.play();
      if (currentSessionType === 'Session'){
        setCurrentSessionType('Break')
        setTimeLeft(breakLength)
      } else if (currentSessionType === 'Break'){
        setCurrentSessionType('Session')
        setTimeLeft(sessionLength);
      }
    }
  },[breakLength, currentSessionType, timeLeft, sessionLength, audioElement])

 

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength <= 0) {
      setBreakLength(60);
    } else {
      setBreakLength(newBreakLength);
    }
  };
  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60;
    if (newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength);
    }
  };
  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength <= 0) {
      setSessionLength(60);
    } else {
      setSessionLength(newSessionLength);
    }
  };
  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength <= 60 * 60) {
      setSessionLength(sessionLength + 60);
    }
  };


    const isStarted = intervalId !== null;
  const handleStartStopClick = () => {
      if (isStarted) {
        if(intervalId){
          clearInterval(intervalId);
        }
        setIntervalId(null);
      } else {
        const newIntervalId = setInterval(() => {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
        }, 1000); 
        setIntervalId(newIntervalId);
      }
    };


  

  
    const handleResetButtonClick = () => {
      audioElement.current.load();
      clearInterval(intervalId);
      setIntervalId(null);
      setCurrentSessionType('Session');
      setSessionLength(25*60);
      setBreakLength(5*60);
      setTimeLeft(sessionLength);
    };
  

    return (
      <div className="App">
        <div className='time-sets'>
        <Break
          id="break"
          breakLength={breakLength}
          decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
        />
        
      <Session
        id="session"
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      />
      </div>
      <div id="time-left-reset">
      <TimeLeft
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeLeft={timeLeft}
      />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button></div>
      <audio id="beep" ref={audioElement} type="audio/mpeg">
        <source src={Beep} type="audio/mpeg" />
      </audio>
      
    </div>
  );
}

export default App;
