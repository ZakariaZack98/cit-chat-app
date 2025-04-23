import React from "react";
import SearchBar from "../../assets/Components/CommonComponents/SearchBar";
import { getAccountSettingsData, getProfileSettingsData } from "../../lib/componentsData";
import { auth } from "../../../Database/firebase";

const Settings = () => {
  const profileSettingsData = getProfileSettingsData();
  const accountSettingsData = getAccountSettingsData();
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <SearchBar />
      <div className="w-full h-[92%] flex gap-x-3">
        <div className="w-1/2 h-full bg-white rounded-2xl shadow-xl py-5 px-7">
          <p className="font-semibold">Profile Settings</p>
          <div className="userPart flex items-center gap-x-3 py-5 border-b-gray-300 border-b-[1px]">
            <picture>
              <img
                src={auth.currentUser.photoURL || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"}
                className="w-14 h-14 object-cover object-center rounded-full"
              />
            </picture>
            <div className="namePart">
              <p className="font-semibold text-xl">{auth.currentUser.displayName}</p>
              <p className="text-sm ">Be the best version of yourself.</p>
            </div>
          </div>
          <div className="options ms-5">
            {profileSettingsData?.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-x-4 py-1 mt-3">
                  <item.icon className="text-2xl"></item.icon>
                  <p className="text-sm cursor-pointer">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-1/2 h-full bg-white rounded-2xl shadow-xl py-5 px-7">
          <p className="font-semibold">Account Settings</p>
          <div className="options mt-10 ms-5">
            {accountSettingsData?.map((item) => {
              return (
                <div key={item.id} className="flex items-center gap-x-4 py-1 mt-3">
                  <item.icon className="text-2xl"></item.icon>
                  <p className="text-sm cursor-pointer">{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
