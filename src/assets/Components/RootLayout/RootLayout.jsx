import React from 'react'
import Sidebar from '../HomeComponents/Sidebar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='rootlayout bg-cover bg-center bg-no-repeat h-svh px-20 py-5 flex gap-x-5'>
      <Sidebar/>
      <div className="mainBody w-full ">
        <Outlet/>
      </div>
    </div>
  )
}

export default RootLayout