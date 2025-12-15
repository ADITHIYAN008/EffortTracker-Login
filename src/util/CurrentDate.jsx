import { useEffect, useState } from "react";

function CurrentDate() {
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();

      const formattedDate = today.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      setDate(formattedDate);
    };

    updateDate();

    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  return <h1>{date}</h1>;
}

export default CurrentDate;
