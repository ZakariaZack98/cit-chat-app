import React, { createContext, useState } from 'react'
const ChatContext = createContext();
const initialState = {
  currentUser: {},
  userListData: [],
  alreadyAddedIds: [],
  friendRequestData: [],
  friendlistData: [],
};
const ChatProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);
  const [userListData, setUserListData] = useState(initialState.userListData);
  const [alreadyAddedIds, setAlreadyAddedIds] = useState(initialState.alreadyAddedIds);
  const [friendRequestData, setFriendRequestData] = useState(initialState.friendRequestData);
  const [friendlistData, setFriendlistData] = useState([])
  const [notificationsData, setNotificationsData] = useState([])

  const resetChatContext = () => {
    setCurrentUser(initialState.currentUser);
    setUserListData(initialState.userListData);
    setAlreadyAddedIds(initialState.alreadyAddedIds);
    setFriendRequestData(initialState.friendRequestData);
    setFriendlistData(initialState.friendlistData);
    setNotificationsData(initialState.friendlistData);
  };

  return (
    <ChatContext.Provider value={{
      currentUser,
      setCurrentUser,
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
