import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { groupListData } from '../../../lib/groupListData'
import PersonCardWBtn from '../CommonComponents/PersonCardWBtn'

const GroupList = () => {
  const listData = groupListData();
  console.log(listData);
  return (
    <div className='flex flex-col gap-y-2'>
      <div className="searchBar flex items-center bg-white rounded-xl px-4 py-2 shadow-md">
        <FaSearch className="text-gray-500 mr-2" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-grow outline-none text-sm text-gray-700"
        />
        <BsThreeDotsVertical className="text-gray-500 ml-2" />
      </div>
      <div className="list shadow-md h-[35dvh] rounded-xl p-3">
        <div className="flex justify-between items-center">
          <p className='font-semibold'>Group List</p>
          <span className='cursor-pointer'>
            <BsThreeDotsVertical/>
          </span>
        </div>
        <div className="groups h-[90%] overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {
            listData?.map((item, idx) => {
              return (
                <div key={item.id} className={`${idx < listData.length - 1 ? 'border-b-gray-300 border-b-[1px]' : ''} py-1.5`}>
                  <PersonCardWBtn avatar={item.imgUrl} name={item.name} subText={item.LastMsg} btnText={item.btnText}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default GroupList
