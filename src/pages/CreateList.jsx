import React from "react";
import { useState } from "react";
import { Spinner } from "../component/Spinner";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase.config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function CreateList() {
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState({
    type: "rent",
    name: "",
    bedroom: 1,
    bathroom: 1,
    kitchen: 1,
    belcony: 1,
    parking_slot: true,
    isFurnished: false,
    address: "",
    description: "",
    isOffer: true,
    regularPrice: 50000000,
    discountPrice: 300000,
    images: {},
  });

  const auth = getAuth();

  const onChange = (e) => {
    //for true or false data
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // for image or file type data
    if (e.target.files) {
      setListData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number store to the state
    if (!e.target.files) {
      setListData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }

    console.log(listData);
  };

  //for spinner running

  if (loading) {
    return <Spinner />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    //checking discount price is less than regular price
    if (+discountPrice >= +regularPrice) {
      console.log("Discount price must be less than regular price");
      return;
    }
    //Checking image upload is less than or not from 6

    if (images.length > 6) {
      console.log("Maxumum 6 images will be uploadable");
      return;
    }

    // store image functionality to firebase

    const storeImageToFirebase = async (image) => {
      return new Promise((resolve, reject) => {
        const getImageStorage = getStorage();
        const dynamicImageId = `${auth.currentUser.uid}-${
          image.name
        }-${uuidv4()}`;
        const storageRef = ref(getImageStorage, dynamicImageId);
        const uploadImage = uploadBytesResumable(storageRef, image);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`upload is ${progress}% done`);
            switch (snapshot.state) {
              case "paused":
                console.log("upload is paused ");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                console.log("default");
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadImage.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    // creating the image upload

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImageToFirebase(image))
    ).catch((error) => {
      setLoading(false);
      console.log("Images not uploaded");
      return;
    });

    // copy data to upload in the firebase

    const listDataCopy = {
      ...listData,
      imgUrls,
      created_at: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    //delete unneccesary data from the list before uploading in firebase
    delete listDataCopy.images;
    !listDataCopy.isOffer && delete listDataCopy.discountPrice;
    // upload data to firebase
    const docRef = await addDoc(collection(db, "listings"), listDataCopy);
    console.log("list is created successfully");
  };
  const {
    type,
    name,
    bedroom,
    bathroom,
    kitchen,
    belcony,
    parking_slot,
    isFurnished,
    address,
    description,
    isOffer,
    regularPrice,
    discountPrice,
    images,
  } = listData;
  return (
    <>
      <h1 className="text-center text-2xl text font-semibold mt-6">
        Create a list
      </h1>

      <form onSubmit={onSubmit}>
        {/* Sell or rent button design */}
        <p className="text-md font-medium mt-5 ml-6">Sell Or Rent</p>
        <div className="flex">
          <button
            type="button"
            id="type"
            value="sell"
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              type === "sell"
                ? "bg-green-800 text-white"
                : "bg-white text-black"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              type === "rent"
                ? "bg-green-800 text-white"
                : "bg-white text-black"
            }`}
          >
            Rent
          </button>
        </div>

        {/* Property name input filed design section */}
        <p className="text-md font-medium mt-5 ml-6">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Enter Property Name"
          required
          className="w-[47.5%] ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-6"
        />

        {/* Number of bed kitchen bathroom Belcony section desgin */}

        <div className=" flex space-x-6 mb-5 mr-10 ">
          <div className=" w-full">
            <p className="text-md font-medium mt-5 ml-6">Bedroom</p>
            <input
              type="number"
              id="bedroom"
              value={bedroom}
              onChange={onChange}
              min="1"
              max="10"
              required
              className=" w-full ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 text-center"
            />
          </div>

          <div className="w-full">
            <p className="text-md font-medium mt-5 ml-6">Bathroom</p>
            <input
              type="number"
              id="bathroom"
              value={bathroom}
              onChange={onChange}
              min="1"
              max="10"
              required
              className="w-full ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 text-center"
            />
          </div>

          <div className="w-full">
            <p className="text-md font-medium mt-5 ml-6">Kitchen</p>
            <input
              type="number"
              id="kitchen"
              value={kitchen}
              onChange={onChange}
              min="1"
              max="5"
              required
              className="w-full ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 text-center"
            />
          </div>

          <div className="w-full">
            <p className="text-md font-medium mt-5 ml-6">Belcony</p>
            <input
              type="number"
              id="belcony"
              value={belcony}
              onChange={onChange}
              min="1"
              max="10"
              required
              className="w-full ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 text-center"
            />
          </div>
        </div>

        {/* Parking spot availability or not button design section */}

        <p className="text-md font-medium mt-5 ml-6">Parking Slot</p>
        <div className="flex">
          <button
            type="button"
            id="parking_slot"
            value={true}
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              !parking_slot ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking_slot"
            value={false}
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              parking_slot ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            No
          </button>
        </div>

        {/* Home furnished or not button design section */}

        <p className="text-md font-medium mt-5 ml-6">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="isFurnished"
            value={true}
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              !isFurnished ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="isFurnished"
            value={false}
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              isFurnished ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            No
          </button>
        </div>

        {/* Property Address input filed design section */}
        <p className="text-md font-medium mt-5 ml-6">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Enter Property Address"
          required
          className="w-[47.5%] ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-6"
        />

        {/* Property description input filed design section */}
        <p className="text-md font-medium mt-5 ml-6">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Enter Property Details in brief"
          required
          className="w-[47.5%] ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-6"
        />

        {/* Regular price button design section */}
        <p className="text-md font-medium mt-5 ml-6">Regular Price</p>
        <div className="flex">
          <input
            type="number"
            id="regularPrice"
            value={regularPrice}
            onChange={onChange}
            required
            className="w-[48%] ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 text-center"
          />
          {type === "rent" && <p className="text-lg mt-3 ml-3">$ / Month</p>}
        </div>

        {/* Home offer or not button design section */}

        <p className="text-md font-medium mt-5 ml-6">Offer</p>
        <div className="flex">
          <button
            type="button"
            id="isOffer"
            value={true}
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              !isOffer ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="isOffer"
            value={false}
            onClick={onChange}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              isOffer ? "bg-white text-black" : "bg-green-800 text-white"
            }`}
          >
            No
          </button>
        </div>

        {/* Discounted price button design section */}
        {isOffer && (
          <div>
            <p className="text-md font-medium mt-5 ml-6">Discount Price</p>
            <div className="flex">
              <input
                type="number"
                id="discountPrice"
                value={discountPrice}
                onChange={onChange}
                required
                className="w-[48%] ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 text-center"
              />
              {type === "rent" && (
                <p className="text-lg mt-3 ml-3">$ / Month</p>
              )}
            </div>
          </div>
        )}

        {/* Property image upload input filed design section */}
        <p className="text-md font-medium mt-5 ml-6">
          Image upload(Max 6 images)
        </p>
        <input
          type="file"
          id="image"
          //value={} active when implement react functionality
          onChange={onChange}
          accept=".jpg, .png, .jpeg"
          multiple
          required
          className="w-[47.5%] ml-5 px-5 py-3 font-medium text-medium text-grey-600 bg-white border border-gray-500 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-6"
        />

        {/* submit button desgin for the whole form */}
        <div className="flex justify-center ">
          <button
            type="submit"
            className=" w-[50%] px-5 py-3 font-medium text-medium text-grey-600 bg-green-800 border border-gray-500 rounded-3xl transition duration-250 ease-in-out  focus:text-gray-700 focus:bg-white focus:border-slate-800 mb-6"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
