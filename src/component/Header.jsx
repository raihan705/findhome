import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const locationPath = useLocation();
  const navigateURL = useNavigate();

  function locationPathMatch(route) {
    if (locationPath.pathname === route) {
      return true;
    }
  }
  return (
    <div className="bg-slate-100 border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-4 max-w-6xl mx-auto">
        <div>
          <h3
            className=" cursor-pointer text-teal-900"
            onClick={() => navigateURL("/")}
          >
            findhome
          </h3>
        </div>
        <div>
          <ul className="flex space-x-10 ">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-green-400 border-b-[3px] border-b-transparent ${
                locationPathMatch("/") && " text-green-900 border-b-red-500"
              }`}
              onClick={() => navigateURL("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-green-400 border-b-[3px] border-b-transparent ${
                locationPathMatch("/offer") && "text-green-900 border-b-red-500"
              }`}
              onClick={() => navigateURL("/offer")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-green-400 border-b-[3px] border-b-transparent ${
                locationPathMatch("/sign-in") &&
                "text-green-900 border-b-red-500"
              }`}
              onClick={() => navigateURL("/sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
