import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
export default function SingleHomeShowCard({ homeItem, id }) {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to="">
        <img
          className="h-[170px] w-full object-cover hover:scale-105 transition-scale duration-200 ease-in"
          loading="lazy"
          src={homeItem.imgUrls[0]}
          alt="HomeImage"
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {homeItem.created_at?.toDate()}
        </Moment>

        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {homeItem.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{homeItem.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            $
            {homeItem.offer
              ? homeItem.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : homeItem.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {homeItem.type === "rent" && " / month"}
          </p>
          <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {homeItem.bedroom > 1 ? `${homeItem.bedroom} Beds` : "1 Bed"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {homeItem.bathroom > 1
                  ? `${homeItem.bathroom} Baths`
                  : "1 Bath"}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="font-bold text-xs">
                {homeItem.belcony > 1
                  ? `${homeItem.belcony} Belcony`
                  : "1 Belcony"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
