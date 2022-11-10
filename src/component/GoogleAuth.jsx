import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuth() {
  return (
    <button className="flex items-center justify-center w-full bg-teal-600 px-6 py-2 mt-6 font-medium text-sm uppercase rounded shadow-md hover:bg-teal-700 transition duration-200 ease-in-out">
      <FcGoogle className="mr-4 text-2xl bg-slate-200 rounded-full" />
      Continue with Google
    </button>
  );
}
