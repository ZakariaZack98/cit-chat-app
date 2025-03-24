import React from 'react'
import { friendRequestsData } from '../../../lib/componentsData';
import GroupCard from '../CommonComponents/GroupCard';

const FriendRequests = () => {
  const listData = friendRequestsData();
  console.log(listData)
  return (
    <GroupCard cardTitle={'Friend Requests'} listData={listData} btnText={'Accept'} withBtn={true}/>
  )
}

export default FriendRequests
