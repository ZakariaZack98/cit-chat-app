import React from 'react'
import { FaBell } from 'react-icons/fa'

const NotificationCard = ({message, time}) => {
  return (
    <div className='notiCard py-5 flex items-center gap-x-5 relative'>
      <span className='text-2xl'>
        <FaBell/>
      </span>
      <p className=' font-medium'>{message}</p>
      <p className='absolute right-3 bottom-3 opacity-80 text-blue-800'>({time})</p>
    </div>
  )
}

export default NotificationCard
