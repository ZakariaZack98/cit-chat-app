import React from "react";
import { FaSearch } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { groupListData } from "../../../lib/componentsData";
import PersonCardWBtn from "../CommonComponents/PersonCardWBtn";
import GroupCard from "../CommonComponents/GroupCard";

const GroupList = () => {
  const listData = groupListData();
  return (
    <div className="flex flex-col gap-y-2 h-full justify-between">
      <div className="searchBar flex items-center bg-white rounded-xl px-4 py-2 shadow-md">
        <FaSearch className="text-gray-500 mr-2" />
        <input type="text" placeholder="Search..." className="flex-grow outline-none text-sm text-gray-700" />
        <BsThreeDotsVertical className="text-gray-500 ml-2" />
      </div>
      <div className="groupCard h-[85%]">
        <GroupCard cardTitle={'Group List'} listData={listData} btnText={'Join'} withBtn={true}/>
      </div>
    </div>
  );
};

export default GroupList;
