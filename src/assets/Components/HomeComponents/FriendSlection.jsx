import React from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../../contexts/ChatContext'
import GroupCard from '../CommonComponents/GroupCard'
import CommonBtn from '../CommonComponents/CommonBtn'
import PersonCardWBtn from '../CommonComponents/PersonCardWBtn'
import { FetchUser } from '../../../utils/utils'

const FriendSlection = ({ selectedFriends, setSelectedFriends, setOpenFriendSelection }) => {
  const { friendlistData } = useContext(ChatContext);


  const handleAdd = (userId) => {
    FetchUser(userId)
      .then(data => {
        const updatedSelectedFriends = [...selectedFriends];
        if (updatedSelectedFriends.find(data => data.userId === userId)) {
          const targetIdx = updatedSelectedFriends.indexOf(updatedSelectedFriends.find(data => data.userId === userId));
          updatedSelectedFriends.splice(targetIdx, 1);
        } else updatedSelectedFriends.push(data)
        setSelectedFriends(updatedSelectedFriends);
        console.log(updatedSelectedFriends);
    })
  }


  return (
    <div className='flex flex-col gap-y-3 w-120 p-5 bg-white border-2 border-blue-950 rounded-xl absolute top-1/2 left-1/2 z-30' style={{ transform: 'translate(-50%, -50%),', boxShadow: '0 0 20px 20px rgba(0, 0, 0, 0.21)' }}>
      {
        friendlistData?.map((friend, idx) => {
          return (
            <div
              key={friend.userId}
              className={`${idx < friendlistData.length - 1 ? "border-b-gray-300 border-b-[1px]" : ""} py-2 cursor-pointer`}>
              <PersonCardWBtn
                avatar={friend.profile_picture}
                name={friend.userName || friend.username}
                subText={friend.email}
                btnText={selectedFriends.find(selFriend => friend.userId === selFriend.userId) ? 'Remove' : 'Add'}
                bgColorClass={selectedFriends.find(selFriend => friend.userId === selFriend.userId) ? 'bg-red-500' : ''}
                handleBtnClick={() => handleAdd(friend.userId)} />
            </div>
          );
        })
      }
      <CommonBtn label={'Done'} handleClick={() => setOpenFriendSelection(prev => !prev)}/>
    </div>
  )
}

export default FriendSlection