import React, { useEffect, useRef } from 'react';
import SingleChatText from './SingleChatText';
import { auth } from '../../../../Database/firebase';
import moment from 'moment';

const ChatFeed = ({ chatData }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [chatData]);

  return (
    <>
      {
        chatData.length > 0 ? (
          <div 
            className='w-full h-full overflow-y-auto' 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {chatData?.map(message => {
              return (
                <SingleChatText 
                  key={message.createdAt} 
                  recieved={message.senderId === auth.currentUser.uid ? false : true} 
                  textContent={message.text} 
                  deliveryTime={moment(message.createdAt).fromNow()} 
                  imageUrl={message.imageUrl || null}
                />
              );
            })}
            <div ref={bottomRef}></div>
          </div>
        ) : (
          <p className='font-semibold text-xl'>
            No messages to show. Send a message to start a conversation.
          </p>
        )
      }
    </>
  );
};

export default ChatFeed;
