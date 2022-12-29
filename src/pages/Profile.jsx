import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";

export default function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  //state change for edit
  const [editCahnge, setEditChange] = useState(false);

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
        </div>
      </div>
    </>
  );
}
