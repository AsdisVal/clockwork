import { useEffect, useState } from 'react';
import AnalogClock from './AnalogClock';

const timeZones = [
  { city: 'New York', zone: 'America/New_York' },
  { city: 'Denmark', zone: 'Europe/Copenhagen' },
  { city: 'Spain', zone: 'Europe/Madrid' },
  { city: 'Egypt', zone: 'Africa/Cairo' },
  { city: 'Iceland', zone: 'Atlantic/Reykjavik' }, // Added Iceland
];

const Clock: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-10 p-8 bg-gray-900 text-white min-h-screen">
      {timeZones.map(({ city, zone }) => {
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: zone }));

        return (
          <div key={city} className="flex flex-col items-center">
            <AnalogClock />
            <h2 className="text-2xl font-bold mt-4">{city}</h2>
            <p className="text-xl mt-1">{localTime.toLocaleTimeString()}</p>
            <p className="text-sm opacity-70">
              {localTime.toLocaleDateString(undefined, {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Clock;
