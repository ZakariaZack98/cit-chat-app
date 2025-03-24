import React from 'react'
import Sidebar from '../../assets/Components/HomeComponents/Sidebar'
import GroupList from '../../assets/Components/HomeComponents/GroupList'
import Friends from '../../assets/Components/HomeComponents/Friends'
import UserList from '../../assets/Components/HomeComponents/UserList'
import FriendRequests from '../../assets/Components/HomeComponents/FriendRequests'
import Group from '../../assets/Components/HomeComponents/Group'
import BlockList from '../../assets/Components/HomeComponents/BlockList'

const Home = () => {
  return (
    <div className='flex h-full justify-around flex-wrap'>
      <div className='w-[32%] h-[49%]'>
        <GroupList/>
      </div>
      <div className='w-[32%] h-[49%]'>
        <Friends/>
      </div>
      <div className='w-[32%] h-[49%]'>
        <UserList/>
      </div>
      <div className='w-[32%] h-[49%]'>
        <FriendRequests/>
      </div>
      <div className='w-[32%] h-[49%]'>
        <Group/>
      </div>
      <div className='w-[32%] h-[49%]'>
        <BlockList/>
      </div>
    </div>
  )
}

export default Home