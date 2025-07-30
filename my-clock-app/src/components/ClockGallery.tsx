import { useEffect, useState } from 'react';
import '../style.css'; // make sure this file exists

const timeZones = [
  {
    city: 'New York',
    zone: 'America/New_York',
    theme: {
      clockBg: '#ffffff',
      clockBorder: '#2c3e50',
      hourHand: '#2c3e50',
      minuteHand: '#34495e',
      secondHand: '#e74c3c',
      accentColor: '#2c3e50',
    },
  },
  {
    city: 'Denmark',
    zone: 'Europe/Copenhagen',
    theme: {
      clockBg: '#ffffff',
      clockBorder: '#c31432',
      hourHand: '#c31432',
      minuteHand: '#8b0000',
      secondHand: '#c31432',
      accentColor: '#c31432',
    },
  },
  {
    city: 'Spain',
    zone: 'Europe/Madrid',
    theme: {
      clockBg: '#ffffff',
      clockBorder: '#aa076b',
      hourHand: '#aa076b',
      minuteHand: '#61045f',
      secondHand: '#ff4500',
      accentColor: '#aa076b',
    },
  },
  {
    city: 'Egypt',
    zone: 'Africa/Cairo',
    theme: {
      clockBg: '#ffffff',
      clockBorder: '#8b4513',
      hourHand: '#8b4513',
      minuteHand: '#cd853f',
      secondHand: '#ff6347',
      accentColor: '#8b4513',
    },
  },
  {
    city: 'Iceland',
    zone: 'Atlantic/Reykjavik',
    theme: {
      clockBg: '#ffffff',
      clockBorder: '#4682b4',
      hourHand: '#2f4f4f',
      minuteHand: '#4682b4',
      secondHand: '#00ced1',
      accentColor: '#4682b4',
    },
  },
];

interface AnalogClockProps {
  time: Date;
  theme: typeof timeZones[0]['theme'];
}

const AnalogClock: React.FC<AnalogClockProps> = ({ time, theme }) => {
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="clock-svg-wrapper">
      <svg viewBox="0 0 120 120" width="240" height="240" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}>
        <defs>
          <radialGradient id={`clockFace-${theme.accentColor}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor={theme.clockBg} />
            <stop offset="100%" stopColor={theme.clockBg} stopOpacity="0.95" />
          </radialGradient>
        </defs>
        <circle
          cx="60"
          cy="60"
          r="58"
          fill={`url(#clockFace-${theme.accentColor})`}
          stroke={theme.clockBorder}
          strokeWidth="2"
        />
        {[...Array(12)].map((_, i) => (
          <g key={i} transform={`translate(60,60) rotate(${i * 30})`}>
            <line
              x1="0"
              y1="-55"
              x2="0"
              y2={i % 3 === 0 ? "-48" : "-52"}
              stroke={theme.clockBorder}
              strokeWidth={i % 3 === 0 ? "2" : "1"}
            />
          </g>
        ))}
        <g transform="translate(60,60)">
          <line x1="0" y1="0" x2="0" y2="-35" stroke={theme.hourHand} strokeWidth="5" strokeLinecap="round" transform={`rotate(${hourDeg})`} />
          <line x1="0" y1="0" x2="0" y2="-48" stroke={theme.minuteHand} strokeWidth="3" strokeLinecap="round" transform={`rotate(${minuteDeg})`} />
          <line x1="0" y1="8" x2="0" y2="-52" stroke={theme.secondHand} strokeWidth="1" strokeLinecap="round" transform={`rotate(${secondDeg})`} />
          <circle r="3" fill={theme.clockBorder} />
          <circle r="1.5" fill={theme.secondHand} />
        </g>
      </svg>
    </div>
  );
};

const ClockGallery = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock-gallery-container">
      <h1 className="gallery-title">World Clock Gallery</h1>
      <div className="clock-grid">
        {timeZones.map((tz, index) => {
          const localTime = new Date(now.toLocaleString('en-US', { timeZone: tz.zone }));

          return (
            <div key={index} className="clock-card">
              <AnalogClock time={localTime} theme={tz.theme} />
              <h2 className="city-name" style={{ color: tz.theme.accentColor }}>{tz.city}</h2>
              <p className="digital-time">{localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
              <p className="date-text">{localTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
              <div className="accent-line" style={{ backgroundColor: tz.theme.accentColor }} />
            </div>
          );
        })}
      </div>
      <div className="footer">Tick Tock</div>
    </div>
  );
};

export default ClockGallery;
