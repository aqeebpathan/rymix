import { useState, useEffect } from "react";

const DynamicGreeting = () => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getTimeBasedGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 18) return "Good afternoon";
      return "Good evening";
    };

    setGreeting(`${getTimeBasedGreeting()} `);
  }, []);

  return (
    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-50">
      {greeting}
    </h1>
  );
};

export default DynamicGreeting;
