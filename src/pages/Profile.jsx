import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../firebase.config";
import { AiFillHome } from "react-icons/ai";
import { useEffect } from "react";
import SingleHomeShowCard from "../component/SingleHomeShowCard";

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  //state getting data from getAuth() from firebase
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  //state change for profile edit
  const [editCahnge, setEditChange] = useState(false);

  //sate change data for show home list view that collect from database
  const [homeData, setHomeData] = useState(null);

  //data loading true false

  const [loading, setLoading] = useState(true);

  // Change input field functionality

  const onChange = (e) => {
    setFormData((prevstate) => ({
      ...prevstate,
      [e.target.id]: e.target.value,
    }));
  };

  // Change input data save in firebase database

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //Save update data in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
      }
    } catch (error) {
      console.log("Name text field is not updated");
    }
  };

  // signout function

  const signOut = () => {
    auth.signOut();
    navigate("/");
  };

  //Functionality for getting data from firebase to create a list to show here

  useEffect(() => {
    const fetchHomeListData = async () => {
      const collectLoginUserHomeListData = collection(db, "listings");
      const queryData = query(
        collectLoginUserHomeListData,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("created_at", "desc")
      );

      const querySnap = await getDocs(queryData);
      // store collecting data to an array
      let homeData = [];
      querySnap.forEach((doc) => {
        return homeData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setHomeData(homeData);
      setLoading(false);
    };

    //call the async function after collecting data
    fetchHomeListData();
  }, [auth.currentUser.uid]);

  const { name, email } = formData;
  return (
    <>
      <div className="max-w-8xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-center text-4xl mt-8">My Profile</h1>
        <div className="w-full md:w-[50%] mt-8 px-10">
          <form>
            <input
              type="text"
              id="name"
              value={name}
              disabled={!editCahnge}
              onChange={onChange}
              className={`w-full px-5 py-3 text-lg text-gray-500 bg-white border border-gray-500 rounded transition ease-in-out mb-3 ${
                editCahnge && "bg-amber-700 focus:bg-red-200 text-white"
              }`}
            />

            <input
              type="email"
              id="email"
              value={email}
              disabled
              className="w-full px-5 py-3 text-lg text-gray-500 bg-white border border-gray-500 rounded transition ease-in-out"
            />
            <div className="flex justify-between whitespace-nowrap text-lg">
              <p>
                Do you want to change your name?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    editCahnge && onSubmit();
                    setEditChange((prevstate) => !prevstate);
                  }}
                >
                  {editCahnge ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p onClick={signOut} className="cursor-pointer">
                Signout
              </p>
            </div>
          </form>

          <button
            type="button"
            className=" w-full bg-teal-600 px-6 py-2 mt-6 font-medium text-sm uppercase rounded shadow-md hover:bg-teal-700 transition duration-200 ease-in-out"
          >
            <Link
              to="/create-list"
              className="flex items-center justify-center"
            >
              <AiFillHome className="mr-4 text-2xl rounded-full" />
              Rent or Sell Home
            </Link>
          </button>
        </div>
        {/* Show data that collect from firebase */}
        <div className="max-w-6xl px-3 mt-6 mx-auto">
          {!loading && homeData.length > 0 && (
            <>
              <h2 className="text-2xl text-center font-semibold mb-6">
                My Listings
              </h2>
              <div>
                {homeData.map((listing) => (
                  <SingleHomeShowCard
                    key={listing.id}
                    id={listing.id}
                    homeItem={listing.data}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
