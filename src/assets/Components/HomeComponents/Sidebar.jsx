import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipsesSharp, IoExit, IoHomeOutline, IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuCloudUpload } from 'react-icons/lu'
import { getAuth } from 'firebase/auth';

const Sidebar = () => {
  const [mouseOnDP, setMouseOnDP] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  const navItems = [
    {
      id: 1,
      path: '/',
      icon: <IoHomeOutline/>
    },
    {
      id: 2,
      path: '/chat',
      icon: <IoChatbubbleEllipsesSharp />
    },
    {
      id: 3,
      path: '/notifications',
      icon: <IoNotificationsOutline />
    },
    {
      id: 4,
      path: '/settings',
      icon: <IoSettingsOutline />
    },
  
  ]

  /**
   * TODO: NAVIGATE TO DIFFERENT TABS/PATH
   * @param Path
   * return: null
   * */ 
  const handleNav = path => {
    navigate(path);
  }

  // TODO: UPLOAD PROFILE PICTURE VIA CLOUDINARY UPLOAD WIDGET
  const handleProfilePic = async () => {
    await cloudinary.openUploadWidget({
      cloudName: 'dubcsgtfg',
      uploadPreset: 'cit-chat-app',
      googleAPIKey: '',
      searchBySites: ['all', 'cloudinary.com'],
      searchByRights: true,
      sources: ['local', 'url', 'camera', 'dropbox', 'unsplash', 'image_search', 'google_drive', 'shutterstock']
    }, (err, result) => {
      if(err) throw new Error('upload error');
      if(result.info.secure_url) {
        console.log(result.info.secure_url);
      }
    })
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, [])
  

  return (
    <div className='w-[10%] h-full flex flex-col justify-between items-center bg-mainColor rounded-4xl px-2 py-[5dvh]'>
      <div className="avatar relative" onClick={handleProfilePic}>
        {mouseOnDP && (<span className='absolute top-[40%] left-[40%] text-white text-3xl shadow-2xl pointer-events-none'><LuCloudUpload/></span>)}
        <picture className='w-full h-25 flex justify-center items-center'>
          <img src="https://thumbs.dreamstime.com/b/portrait-young-handsome-happy-man-wearing-glasses-casual-smart-blue-clothing-yellow-color-background-square-composition-200740125.jpg" alt="" className='object-center object-cover rounded-full overflow-hidden w-[70%] cursor-pointer' onMouseOver={() => setMouseOnDP(prev => !prev)} onMouseLeave={() => setMouseOnDP(prev => !prev)}/>
        </picture>
      </div>
      <div className="nav w-full flex flex-col justify-center items-center">
        {
          navItems?.map(item => (
          <div key={item.id} className={location.pathname === item.path ? 'active text-[44px] w-[90%] h-[10dvh] flex justify-center items-center rounded-2xl my-[5%]  cursor-pointer' : 'text-white text-[44px] w-[90%] h-[10dvh] flex justify-center items-center rounded-2xl my-[5%] hover:bg-white hover:opacity-60 hover:text-mainColor cursor-pointer'} onClick={() => handleNav(item.path)}>
            {item.icon}
          </div>))
        }
      </div>
      <div className="signOut" onClick={() => {
          signOut(auth);
          navigate('/signin')
        }}>
        <div className='text-white text-[44px] w-[7dvw] h-[10dvh] flex justify-center items-center rounded-2xl my-[5%] hover:bg-white hover:opacity-60 hover:text-mainColor cursor-pointer'
        >
          <IoExit />
        </div>
      </div>
    </div>
  )
}

export default Sidebar