import React, { useContext, useEffect, useState } from "react";
import GroupList from "../../assets/Components/HomeComponents/GroupList";
import Friends from "../../assets/Components/HomeComponents/Friends";
import UserPart from "../../assets/Components/ChatComponents/UserPart";
import { FaPaperPlane, FaRegSmile } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import ChatFeed from "../../assets/Components/ChatComponents/ChatFeed";
import { ChatContext } from "../../contexts/ChatContext";
import Picker from "@emoji-mart/react";
import { onValue, push, ref } from "firebase/database";
import { auth, db } from "../../../Database/firebase";
import { GetTimeNow } from "../../utils/utils";

//* UNIQUE CONVERSATION KEY GENERATOR
const getConversationKey = (id1, id2) => [id1, id2].sort().join("_");

const Chat = () => {
  const { chatPartner, chatFeedData, setChatFeedData } = useContext(ChatContext);

  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const addEmoji = (emoji) => {
    setInput(input + (emoji.native || emoji.unified || ""));
  };

  // FETCH CHAT FEED
  useEffect(() => {
    if (!auth.currentUser?.uid || !chatPartner?.userId) return;
    const conversationKey = getConversationKey(auth.currentUser.uid, chatPartner.userId);
    const conversationRef = ref(db, `conversations/${conversationKey}`);
    const unsubscribe = onValue(conversationRef, (snapshot) => {
      const convData = [];
      snapshot.forEach((text) => {
        convData.push(text.val());
      });
      setChatFeedData(convData);
    });

    return () => unsubscribe();
  }, [auth.currentUser?.uid, chatPartner?.userId]);

  // SEND MESSAGE (WITH optional imageUrl)
  const sendMessage = async (senderId, recieverId, text, imageUrl = "") => {
    const conversationKey = getConversationKey(senderId, recieverId);
    const conversationsRef = ref(db, `conversations/${conversationKey}`);
    try {
      await push(conversationsRef, {
        text,
        senderId,
        recieverId,
        imageUrl,
        createdAt: GetTimeNow(),
      });
    } catch (error) {
      console.error("Error sending message", error.message);
    }
  };

  // HANDLE IMAGE UPLOAD USING CLOUDINARY
  const handleUpload = () => {
    if (!window.cloudinary) {
      console.error("Cloudinary widget script not loaded.");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dubcsgtfg",
        uploadPreset: "cit-chat-app",
        sources: ["local", "url", "camera", "dropbox", "unsplash", "image_search", "google_drive", "shutterstock"],
        multiple: false,
        cropping: false,
        folder: "chat_images",
        resourceType: "image",
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const imageUrl = result.info.secure_url;
          await sendMessage(auth.currentUser.uid, chatPartner.userId, "", imageUrl);
        } else if (error) {
          console.error("Upload error:", error);
        }
      }
    );
  };

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
        <UserPart
          avatar={chatPartner?.profile_picture}
          name={chatPartner?.userName}
          isActive={chatPartner?.isActive || true}
          lastSeen={chatPartner?.lastSeen || "now"}
        />
        <div
          className="chatFeed h-[70%] overflow-scroll flex justify-center items-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <ChatFeed chatData={chatFeedData} />
        </div>
        <div className="inputPart flex items-center gap-x-2 mt-4 pt-5 pb-1 border-t-gray-300 border-t-[1px] relative">
          <div className="flex items-center bg-[#f1f1f1] rounded-lg flex-grow px-3 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              className="flex-grow bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage(auth.currentUser.uid, chatPartner.userId, input);
                  setInput("");
                }
              }}
            />
            <FaRegSmile
              className="text-black opacity-50 cursor-pointer mx-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <div style={{ position: "absolute", bottom: "60px", right: "60px", zIndex: 10 }}>
                <Picker onEmojiSelect={addEmoji} />
              </div>
            )}
            <MdPhoto className="text-black opacity-50 cursor-pointer" onClick={handleUpload} />
          </div>
          <button
            className="w-10 h-9 bg-mainColor rounded-lg flex items-center justify-center text-white cursor-pointer"
            onClick={() => {
              sendMessage(auth.currentUser.uid, chatPartner.userId, input);
              setInput("");
            }}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
