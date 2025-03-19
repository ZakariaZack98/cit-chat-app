import React from 'react'
import Sidebar from '../HomeComponents/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='h-svh p-10 flex gap-x-5'>
      <Sidebar/>
      <div className="mainBody w-full shadow-2xl">
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout