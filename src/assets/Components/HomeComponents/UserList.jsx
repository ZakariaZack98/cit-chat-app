import React, { useContext, useEffect, useState } from "react";
import { userListMockData } from "../../../lib/componentsData";
import GroupCard from "../CommonComponents/GroupCard";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../../../../Database/firebase";
import { ChatContext } from "../../../contexts/ChatContext";

const UserList = () => {
  const { userListData, setUserListData, alreadyAddedIds, setAlreadyAddedIds } = useContext(ChatContext);


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
    const friendRequestRef = ref(db, `friendRequests/${auth.currentUser.uid}`);
    const unsubscribe = onValue(friendRequestRef, (snapshot) => {
      const updatedAlreadyAddedIds = []
      snapshot.forEach(request => {
        updatedAlreadyAddedIds.push(request.val().recieverId)
      })
      setAlreadyAddedIds(updatedAlreadyAddedIds);
    })

    return () => unsubscribe();
  }, [auth.currentUser.uid, db])



  return (
    <GroupCard
      cardTitle={'User List'}
      listData={userListData}
      withBtn={true}
    />
  );
};

export default UserList;
