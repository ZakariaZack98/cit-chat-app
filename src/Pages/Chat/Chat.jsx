import React, { useState } from "react";
import GroupList from "../../assets/Components/HomeComponents/GroupList";
import Friends from "../../assets/Components/HomeComponents/Friends";
import { activeConvUserData } from "../../lib/componentsData";
import UserPart from "../../assets/Components/ChatComponents/UserPart";
import { FaPaperPlane, FaRegSmile } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";

const Chat = () => {
  const [convUser, setConvUser] = useState(activeConvUserData());
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
        <UserPart avatar={convUser.imgUrl} name={convUser.name} isActive={convUser.isActive} lastSeen={convUser.lastSeen} />
        <div className="inputPart flex items-center gap-x-2 mt-4 pt-5 pb-1 border-t-gray-300 border-t-[1px]">
          <div className="flex items-center bg-[#f1f1f1] rounded-lg flex-grow px-3 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-grow bg-transparent outline-none text-sm text-gray-700"
            />
            <FaRegSmile className="text-black opacity-50 cursor-pointer mx-2" />
            <MdPhoto className="text-black opacity-50 cursor-pointer" />
          </div>
          <button className="w-10 h-9 bg-mainColor rounded-lg flex items-center justify-center text-white cursor-pointer">
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
