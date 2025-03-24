import React from 'react'
import { groupData } from '../../../lib/componentsData';
import GroupCard from '../CommonComponents/GroupCard';

const Group = () => {
  const listData = groupData();
  return (
    <GroupCard cardTitle={'Group'} listData={listData} withBtn={false}/>
  )
}

export default Group
