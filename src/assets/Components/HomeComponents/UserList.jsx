import React from "react";
import { userListData } from "../../../lib/componentsData";
import GroupCard from "../CommonComponents/GroupCard";

const UserList = () => {
  const listData = userListData();
  return (
    <GroupCard cardTitle={'User List'} listData={listData} btnText={'+'} withBtn={true}/>
  );
};

export default UserList;
