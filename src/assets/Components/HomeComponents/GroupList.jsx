import React from "react";
import { groupListData } from "../../../lib/componentsData";
import GroupCard from "../CommonComponents/GroupCard";
import SearchBar from "../CommonComponents/SearchBar";

const GroupList = () => {
  const listData = groupListData();
  return (
    <div className="flex flex-col gap-y-2 h-full justify-between">
      <SearchBar/>
      <div className="groupCard h-[85%]">
        <GroupCard cardTitle={'Group List'} listData={listData} btnText={'Join'} withBtn={true}/>
      </div>
    </div>
  );
};

export default GroupList;
