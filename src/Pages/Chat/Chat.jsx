import React, { useContext, useState } from "react";
import GroupList from "../../assets/Components/HomeComponents/GroupList";
import Friends from "../../assets/Components/HomeComponents/Friends";
import { activeConvUserData, getChatData } from "../../lib/componentsData";
import UserPart from "../../assets/Components/ChatComponents/UserPart";
import { FaPaperPlane, FaRegSmile } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import ChatFeed from "../../assets/Components/ChatComponents/ChatFeed";
import { ChatContext } from "../../contexts/ChatContext";

const Chat = () => {
  const {chatPartner} = useContext(ChatContext);
  const listData = getChatData(); //DUMMY FETCHING CHAT DATA

  const [input, setInput] = useState('');


  return (
    <div className="w-full h-full flex gap-x-5">
      <div className="left w-[30%] h-full flex flex-col justify-between">
        <div className="h-[50%]">
          <GroupList />
        </div>
        <div className="h-[48%]">
          <Friends />
        </div>
      </div>
      <div className="right w-[70%] h-full shadow-xl rounded-xl px-7 py-4 flex flex-col justify-between bg-white">
        <UserPart avatar={chatPartner.profile_picture} name={chatPartner.userName} isActive={chatPartner.isActive || true } lastSeen={chatPartner.lastSeen || 'now'} />
        <div className="chatFeed h-[70%] overflow-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <ChatFeed chatData={listData}/>
        </div>
        <div className="inputPart flex items-center gap-x-2 mt-4 pt-5 pb-1 border-t-gray-300 border-t-[1px]">
          <div className="flex items-center bg-[#f1f1f1] rounded-lg flex-grow px-3 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              className="flex-grow bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={e => {
                if(e.key === 'Enter') {
                  //sending function
                  console.log('Proceed to send', input);
                }
              }}
            />
            <FaRegSmile className="text-black opacity-50 cursor-pointer mx-2" />
            <MdPhoto className="text-black opacity-50 cursor-pointer" />
          </div>
          <button className="w-10 h-9 bg-mainColor rounded-lg flex items-center justify-center text-white cursor-pointer" onClick={() => {
            //sending function
            console.log('Proceed to send', input);
          }}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
