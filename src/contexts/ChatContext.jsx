import React, { createContext, useState } from 'react'
const ChatContext = createContext();
const initialState = {
  chatPartner: null,
  groupListData: [],
  userListData: [],
  alreadyAddedIds: [],
  friendRequestData: [],
  friendlistData: [],
  chatFeedData: [],
  groupChat: null,
};
const ChatProvider = ({children}) => {
  const [chatPartner, setChatPartner] = useState(initialState.chatPartner);
  const [groupListData, setGroupListData] = useState(initialState.groupListData);
  const [userListData, setUserListData] = useState(initialState.userListData);
  const [alreadyAddedIds, setAlreadyAddedIds] = useState(initialState.alreadyAddedIds);
  const [friendRequestData, setFriendRequestData] = useState(initialState.friendRequestData);
  const [friendlistData, setFriendlistData] = useState(initialState.friendlistData);
  const [notificationsData, setNotificationsData] = useState(initialState.notificationsData);
  const [chatFeedData, setChatFeedData] = useState(initialState.chatFeedData);
  const [groupChat, setGroupChat] = useState(initialState.groupChat)

  const resetChatContext = () => {
    setChatPartner(initialState.chatPartner);
    setGroupListData(initialState.groupListData);
    setUserListData(initialState.userListData);
    setAlreadyAddedIds(initialState.alreadyAddedIds);
    setFriendRequestData(initialState.friendRequestData);
    setFriendlistData(initialState.friendlistData);
    setNotificationsData(initialState.friendlistData);
    setChatFeedData(initialState.chatFeedData);
    setGroupChat(initialState.groupChat);
  };

  return (
    <ChatContext.Provider value={{
      chatPartner,
      setChatPartner,
      groupListData,
      setGroupListData,
      userListData, 
      setUserListData,
      alreadyAddedIds,
      setAlreadyAddedIds,
      friendRequestData,
      setFriendRequestData,
      friendlistData,
      setFriendlistData,
      resetChatContext, 
      notificationsData,
      setNotificationsData,
      chatFeedData,
      setChatFeedData,
      groupChat,
      setGroupChat
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatProvider }
