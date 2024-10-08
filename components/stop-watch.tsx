"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; 
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; 

// Define the LapTime type
type LapTime = number;

export default function StopWatch() {
  // State to manage whether the stopwatch is running
  const [isRunning, setIsRunning] = useState<boolean>(false);
  // State to manage the elapsed time in milliseconds
  const [time, setTime] = useState<number>(0);
  // State to manage the list of lap times
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);

  // useEffect to handle the stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Function to handle starting the stopwatch
  const handleStart = () => {
    setIsRunning(true);
  };

  // Function to handle stopping the stopwatch
  const handleStop = () => {
    setIsRunning(false);
  };

  // Function to handle resetting the stopwatch
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLapTimes([]);
  };

  // Function to handle recording a lap time
  const handleLap = () => {
    setLapTimes((prevLapTimes) => [...prevLapTimes, time]);
  };

  // Calculate minutes, seconds, and milliseconds from the elapsed time
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  // JSX return statement rendering the Stopwatch UI
 // JSX return statement rendering the Stopwatch UI
return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-400 p-4">
    <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader className="flex flex-col items-center justify-center p-6 bg-blue-600 text-white">
        <CardTitle className="text-5xl font-bold text-center">
          <span className="text-green-400">Stop</span>
          <span className="text-yellow-500">watch</span>
        </CardTitle>
        <CardDescription className="text-lg text-gray-200">
          Track your time with this stopwatch.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-8 p-4">
        {/* Display the elapsed time */}
        <div className="text-blue-600 font-bold">
          <span
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </span>
        </div>
        {/* Buttons to control the stopwatch */}
        <div className="flex gap-4">
          <Button
            onClick={isRunning ? handleStop : handleStart}
            className={`px-6 py-2 text-lg font-medium rounded-lg ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white transition duration-300`}
          >
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button
            onClick={handleReset}
            className="px-6 py-2 text-lg font-medium rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition duration-300"
          >
            Reset
          </Button>
          <Button
            onClick={handleLap}
            className="px-6 py-2 text-lg font-medium rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white transition duration-300"
          >
            Lap
          </Button>
        </div>
        {/* Display the list of lap times */}
        <div className="w-full max-w-md mt-6">
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-200">
              <CardTitle className="text-xl font-semibold">Lap Times</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[300px] overflow-auto p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left">Lap</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lapTimes.map((lapTime, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="text-right">
                        {Math.floor(lapTime / 60000).toString().padStart(2, "0")}:
                        {Math.floor((lapTime % 60000) / 1000).toString().padStart(2, "0")}:
                        {Math.floor((lapTime % 1000) / 10).toString().padStart(2, "0")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
    {/* Footer section */}
    <footer className="mt-6 text-sm text-gray-300">Created By Ismail Ahmed Shah</footer>
  </div>
);
}