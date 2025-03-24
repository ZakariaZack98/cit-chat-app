import React from 'react'
import { groupData } from '../../../lib/componentsData';
import { BsThreeDotsVertical } from 'react-icons/bs';
import PersonCardWTxt from '../CommonComponents/PersonCardWTxt';

const Group = () => {
  const chatData = groupData();
  return (
    <div className="p-3 rounded-xl shadow-lg h-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold">Groups</p>
        <span className="cursor-pointer">
          <BsThreeDotsVertical />
        </span>
      </div>
      <div className="groups h-[90%] overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {chatData?.map((item, idx) => {
          return (
            <div
              key={item.id}
              className={`${idx < chatData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
              <PersonCardWTxt avatar={item.imgUrl} name={item.name} subText={item.lastMsg} sideText={item.sentAt} />
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Group
