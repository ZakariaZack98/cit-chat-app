import React, { useContext, useEffect } from 'react'
import GroupCard from '../CommonComponents/GroupCard';
import { auth, db } from '../../../../Database/firebase';
import { get, onValue, ref } from 'firebase/database';
import { ChatContext } from '../../../contexts/ChatContext';

const FriendRequests = () => {
  const { friendRequestData, setFriendRequestData } = useContext(ChatContext);

  useEffect(() => {
    const recievedFriendRequestRef = ref(db, `recievedFriendRequests/${auth.currentUser.uid}`);
    const unsubscribe = onValue(recievedFriendRequestRef, async (snapshot) => {
      const promises = [];
      snapshot.forEach((record) => {
        const id = record.val().senderId;
        const userPromise = get(ref(db, `users/${id}`)).then((userSnapshot) => {
          return userSnapshot.exists() ? userSnapshot.val() : null;
        });
        promises.push(userPromise);
      });
      const updatedFrReqData = (await Promise.all(promises)).filter(user => user !== null);
      setFriendRequestData(updatedFrReqData);
    });
  
    return () => unsubscribe();
  }, [auth.currentUser.uid, db]);

  return (
    <GroupCard cardTitle={'Friend Requests'} listData={friendRequestData} withBtn={true}/>
  )
}

export default FriendRequests
