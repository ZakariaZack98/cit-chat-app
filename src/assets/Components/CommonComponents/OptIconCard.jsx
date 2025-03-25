import React from 'react'

const OptIconCard = ({icon, name}) => {
  return (
    <div className='flex gap-x-4 py-4'>
      <span>
        {icon}
      </span>
      <p className="text-semibold">{name}</p>
    </div>
  )
}

export default OptIconCard
