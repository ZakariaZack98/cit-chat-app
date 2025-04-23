import React from 'react'

const CommonBtn = ({label, handleClick}) => {
  return (
    <button className='px-4 py-1 rounded-md bg-mainColor text-white font-semibold cursor-pointer' onClick={handleClick}>
      {label}
    </button>
  )
}

export default CommonBtn
