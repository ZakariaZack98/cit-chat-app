import React from 'react'
import SingleChatText from './SingleChatText'

const ChatFeed = ({chatData}) => {
  // TODO: Extracting message collection array from fetched data
  const { msgCollection } = chatData;
  const fetchedCurrentUID = 'CurrentUserID'; //* Dummy current ID of current user
  return (
    <>
      {msgCollection?.map(item => {
        // ? IF senderID and current user's id matches it's a sent message otherwise it's a received message
        return <SingleChatText recieved={item.senderId == fetchedCurrentUID ? false : true} textContent={item.message} deliveryTime={item.sentAt}/>
      })}
    </>
  )
}

export default ChatFeed
