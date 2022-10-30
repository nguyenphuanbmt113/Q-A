import moment from "moment";
import React, { useEffect, useState } from "react";

export const CountDowm = () => {
  const [count, setCount] = useState(10000);
  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count - 1);
      if (count === 0) {
        setCount(0);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [count]);
  const formatTimer = (count) => {
    return moment.utc(count * 1000).format("HH:mm:ss");
  };
  return <div>{formatTimer(count)}</div>;
};
