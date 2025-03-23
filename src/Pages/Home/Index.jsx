import React from 'react'
import Sidebar from '../../assets/Components/HomeComponents/Sidebar'
import GroupList from '../../assets/Components/HomeComponents/GroupList'

const Home = () => {
  return (
    <div className='flex h-full'>
      <div className='w-[30%] h-[50%]'>
        <GroupList/>
      </div>
    </div>
  )
}

export default Home