import React from 'react'
import SingleChatText from './SingleChatText'
import { auth } from '../../../../Database/firebase';
import moment from 'moment';

const ChatFeed = ({ chatData }) => {
  return (
    <>
      {
        chatData.length > 0 ? (
          <div className='w-full h-full'>
            {chatData?.map(message => {
              return <SingleChatText key={message.createdAt} recieved={message.senderId === auth.currentUser.uid ? false : true} textContent={message.text} deliveryTime={moment(message.createdAt).fromNow()} imageUrl={message.imageUrl || null}/>
            })}
          </div>
        ) : <p className='font-semibold text-xl'>No messages to show. Send a message to start a conversation.</p>
      }
    </>
  )
}

export default ChatFeed
