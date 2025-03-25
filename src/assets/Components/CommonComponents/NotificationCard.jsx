import React from 'react'
import { FaBell } from 'react-icons/fa'

const NotificationCard = ({message}) => {
  return (
    <div className='notiCard py-5 flex items-center gap-x-5'>
      <span className='text-2xl'>
        <FaBell/>
      </span>
      <p>{message}</p>
    </div>
  )
}

export default NotificationCard
