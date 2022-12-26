import React from "react";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import GoogleAuth from "../component/GoogleAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config.js";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // navigate the site url use this method
  const navigate = useNavigate();
  // For state management
  const [showPassword, setShowPassword] = useState(false);
  const [formdata, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  // for geeting the value from each text input
  const onchange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };
  // dealing with form for inserting data to database for signup data using email and password method for firebase
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userAuthenticationData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userAuthenticationData.user;
      // Add fullname field to the method
      updateProfile(auth.currentUser, {
        displayName: fullname,
      });

      // Delete password and save data to users collection on firebase
      const cloneFormDataForStorage = { ...formdata };
      delete cloneFormDataForStorage.password;
      cloneFormDataForStorage.timestamp = serverTimestamp();
      // Save data to users collection on firebase
      await setDoc(doc(db, "users", user.uid), cloneFormDataForStorage);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  const { fullname, email, password } = formdata;

  return (
    <section>
      <div>
        <h1 className="text-center text-4xl font-bold mt-8 "> Sign Up </h1>
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
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="fullname"
              placeholder="Enter Your Fullname"
              value={fullname}
              onChange={onchange}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-800 bg-white border-grey-400 rounded transition ease-in-out"
            />
            <input
              type="email"
              id="email"
              placeholder="Email Adress"
              value={email}
              onChange={onchange}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-800 bg-white border-grey-400 rounded transition ease-in-out"
            />
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={onchange}
                className="w-full px-4 py-2 text-xl text-gray-800 bg-white border-grey-400 rounded transition ease-in-out"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className=" absolute right-3 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                ></AiFillEyeInvisible>
              ) : (
                <AiFillEye
                  className=" absolute right-3 top-4 text-xl cursor-pointer "
                  onClick={() => setShowPassword((prevState) => !prevState)}
                ></AiFillEye>
              )}
            </div>
            <div className="text-sm sm:text-lg">
              <p>
                Have an account?
                <Link
                  to="/sign-in"
                  className="ml-2 text-teal-700 hover:text-teal-900 transition duration-300 ease-in-out"
                >
                  Sign in here{" "}
                </Link>
              </p>
            </div>
            <button className="w-full bg-teal-600 px-6 py-2 mt-6 font-medium text-sm uppercase rounded shadow-md hover:bg-teal-700 transition duration-200 ease-in-out">
              Sign Up
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
