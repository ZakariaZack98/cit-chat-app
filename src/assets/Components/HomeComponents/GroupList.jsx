import React, { useContext, useEffect } from "react";
import GroupCard from "../CommonComponents/GroupCard";
import SearchBar from "../CommonComponents/SearchBar";
import { get, onValue, ref } from "firebase/database";
import { auth, db } from "../../../../Database/firebase";
import { ChatContext } from "../../../contexts/ChatContext";

const GroupList = () => {
  const {groupListData, setGroupListData} = useContext(ChatContext);
  /**
     * TODO: FETCH ALL GROUPS DATA USER HAVE JOINED INSIDE AN ARRAY FROM DATABASE ============================
     * @param {userJoinedGroupChatsRef} object refernce to the group association of the user
     * @returns {array} containing group data user have joined
     * */
    useEffect(() => {
      const userJoinedGroupChatsRef = ref(db, `userAssociations/${auth.currentUser.uid}/groupChats`);
      
      const unsubscribe = onValue(userJoinedGroupChatsRef, async (snapshot) => {
        const promises = [];
        snapshot.forEach((group) => {
          const key = group.val().key;
          const groupsRef = ref(db, `groups/${key}`)
          promises.push(get(groupsRef).then(groupSnapshot => {
            if(groupSnapshot.exists()) {
              return groupSnapshot.val();
            }
          })); 
        });
        const updatedData = await Promise.all(promises);
        setGroupListData(updatedData)
        console.log(updatedData);
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
