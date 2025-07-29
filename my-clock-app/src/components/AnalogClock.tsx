import React, { useEffect, useState } from 'react';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6; // 360/60
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <svg
  viewBox="0 0 120 120"
  width="200"
  height="200"
  className="analog-clock drop-shadow-lg"
>
      <circle cx="60" cy="60" r="58" fill="#f1f1f1" stroke="#333" strokeWidth="2" />
      <g transform="translate(60,60)">
        <line x1="0" y1="0" x2="0" y2="-40" stroke="#333" strokeWidth="4"
          transform={`rotate(${hourDeg})`} />
        <line x1="0" y1="0" x2="0" y2="-50" stroke="#666" strokeWidth="2"
          transform={`rotate(${minuteDeg})`} />
        <line x1="0" y1="0" x2="0" y2="-55" stroke="red" strokeWidth="1"
          transform={`rotate(${secondDeg})`} />
        <circle r="3" fill="#000" />
      </g>
    </svg>
  );
};

export default AnalogClock;
