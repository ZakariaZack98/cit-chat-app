import React, { useContext, useEffect } from "react";
import GroupCard from "../CommonComponents/GroupCard";
import SearchBar from "../CommonComponents/SearchBar";
import { onValue, ref } from "firebase/database";
import { auth, db } from "../../../../Database/firebase";
import { ChatContext } from "../../../contexts/ChatContext";

const GroupList = () => {
  const {groupListData, setGroupListData} = useContext(ChatContext);
  /**
     * TODO: FETCH ALL USER IDS THAT CURRENT USER SEND FRIEND REQUESTS INSIDE AN ARRAY FROM DATABASE===
     * @param {friendRequestRef} object 
     * @returns {array} containing id's that been sent friend request to
     * */
    useEffect(() => {
      const groupChatsRef = ref(db, `userAssociations/${auth.currentUser.uid}/groupChats`);
      const unsubscribe = onValue(groupChatsRef, (snapshot) => {
        const updatedGroupChatData = [];
        snapshot.forEach((group) => {
            updatedGroupChatData.push(group.val());
        });
        setGroupListData(updatedGroupChatData);
      });
  
      return () => unsubscribe();
    }, [auth?.currentUser.uid, db])

  return (
    <div className="flex flex-col gap-y-2 h-full justify-between">
      <SearchBar/>
      <div className="groupCard h-[85%]">
        <GroupCard cardTitle={'Group List'} listData={groupListData} btnText={'Join'} withBtn={true}/>
      </div>
    </div>
  );
};

export default GroupList;
