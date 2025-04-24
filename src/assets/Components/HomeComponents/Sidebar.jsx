import React, { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipsesSharp, IoExit, IoHomeOutline, IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { LuCloudUpload } from 'react-icons/lu'
import { getAuth, updateProfile, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../../../Database/firebase';
import { ChatContext } from '../../../contexts/ChatContext';

const Sidebar = () => {
  const [mouseOnDP, setMouseOnDP] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const { resetChatContext, unreadMessages, notificationsData, setNotificationsData } = useContext(ChatContext);
  const [pendingNotification, setPendingNotifications] = useState(notificationsData.length); //! Temporary solution (Gimmick)

  const navItems = [
    {
      id: 1,
      name: 'home',
      path: '/',
      icon: <IoHomeOutline/>
    },
    {
      id: 2,
      name: 'chat',
      path: '/chat',
      icon: <IoChatbubbleEllipsesSharp />
    },
    {
      id: 3,
      name: 'notifications',
      path: '/notifications',
      icon: <IoNotificationsOutline />
    },
    {
      id: 4,
      name: 'settings',
      path: '/settings',
      icon: <IoSettingsOutline />
    },
  
  ]

  // ! FOR GIMMICK NOTIFICATION DOT==================================================
  useEffect(() => {
    const notificationsRef = ref(db, `notifications/${auth.currentUser.uid}`)
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const updatedNotifications = [];
      if(snapshot.exists()) {
        snapshot.forEach(notification => {
          updatedNotifications.push(notification.val());
        })
      }
      setNotificationsData(updatedNotifications);
      setPendingNotifications(updatedNotifications.length);
    })
    return () => unsubscribe();
  }, [])
  // ! FOR GIMMICK NOTIFICATION DOT==================================================

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
    }, async (err, result) => {
      if (err) throw new Error('upload error');
      if (result.info.secure_url) {
        console.log(result.info.secure_url);

        // Update the photoURL in Firebase Auth
        await updateProfile(auth.currentUser, {
          photoURL: result.info.secure_url
        });

        // Update the profile_picture in Realtime Database
        const userRef = ref(db, `users/${auth.currentUser.uid}`);
        await update(userRef, {
          profile_picture: result.info.secure_url
        });

        toast.success('Profile picture updated successfully!');
      }
    });
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, [])
  

  return (
    <div className='w-[10%] h-full flex flex-col justify-between items-center bg-mainColor rounded-4xl px-2 py-[5dvh]'>
      <div className="avatar relative " onClick={handleProfilePic}>
        {mouseOnDP && (<span className='absolute top-[40%] left-[40%] text-white text-3xl shadow-2xl pointer-events-none'><LuCloudUpload/></span>)}
        <picture className='w-full h-25 flex justify-center items-center'>
          <img src={auth.currentUser.photoURL || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"} alt="" className='object-center object-cover rounded-full overflow-hidden w-[70%] min-h-14 min-w-14 cursor-pointer' onMouseOver={() => setMouseOnDP(prev => !prev)} onMouseLeave={() => setMouseOnDP(prev => !prev)}/>
        </picture>
      </div>
      <div className="nav w-full flex flex-col justify-center items-center">
        {
          navItems?.map(item => (
          <div key={item.id} className={location.pathname === item.path ? 'active text-[44px] w-[90%] h-[10dvh] flex justify-center items-center rounded-2xl my-[5%]  cursor-pointer' : 'text-white text-[44px] w-[90%] h-[10dvh] flex justify-center items-center rounded-2xl my-[5%] hover:bg-white hover:opacity-60 hover:text-mainColor cursor-pointer'} onClick={() => {
            handleNav(item.path);
            setPendingNotifications(0);
            }}>
            <span className='relative'>
              <span>{item.icon}</span>
              {
                item.name === 'chat' && unreadMessages && unreadMessages.length > 0 && <div className="absolute -bottom-2 right-0 h-5 w-5 rounded-full bg-red-800">
                  <p className="font-semibold">{unreadMessages.length}</p>
                </div> 
              }
              {
                item.name === 'notifications' && notificationsData && pendingNotification > 0 && <div className="absolute -bottom-2 right-0 h-5 w-5 rounded-full bg-red-800 flex justify-center items-center" >
                  <p className="font-semibold text-sm text-white">{pendingNotification}</p>
                </div> 
              }
            </span>
          </div>))
        }
      </div>
      <div className="signOut" onClick={() => {
          resetChatContext();
          navigate('/signin');
          toast.warn('You have been logged out.');
          signOut(auth);
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