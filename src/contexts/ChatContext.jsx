import React, { createContext, useState } from 'react'
const ChatContext = createContext();
const initialState = {
  currentUser: {},
  userListData: [],
  alreadyAddedIds: [],
  friendRequestData: [],
};
const ChatProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(initialState.currentUser);
  const [userListData, setUserListData] = useState(initialState.userListData);
  const [alreadyAddedIds, setAlreadyAddedIds] = useState(initialState.alreadyAddedIds);
  const [friendRequestData, setFriendRequestData] = useState(initialState.friendRequestData);

  const resetChatContext = () => {
    setCurrentUser(initialState.currentUser);
    setUserListData(initialState.userListData);
    setAlreadyAddedIds(initialState.alreadyAddedIds);
    setFriendRequestData(initialState.friendRequestData);
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
      resetChatContext, 
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export { ChatContext, ChatProvider }
