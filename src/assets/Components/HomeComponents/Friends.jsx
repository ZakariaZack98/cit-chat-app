import React from "react";
import { friendsData } from "../../../lib/componentsData";
import GroupCard from "../CommonComponents/GroupCard";

const Friends = () => {
  const listData = friendsData();
  return (
    <GroupCard cardTitle={'Friends'} listData={listData}/>
  );
};

export default Friends;
