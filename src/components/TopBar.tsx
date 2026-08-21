import { useState, useEffect } from 'react';

const pad = (n: number) => n.toString().padStart(2, '0');

const TopBar = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  let hours = now.getHours();
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const date = `${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${pad(now.getFullYear() % 100)}`;
  const time = `${pad(hours)}:${pad(now.getMinutes())}`;

  return (
    <>
      <span className="sl-topbar-title">sudoloser</span>
      <span className="sl-topbar-time">
        {date} {time}
        <small> {meridiem}</small>
      </span>
    </>
  );
};

export default TopBar;
