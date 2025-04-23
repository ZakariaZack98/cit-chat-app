import React, { useEffect, useState } from 'react'
import { friendRequestsData } from '../../../lib/componentsData';
import GroupCard from '../CommonComponents/GroupCard';
import { auth, db } from '../../../../Database/firebase';
import { onValue, ref } from 'firebase/database';

const FriendRequests = () => {
  const [friendRequestData, setFriendRequestData] = useState([]);

  useEffect(() => {
    const recievedFriendRequestRef = ref(db, `recievedFriendRequests/${auth.currentUser.uid}`);
    const unsubscribe = onValue(recievedFriendRequestRef, (snapshot) => {
      const updatedFrReqData = [];
      snapshot.forEach(record => {
        
      })
    })
  }, [auth.currentUser.uid, db])

  return (
    <GroupCard cardTitle={'Friend Requests'} listData={friendRequestData} btnText={'Accept'} withBtn={true}/>
  )
}

export default FriendRequests
