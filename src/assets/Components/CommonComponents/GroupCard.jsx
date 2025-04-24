import React, { useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import PersonCardWBtn from './PersonCardWBtn';
import PersonCardWTxt from './PersonCardWTxt'
import { AddToFriendlist, CancelFriendRequest, FetchUser, SendFriendRequest } from '../../../utils/utils';
import { auth, db } from '../../../../Database/firebase';
import { ChatContext } from '../../../contexts/ChatContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ref } from 'firebase/database';

const GroupCard = ({ cardTitle, listData, withBtn }) => {
  const { alreadyAddedIds, friendlistData, setChatPartner } = useContext(ChatContext);
  const navigate = useNavigate();
  const handleBtnClick = (userId) => {
    if (cardTitle === 'User List') {
      if (alreadyAddedIds.includes(userId)) {
        CancelFriendRequest(auth.currentUser.uid, userId)
      } else if (friendlistData.map(friend => friend.userId).includes(userId)) {
        FetchUser(userId)
          .then(data => {
            setChatPartner(data);
            navigate('/chat');
          })
        console.log('Proceed to send message to that person')
      } else SendFriendRequest(auth.currentUser.uid, userId)
    } else if (cardTitle === 'Friend Requests') {
      AddToFriendlist(userId)
    }
  }

  const handleSecondBtnClick = (userId) => {
    if (cardTitle === 'Friend Requests') {
      CancelFriendRequest(userId, auth.currentUser.uid)
      console.log('clicked')
    }
  }

  const getBtnText = (id) => {
    if (cardTitle === 'User List') {
      if (alreadyAddedIds.includes(id)) {
        return 'Cancel Request'
      } else if (friendlistData.map(friend => friend.userId).includes(id)) {
        return 'Message'
      } else return 'Add Friend'
    } else if (cardTitle === 'Friend Requests') {
      return 'Accept'
    } else if (cardTitle === 'Friends') {
      return 'Message'
    } else if (cardTitle === 'Blocked Users') {
      return 'Unblock'
    } else return 'Message'
  }

  const getSubText = (item) => {
    if (cardTitle === 'Friends') {
      return `Friend since ${moment(item.createdAt).fromNow()}`
    } else if (cardTitle === 'Friend Requests') {
      return moment(item.createdAt).fromNow();
    } else if (cardTitle === 'User List') {
      const friend = friendlistData.find(friend => friend.userId === item.userId);
      if (friend) {
        return `Friend since ${moment(friend.createdAt).fromNow()}`
      } else {
        return `${item.email}`
      }
    } else return `${item.email}`
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
                  <PersonCardWBtn
                    avatar={item.profile_picture}
                    name={item.userName || item.username}
                    subText={`${getSubText(item)}` || ''}
                    btnText={getBtnText(item.userId)}
                    bgColorClass={getBtnText(item.userId) === 'Cancel Request' ? 'bg-red-500' : ''}
                    doubleBtn={cardTitle === 'Friend Requests' ? true : false}
                    secondBtnClickHandler={() => handleSecondBtnClick(item.userId)}
                    handleBtnClick={() => handleBtnClick(item.userId)} />
                </div>
              );
            })
          ) : (
            listData?.map((item, idx) => {
              return (
                <div
                  key={item.userId}
                  className={`${idx < listData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
                  <PersonCardWTxt avatar={item.profile_picture} name={item.userName || item.username} subText={item.lastMsg} sideText={item.lastSeen || item.sentAt || item.createdAt || 'N/A'} handleBtnClick={() => handleBtnClick(item.userId)} />
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
