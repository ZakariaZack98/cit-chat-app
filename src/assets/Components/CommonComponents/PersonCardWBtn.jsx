import React from 'react'
import CommonBtn from './CommonBtn'

const PersonCardWBtn = ({avatar, name, subText, btnText, handleBtnClick, bgColorClass, doubleBtn, secondBtnLabel, secondBtnClickHandler}) => {
  return (
    <div className='flex justify-between items-center'>
      <div className="leftPart flex justify-center items-center gap-x-2">
        <picture>
          <img src={avatar || '../../../../src/assets/images/login.jpg'} className='w-[50px] h-[50px] object-cover rounded-full'/>
        </picture>
        <div className="namePart">
          <p className='font-semibold'>{name}</p>
          <p className='text-sm opacity-60 truncate'>{subText}</p>
        </div>
      </div>
      <div className="rightPart flex gap-x-2">
        <CommonBtn label={btnText} handleClick={handleBtnClick} bgColorClass={bgColorClass}/>
        {
          doubleBtn && <CommonBtn label={secondBtnLabel || 'Reject'} handleClick={secondBtnClickHandler} bgColorClass={'bg-red-500'}/>
        }
      </div>
    </div>
  )
}

export default PersonCardWBtn
