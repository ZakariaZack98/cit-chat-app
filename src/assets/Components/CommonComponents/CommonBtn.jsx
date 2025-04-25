import React from 'react'

const CommonBtn = ({label, handleClick, bgColorClass, hidden}) => {
  return (
    <button className={`px-4 py-1 rounded-md hover:bg-blue-800 ${bgColorClass ? bgColorClass : 'bg-mainColor'} ${hidden ? 'hidden' : ''} text-white font-semibold cursor-pointer`} onClick={handleClick}>
      {label}
    </button>
  )
}

export default CommonBtn
