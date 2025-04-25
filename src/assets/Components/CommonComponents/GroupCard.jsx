import React, { useContext, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import PersonCardWBtn from './PersonCardWBtn';
import PersonCardWTxt from './PersonCardWTxt'
import { AddToFriendlist, AddToGroupChat, CancelFriendRequest, FetchUser, GetTimeNow, SendFriendRequest } from '../../../utils/utils';
import { auth, db } from '../../../../Database/firebase';
import { ChatContext } from '../../../contexts/ChatContext';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import CommonBtn from './CommonBtn';
import FriendSlection from '../HomeComponents/FriendSlection';
import { IoIosCloseCircle } from 'react-icons/io';

const GroupCard = ({ cardTitle, listData, withBtn }) => {
  const { alreadyAddedIds, friendlistData, setChatPartner } = useContext(ChatContext);
  const [optbtnClicked, setOptbtnClicked] = useState(false);
  const [groupCreationPopup, setGroupCreationPopup] = useState(false);
  const [openFriendSelection, setOpenFriendSelection] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  /**
   * TODO: DYNAMICALLY ASSIGINING BUTTON ACTION BASED ON THE GROUP CARD TYPE =============================
   * @param {userId} string containing the target user's UID
   * @return void
   * */
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
    } else if (cardTitle === 'Friends') {
      FetchUser(userId)
        .then(data => {
          setChatPartner(data);
          navigate('/chat');
        })
    }
  }
  const handleSecondBtnClick = (userId) => {
    if (cardTitle === 'Friend Requests') {
      CancelFriendRequest(userId, auth.currentUser.uid)
      console.log('clicked')
    }
  }

  /**
   * TODO: DYNAMICALLY ASSIGINING BUTTON LABEL BASED ON THE GROUP CARD TYPE =============================
   * @param {userId} string containing the target user's UID
   * @return void
   * */
  const getBtnText = (userId) => {
    if (cardTitle === 'User List') {
      if (alreadyAddedIds.includes(userId)) {
        return 'Cancel Request'
      } else if (friendlistData.map(friend => friend.userId).includes(userId)) {
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


  /**
   * TODO: DYNAMICALLY SUBTEXT BASED ON THE GROUP CARD TYPE =============================
   * @param {item} object containing the propsdata of that groupcard
   * @return void
   * */
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

  /**
   * TODO: HANDLE 3 DOTS CLICK OF THE GROUP CARD'S HERADER BASED ON THE GROUP CARD TYPE ==============
   * @param {}
   * @return void
   * */
  const handle3dotsClick = () => {
    if (cardTitle === 'Group List') {

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
        <span className="cursor-pointer relative">
          <BsThreeDotsVertical onClick={() => {
            setOptbtnClicked(prev => !prev)
          }} />
          <div className={`absolute px-4 py-1 w-50 right-0 -bottom-9 bg-white border-2 border-blue-950 shadow-lg rounded-lg hover:bg-blue-950 hover:text-white ${optbtnClicked ? '' : 'hidden'}`} onClick={() => {
            setGroupCreationPopup(true);
            setOptbtnClicked(false);
            }}>
            <p>{
              cardTitle === 'Group List' ? '+ Create new group' : 'Options'
            }</p>
          </div>
        </span>
        {
          cardTitle === 'Group List' && groupCreationPopup && (
            <div className="absolute w-130 h-80 flex flex-col justify-between p-5 bg-white rounded-xl top-1/2 left-1/2 z-20 border-2 border-[rgba(16,1,155,0.43)]" style={{ transform: 'translate(-50%, -50%)', boxShadow: '0 0 20px 20px rgba(0, 0, 0, 0.21)' }}>
              <div className="flex justify-between">
                <h3 className="font-semibold text-xl">+ Create New Group</h3>
                <span className='text-red-700 text-2xl cursor-pointer' onClick={() => setGroupCreationPopup(false)}><IoIosCloseCircle /></span>
              </div>
              <div className="flex items-center gap-x-2 my-3">
                <label htmlFor="groupName">Group Name: </label>
                <input type="text" id='groupName' name='groupName' value={groupName}  className='border-2 border-mainColor rounded-md w-[75%] py-1 px-2' onChange={e => setGroupName(e.target.value)}/>
              </div>
              <div className="w-30">
              <CommonBtn label={'Add Friends'} handleClick={() => setOpenFriendSelection(prev => !prev)} />
              </div>
              <div className="flex flex-wrap justify-start items-start gap-x-2 relative min-h-[40%] ">
                {
                  selectedFriends?.map(friend => <p key={friend.userId} className='px-4 py-1 my-3 h-8 bg-[rgb(218,218,218)] text-black rounded-2xl'>{friend.userName}</p>)
                }
              </div>
              {
                  <div className={`w-full flex justify-end ${selectedFriends.length < 2 ? 'opacity-30 pointer-events-none cursor-no-drop' : 'opacity-100 pointer-events-auto cursor-pointer'}`}>
                    <p className='px-5 py-2 font-semibold bg-green-700 rounded-lg text-white hover:bg-green-900' onClick={() => {
                      // ? HANDLING GROUP CREATION ===
                      const groupDetails = {
                        groupName,
                        key: Date.now(),
                        createdAt: GetTimeNow(),
                        participantsIds: [...selectedFriends.map(friend => friend.userId), auth.currentUser.uid],
                      }
                      AddToGroupChat(groupDetails).then(() => {
                        setGroupCreationPopup(false);
                        navigate('/chat')
                      });
                    }}>Create Group</p>
                  </div>
                }
            </div>
          )
        }
        {
          openFriendSelection && <FriendSlection selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} setOpenFriendSelection={setOpenFriendSelection} />
        }
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
