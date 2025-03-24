import React from 'react'
import { blockListData } from '../../../lib/componentsData';
import GroupCard from '../CommonComponents/GroupCard';

const BlockList = () => {
  const listData = blockListData();
  return (
    <GroupCard cardTitle={'Blocked Users'} listData={listData} btnText={'Unblock'} withBtn={true}/>
  )
}

export default BlockList
