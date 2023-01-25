import React from "react";

export default function Nav(){
    return (
      <div>
        <a href="/">Domu </a>
        <a href="/test">Test </a>
        <a href="/api/test?format=json">TestAPI </a>
        <a href="/api/historie?format=json">HistorieAPI </a>
      </div>
    );
}