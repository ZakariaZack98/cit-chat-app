import React from 'react'
import Sidebar from '../../assets/Components/HomeComponents/Sidebar'
import GroupList from '../../assets/Components/HomeComponents/GroupList'
import Friends from '../../assets/Components/HomeComponents/Friends'

const Home = () => {
  return (
    <div className='flex h-full gap-5'>
      <div className='w-[30%] h-[50%]'>
        <GroupList/>
      </div>
      <div className='w-[30%] h-[50%]'>
        <Friends/>
      </div>
    </div>
  )
}

export default Home