import React, { useEffect, useState } from 'react'
import Sidebar from '../HomeComponents/Sidebar'
import { Outlet } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Error from '../../../Pages/Error/Error'

const RootLayout = () => {
  const auth = getAuth();
  const [userAuthorized, setUserAuthorized] = useState(false);

  useEffect(() => {
    auth.currentUser && auth.currentUser.emailVerified ? setUserAuthorized(true) : setUserAuthorized(false);
  }, [])

  if(userAuthorized) {
    return (
      <div className='rootlayout bg-cover bg-center bg-no-repeat h-svh px-20 py-5 flex gap-x-5'>
        <Sidebar/>
        <div className="mainBody w-full ">
          <Outlet/>
        </div>
      </div>
    )
  } else return <Error/>
}

export default RootLayout