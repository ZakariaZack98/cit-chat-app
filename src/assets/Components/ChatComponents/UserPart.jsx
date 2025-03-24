import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserPart = ({ avatar, name, isActive, lastSeen }) => {
  return (
    <div className="flex justify-between items-center border-b-gray-300 border-b-[1px] pb-3">
      <div className="left flex gap-x-3 items-center">
        <div className="avatar relative">
          <picture>
            <img src={avatar} className="h-15 w-15 object-cover object-center rounded-full" />
          </picture>
          {isActive && (
            <div className="absolute w-4 h-4 bg-green-600 rounded-full right-0 bottom-0 border-white border-solid border-2"></div>
          )}
        </div>
        <div className="name flex flex-col gap-y-1">
          <p className="text-xl font-semibold">{name}</p>
          <p className="text-sm opacity-65">{isActive ? "online" : lastSeen}</p>
        </div>
      </div>
      <span className="text-xl">
        <BsThreeDotsVertical />
      </span>
    </div>
  );
};

export default UserPart;
