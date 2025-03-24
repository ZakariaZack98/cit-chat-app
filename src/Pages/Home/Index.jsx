import React from 'react'
import Sidebar from '../../assets/Components/HomeComponents/Sidebar'
import GroupList from '../../assets/Components/HomeComponents/GroupList'
import Friends from '../../assets/Components/HomeComponents/Friends'
import UserList from '../../assets/Components/HomeComponents/UserList'

const Home = () => {
  return (
    <div className='flex h-full justify-around flex-wrap'>
      <div className='w-[30%] h-[50%]'>
        <GroupList/>
      </div>
      <div className='w-[30%] h-[50%]'>
        <Friends/>
      </div>
      <div className='w-[30%] h-[50%]'>
        <UserList/>
      </div>
    </div>
  )
}

export default Home