import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import React from "react";

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/test?format=json")
      .then((res) => res.json())
      .then((data) => setData(data));
 }, []);

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <>
              <h2 key={item.id}>{item.otazka} {item.orig_topic}</h2>
              <p key={item.id}>{item.odpoved_a}</p>
              <p key={item.id}>{item.odpoved_b}</p>
              <p key={item.id}>{item.odpoved_c}</p>
              <p>sranda</p>
            </>
          );
        })}
    </>
  );
};

export default Test;