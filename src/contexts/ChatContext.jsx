import React, { createContext, useState } from 'react'
const ChatContext = createContext();
const ChatProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  return (
    <div>
      
    </div>
  )
}

export default ChatContext
