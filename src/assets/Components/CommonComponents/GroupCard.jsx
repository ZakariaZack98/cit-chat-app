import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import PersonCardWBtn from './PersonCardWBtn';
import PersonCardWTxt from './PersonCardWTxt'

const GroupCard = ({cardTitle, listData, btnText, withBtn}) => {
  return (
    <div className="p-3 rounded-xl shadow-lg h-full bg-white">
      <div className="flex justify-between items-center">
        <p className="font-semibold">{cardTitle}</p>
        <span className="cursor-pointer">
          <BsThreeDotsVertical />
        </span>
      </div>
      <div className="groups h-[90%] overflow-y-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {
          withBtn ? (
            listData?.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className={`${idx < listData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
                  <PersonCardWBtn avatar={item.imgUrl} name={item.name} subText={item.lastSeen || item.lastMsg} btnText={btnText} />
                </div>
              );
            })
          ) : (
            listData?.map((item, idx) => {
              return (
                <div
                  key={item.id}
                  className={`${idx < listData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
                  <PersonCardWTxt avatar={item.imgUrl} name={item.name} subText={item.lastMsg} sideText={item.lastSeen || item.sentAt || ''} />
                </div>
              );
            })
          )
        }
      </div>
    </div>
  )
}

export default GroupCard
