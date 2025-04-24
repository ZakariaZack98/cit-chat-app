import React, { useContext, useEffect } from "react";
import GroupCard from "../CommonComponents/GroupCard";
import { ChatContext } from "../../../contexts/ChatContext";
import { auth, db } from "../../../../Database/firebase";
import { get, onValue, ref } from "firebase/database";

const Friends = () => {
  const {friendlistData, setFriendlistData} = useContext(ChatContext);

  useEffect(() => {
    const friendlistRef = ref(db, `friendList/${auth.currentUser.uid}`)
    const unsubscribe = onValue(friendlistRef, async (snapshot) => {
      const promises = [];
      const friendSince = []
      snapshot.forEach(friend => {
        const id = friend.val().userId;
        if(friend.val().createdAt !== null) {
          friendSince.push(friend.val().createdAt);
        }
        const userPromise = get(ref(db, `users/${id}`)).then(userSnapshot => {
          return userSnapshot.exists() ? userSnapshot.val() : null;
        })
        promises.push(userPromise);
      })
      const updatedFriendlist = (await Promise.all(promises)).filter(user => user !== null);
      setFriendlistData(updatedFriendlist.map((item, idx) => ({...item, createdAt: friendSince[idx]})));
    })
    return () => unsubscribe();
  }, [auth.currentUser.uid, db])

  return (
    <GroupCard cardTitle={'Friends'} listData={friendlistData} withBtn={true}/>
  );
};

export default Friends;
