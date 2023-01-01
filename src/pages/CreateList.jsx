import React from "react";
import { useState } from "react";

export default function CreateList() {
  // for sell or rent button dynamic state
  const [formData, setFormData] = useState({
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
  });

  const onClick = () => {};
  const onChange = () => {};
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
  } = formData;
  return (
    <>
      <h1 className="text-center text-2xl text font-semibold mt-6">
        Create a list
      </h1>

      <form action="">
        {/* Sell or rent button design */}
        <p className="text-md font-medium mt-5 ml-6">Sell Or Rent</p>
        <div className="flex">
          <button
            type="button"
            value={type}
            onClick={onClick}
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
            value={type}
            onClick={onClick}
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
          //value={} active when implement react functionality
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
            value={parking_slot}
            onClick={onClick}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              parking_slot ? "bg-green-800 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking_slot"
            value={parking_slot}
            onClick={onClick}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              !parking_slot ? "bg-green-800 text-white" : "bg-white text-black"
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
            value={isFurnished}
            onClick={onClick}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              isFurnished ? "bg-green-800 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="isFurnished"
            value={isFurnished}
            onClick={onClick}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              !isFurnished ? "bg-green-800 text-white" : "bg-white text-black"
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
          //value={} active when implement react functionality
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
          //value={} active when implement react functionality
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
            value={isOffer}
            onClick={onClick}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              isOffer ? "bg-green-800 text-white" : "bg-white text-black"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="isOffer"
            value={isOffer}
            onClick={onClick}
            className={` w-full mx-5 px-5 py-3 font-medium text-medium uppercase shadow-md rounded hover:shadow-xl focus:shadow-xl active:shadow-lg transition duration-200 ease-in-out ${
              !isOffer ? "bg-green-800 text-white" : "bg-white text-black"
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
