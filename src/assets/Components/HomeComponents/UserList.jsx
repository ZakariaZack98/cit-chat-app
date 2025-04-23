import React, { useEffect, useState } from "react";
import { userListMockData } from "../../../lib/componentsData";
import GroupCard from "../CommonComponents/GroupCard";
import { off, onValue, ref } from "firebase/database";
import { auth, db } from "../../../../Database/firebase";

const UserList = () => {
  const [userListData, setUserListData] = useState([]);
  const [alreadyAddedIds, setAlreadyAddedIds] = useState([]);


  /**
   * TODO: FETCH ALL USER DATA INSIDE AN ARRAY FROM DATABASE=======================================
   * @param {userListRef} object 
   * @returns {array} containing all app user info
   * */ 
  useEffect(() => {
    const userListRef = ref(db, 'users');
    const unsubscribe = onValue(userListRef, (snapshot) => {
      const updatedUserData = [];
      snapshot.forEach((user) => {
        if (auth.currentUser.uid !== user.val().userId) {
          updatedUserData.push({ ...user.val(), userkey: user.key });
        }
      });
      setUserListData(updatedUserData);
    });

    return () => unsubscribe();
  }, [auth.currentUser.uid, db]);


  /**
   * TODO: FETCH ALL USER IDS THAT CURRENT USER SEND FRIEND REQUESTS INSIDE AN ARRAY FROM DATABASE===
   * @param {friendRequestRef} object 
   * @returns {array} containing id's that been sent friend request to
   * */
  useEffect(() => {
    const updatedAlreadyAddedIds = []
    const friendRequestRef = ref(db, `friendRequests/${auth.currentUser.uid}`);
    const unsubscribe = onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach(request => {
        updatedAlreadyAddedIds.push(request.val().recieverId)
      })
      setAlreadyAddedIds(updatedAlreadyAddedIds);
    })

    return () => unsubscribe();
  }, [auth.currentUser.uid, db])



  return (
    <GroupCard cardTitle={'User List'} listData={userListData} alreadyAddedIds={alreadyAddedIds}  withBtn={true}/>
  );
};

export default UserList;
