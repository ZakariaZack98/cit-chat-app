import React from 'react'
import { friendRequestsData } from '../../../lib/componentsData';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PersonCardWBtn from '../CommonComponents/PersonCardWBtn';

const FriendRequests = () => {
  const listData = friendRequestsData();
  console.log(listData)
  return (
    <div className="p-3 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold">User List</p>
        <span className="cursor-pointer">
          <BsThreeDotsVertical />
        </span>
      </div>
      <div className="groups h-[90%] overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {listData?.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={`${idx < listData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
              <PersonCardWBtn avatar={item.imgUrl} name={item.name} subText={item.lastMsg} btnText={item.btnText} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default FriendRequests
