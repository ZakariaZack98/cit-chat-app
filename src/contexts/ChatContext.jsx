import React, { createContext, useState } from 'react'
const ChatContext = createContext();
const initialState = {
  chatPartner: null,
  userListData: [],
  alreadyAddedIds: [],
  friendRequestData: [],
  friendlistData: [],
};
const ChatProvider = ({children}) => {
  const [chatPartner, setChatPartner] = useState(initialState.chatPartner);
  const [userListData, setUserListData] = useState(initialState.userListData);
  const [alreadyAddedIds, setAlreadyAddedIds] = useState(initialState.alreadyAddedIds);
  const [friendRequestData, setFriendRequestData] = useState(initialState.friendRequestData);
  const [friendlistData, setFriendlistData] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);

  const resetChatContext = () => {
    setChatPartner(initialState.chatPartner);
    setUserListData(initialState.userListData);
    setAlreadyAddedIds(initialState.alreadyAddedIds);
    setFriendRequestData(initialState.friendRequestData);
    setFriendlistData(initialState.friendlistData);
    setNotificationsData(initialState.friendlistData);
  };

  return (
    <ChatContext.Provider value={{
      chatPartner,
      setChatPartner,
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
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatProvider }
