import React, { useEffect, useState } from "react";
import { userListMockData } from "../../../lib/componentsData";
import GroupCard from "../CommonComponents/GroupCard";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../../../../Database/firebase";

const UserList = () => {
  const [userListData, setUserListData] = useState(userListMockData());
  /**
   * TODO: FETCH ALL USER DATA INSIDE AN ARRAY FROM DATABASE===============================
   * @param {auth, db} object 
   * @returns {array} containing all app user info
   * */ 
  useEffect(() => {
    const updatedUserData = [];
    const userListRef = ref(db, 'users');
    onValue(userListRef, (snapshot) => {
      snapshot.forEach(user => {
        if(auth.currentUser.uid !== user.val().userId) {
          updatedUserData.push({...user.val(), userkey: user.key});
        }
      })
    })
    setUserListData(updatedUserData);
    console.log(updatedUserData);
    return () => {
      const userListRef = ref(db, 'users');
    }
  }, [])


  return (
    <GroupCard cardTitle={'User List'} listData={userListData} btnText={'+'} withBtn={true}/>
  );
};

export default UserList;
