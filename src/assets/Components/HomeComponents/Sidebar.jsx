import React, { useState } from 'react'
import { IoChatbubbleEllipsesSharp, IoExit, IoHomeOutline, IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuCloudUpload } from 'react-icons/lu'

const Sidebar = () => {
  const [mouseOnDP, setMouseOnDP] = useState(false);

  const navIcons = [
    {
      id: 1,
      icon: <IoHomeOutline/>
    },
    {
      id: 2,
      icon: <IoChatbubbleEllipsesSharp />
    },
    {
      id: 3,
      icon: <IoNotificationsOutline />
    },
    {
      id: 4,
      icon: <IoSettingsOutline />
    },
  
  ]

  

  return (
    <div className='w-[10%] h-full flex flex-col justify-between items-center bg-mainColor rounded-4xl px-2 py-10'>
      <div className="avatar relative">
        {mouseOnDP && (<span className='absolute top-[40%] left-[40%] text-white text-3xl shadow-2xl pointer-events-none'><LuCloudUpload/></span>)}
        <picture className='w-full h-25 flex justify-center items-center'>
          <img src="https://thumbs.dreamstime.com/b/portrait-young-handsome-happy-man-wearing-glasses-casual-smart-blue-clothing-yellow-color-background-square-composition-200740125.jpg" alt="" className='object-center object-cover rounded-full overflow-hidden w-25 h-25 cursor-pointer' onMouseOver={() => setMouseOnDP(prev => !prev)} onMouseLeave={() => setMouseOnDP(prev => !prev)}/>
        </picture>
      </div>
      <div className="nav w-full flex flex-col justify-center items-center">
        {
          navIcons?.map(item => (
          <span key={item.id} className='text-white text-[44px] w-40 h-22 flex justify-center items-center rounded-2xl my-3 cursor-pointer'>
            {item.icon}
          </span>))
        }
      </div>
      <div className="signOut">
        <span className='text-white text-[44px] w-40 h-22 flex justify-center items-center rounded-2xl my-3 cursor-pointer'>
          <IoExit />
        </span>
      </div>
    </div>
  )
}

export default Sidebar