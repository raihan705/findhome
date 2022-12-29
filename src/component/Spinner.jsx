import React from "react";
import spinner from "../assets/image/spinner.svg";

export function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <div>
        <img src={spinner} alt="Loading......" />
      </div>
    </div>
  );
}
