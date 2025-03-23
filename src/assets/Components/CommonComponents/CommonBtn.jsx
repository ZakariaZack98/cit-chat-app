import React from 'react'

const CommonBtn = ({label}) => {
  return (
    <button className='px-4 py-1 rounded-md bg-mainColor text-white font-semibold cursor-pointer'>
      {label}
    </button>
  )
}

export default CommonBtn
