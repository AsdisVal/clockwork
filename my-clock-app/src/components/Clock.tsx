import React, { useState, useEffect } from 'react';
import AnalogClock from './AnalogClock'; // Make sure it's in the same folder or adjust path

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <AnalogClock />
      <div className="text-center mt-6">
        <h1 className="text-6xl font-mono tracking-wide">
          {time.toLocaleTimeString()}
        </h1>
        <p className="text-lg mt-2 opacity-70">
          {time.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default Clock;
