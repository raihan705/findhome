import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../component/GoogleAuth";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const onchange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <section>
      <div>
        <h1 className="text-center text-4xl font-bold mt-8 ">
          {" "}
          Forget Password{" "}
        </h1>
      </div>
      <div className="flex justify-center flex-wrap items-center px-8 py-14 max-w-6xl mx-auto">
        <div className=" md:w-[70%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/photo-1590393654513-897773df2125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1060&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[70%] lg:w-[40%] lg:ml-20">
          <form action="">
            <input
              type="email"
              id="email"
              placeholder="Email Adress"
              value={email}
              onChange={onchange}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-800 bg-white border-grey-400 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p>
                Are you a new user?
                <Link
                  to="/sign-up"
                  className="ml-2 text-teal-700 hover:text-teal-900transition duration-300 ease-in-out"
                >
                  Register here{" "}
                </Link>
              </p>
            </div>
            <button className="w-full bg-teal-600 px-6 py-2 mt-6 font-medium text-sm uppercase rounded shadow-md hover:bg-teal-700 transition duration-200 ease-in-out">
              Send reset email
            </button>
            <div className="flex my-6 items-center before:border-t before:flex-1 before:border-teal-600 after:border-t after:flex-1 after:border-teal-600">
              <p className="font-semibold mx-5 text-center">OR</p>
            </div>
            <GoogleAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
