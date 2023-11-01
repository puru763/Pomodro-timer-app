import React, { useState, useEffect } from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/progress";
import { Box, Button } from "@chakra-ui/react";

function Timer() {
  const red = "#f54e4e";
  const green = "#4aec8c";

  const workTimeInSeconds = 1500;
  const breakTimeInSeconds = 300;

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(workTimeInSeconds);
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    let interval;

    if (!isPaused && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPaused, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      if (!isBreakTime) {
        setIsBreakTime(true);
        setSecondsLeft(breakTimeInSeconds);
      } else {
        setIsBreakTime(false);
        setSecondsLeft(workTimeInSeconds);
      }
    }
  }, [secondsLeft, isBreakTime]);

  const totalSeconds = isBreakTime ? breakTimeInSeconds : workTimeInSeconds;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const initialProgressValue =
    ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  const handleRestart = () => {
    setIsPaused(true);
    setIsBreakTime(false);
    setSecondsLeft(workTimeInSeconds);
  };

  return (
    <Box textAlign="center">
      <CircularProgress
        value={
          isPaused
            ? initialProgressValue
            : ((totalSeconds - secondsLeft) / totalSeconds) * 100
        }
        color={isBreakTime ? green : isPaused ? red : green}
        thickness="12px"
        size="200px"
      >
        <CircularProgressLabel fontSize="24px">
          {isBreakTime
            ? `Break - ${minutes}:${seconds}`
            : `${minutes}:${seconds}`}
        </CircularProgressLabel>
      </CircularProgress>
      <Box mt={4}>
        {isPaused ? (
          <Button colorScheme="blue" onClick={() => setIsPaused(false)}>
            Play
          </Button>
        ) : (
          <div className="button-container">
            {" "}
            <div className="pause">
              <Button colorScheme="red" onClick={() => setIsPaused(true)}>
                Pause
              </Button>
            </div>
            <div className="restart">
              <Button colorScheme="green" onClick={handleRestart}>
                Restart
              </Button>
            </div>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default Timer;
