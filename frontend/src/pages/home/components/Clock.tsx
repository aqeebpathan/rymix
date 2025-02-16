import { useState, useEffect } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format the time in 24-hour format
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <h1 className="text-neutral-400 text-xl sm:text-4xl tracking-tight font-mono">{`${hours}:${minutes}`}</h1>
  );
};

export default Clock;
