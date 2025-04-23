import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import PersonCardWBtn from './PersonCardWBtn';
import PersonCardWTxt from './PersonCardWTxt'
import { SendFriendRequest } from '../../../utils/utils';
import { auth } from '../../../../Database/firebase';

const GroupCard = ({cardTitle, listData, alreadyAddedIds, withBtn}) => {
  const handleBtnClick = (userId) => {
    if(cardTitle === 'User List') {
      SendFriendRequest(auth.currentUser.uid, userId)
    }
  }

  return (
    <div className="p-3 rounded-xl shadow-lg h-full bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-1">
          <p className="font-semibold">{cardTitle}</p>
          <div className='w-5 h-5 rounded-full bg-blue-700 flex justify-center items-center'>
            <p className='text-sm font-semibold text-white'>{listData.length}</p>
          </div>
        </div>
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
                  key={item.userId}
                  className={`${idx < listData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
                  <PersonCardWBtn avatar={item.profile_picture} name={item.userName || item.username} subText={item.lastSeen || item.lastMsg || item.email || item.createdAt || ''} btnText={alreadyAddedIds?.includes(item.userId) ? '-' : '+'} handleBtnClick={() => handleBtnClick(item.userId)}/>
                </div>
              );
            })
          ) : (
            listData?.map((item, idx) => {
              return (
                <div
                  key={item.userId}
                  className={`${idx < listData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
                  <PersonCardWTxt avatar={item.profile_picture} name={item.userName || item.username} subText={item.lastMsg} sideText={item.lastSeen || item.sentAt || item.createdAt || 'N/A'} handleBtnClick={() => handleBtnClick(item.userId)}/>
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
