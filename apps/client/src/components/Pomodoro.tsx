"use client"
import { BACKEND_URL } from '@/lib/Constants';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { FaPause, FaPlay, FaSyncAlt, FaArrowUp, FaArrowDown, FaPlus, FaMinus } from 'react-icons/fa';

const PomodoroApp = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [minutes, setMinutes] = useState(sessionLength);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [showSmallPomodoro, setShowSmallPomodoro] = useState(false);

  const {data : session} = useSession()

  useEffect(() => {

    let intervalId: NodeJS.Timeout;

    if (isRunning && minutes >= 0 && seconds >= 0) {
      intervalId = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsSession(!isSession);
            
            if (isSession) {
              console.log("hello")
              createStudyTime(sessionLength / 60);
            }
            setMinutes(isSession ? breakLength : sessionLength);
            setSeconds(0);

            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds, isSession, breakLength, sessionLength]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsSession(true);
    setMinutes(sessionLength);
    setSeconds(0);
  };

  const togglePomodoroSize = () => {
    setShowSmallPomodoro(!showSmallPomodoro);
  };

  const createStudyTime = async (hours : number) => {
    console.log("im in create study time func in fornt ")
    try {
      const response = await fetch(BACKEND_URL + '/pomodoro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId : session?.user.id , 
          hours 
        }),
      });
    } catch (error) {
      console.error('Error creating study time:', error);
    }
  };

  return (
    <div>
      {!showSmallPomodoro ? (
        <div className="container mx-auto p-2 bg-transparent rounded-md shadow-md text-white font-bold text-sm">
          <h1 className="text-lg font-semibold text-center mb-2">Pomodoro Timer</h1>
          <div className="flex justify-around items-center mb-2">
            <div>
              <p>Session Length: {sessionLength} minutes</p>
              <div className="flex justify-center items-center">
                <button onClick={() => setSessionLength(sessionLength + 1)} className="p-1 border rounded-full text-white"><FaPlus /></button>
                <button onClick={() => setSessionLength(Math.max(1, sessionLength - 1))} className="p-1 border rounded-full text-white" disabled={sessionLength === 1}><FaMinus /></button>
              </div>
            </div>
            <div>
              <p>Break Length: {breakLength} minutes</p>
              <div className="flex justify-center items-center">
                <button onClick={() => setBreakLength(breakLength + 1)} className="p-1 border rounded-full text-white"><FaPlus /></button>
                <button onClick={() => setBreakLength(Math.max(1, breakLength - 1))} className="p-1 border rounded-full text-white" disabled={breakLength === 1}><FaMinus /></button>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p>{isSession ? 'Work Session' : 'Break Session'}</p>
            <p className="text-4xl">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
            {isRunning ? (
              <button onClick={pauseTimer} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"><FaPause /></button>
            ) : (
              <button onClick={startTimer} className="mt-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"><FaPlay /></button>
            )}
            <button onClick={resetTimer} className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md ml-1"><FaSyncAlt /></button>
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-2 bg-transparent rounded-md shadow-md text-white font-bold text-sm mt-2">
          <p className="text-center">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
          {isRunning ? (
            <button onClick={pauseTimer} className="mt-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"><FaPause /></button>
          ) : (
            <button onClick={startTimer} className="mt-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md"><FaPlay /></button>
          )}
          <button onClick={resetTimer} className="mt-2 bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded-md ml-1"><FaSyncAlt /></button>
        </div>
      )}
      <button onClick={togglePomodoroSize} className="mt-2 bg-transparent hover:bg-gray-300 text-red-600 font-semibold py-2 px-4 border border-gray-400 rounded-full inline-flex items-center">
        {showSmallPomodoro ? <FaArrowUp className="mr-2" /> : <FaArrowDown className="mr-2" />}
      </button>
    </div>
  );
};

export default PomodoroApp;
