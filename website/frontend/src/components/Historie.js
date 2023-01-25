import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import React from "react";

const Historie = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/historie?format=json")
      .then((res) => res.json())
      .then((data) => setData(data));
 }, []);

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <>
              <p key={item.id}>{item.FK_otazka} {item.odpoved} {item.timestamp}</p>
            </>
          );
        })}
    </>
  );
};

export default Historie;