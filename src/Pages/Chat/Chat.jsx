import React, { useContext, useEffect, useState, useRef } from "react";
import GroupList from "../../assets/Components/HomeComponents/GroupList";
import Friends from "../../assets/Components/HomeComponents/Friends";
import UserPart from "../../assets/Components/ChatComponents/UserPart";
import { FaPaperPlane, FaRegSmile } from "react-icons/fa";
import { MdPhoto } from "react-icons/md";
import ChatFeed from "../../assets/Components/ChatComponents/ChatFeed";
import { ChatContext } from "../../contexts/ChatContext";
import Picker from "@emoji-mart/react";
import { onValue, push, ref, set } from "firebase/database";
import { auth, db } from "../../../Database/firebase";
import { GetTimeNow } from "../../utils/utils";

const getConversationKey = (id1, id2) => [id1, id2].sort().join("_");

const Chat = () => {
  const { chatPartner, groupChat, chatFeedData, setChatFeedData } = useContext(ChatContext);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const uploadWidget = useRef(null);

  const addEmoji = (emoji) => {
    setInput(input + (emoji.native || emoji.unified || ""));
  };

  // Initialize Cloudinary widget once
  useEffect(() => {
    const loadCloudinary = () => {
      const script = document.createElement('script');
      script.src = 'https://upload-widget.cloudinary.com/latest/global/all.js';
      script.async = true;
      script.onload = initializeWidget;
      document.body.appendChild(script);
    };

    const initializeWidget = () => {
      if (!window.cloudinary) return;

      uploadWidget.current = window.cloudinary.createUploadWidget(
        {
          cloudName: "dubcsgtfg",
          uploadPreset: "cit-chat-app",
          sources: ['local', 'url', 'camera', 'dropbox', 'unsplash', 'image_search', 'google_drive', 'shutterstock'],
          multiple: false,
          cropping: false,
          folder: "chat_images",
          resourceType: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            setUploadError("Upload failed. Please try again.");
            setIsUploading(false);
            return;
          }

          if (result.event === "success") {
            if(chatPartner?.userId) {
              sendMessage(auth.currentUser.uid, chatPartner.userId, "", result.info.secure_url);
            }
            if(groupChat?.key) {
              sendMessage(auth.currentUser.uid, groupChat.key, "", result.info.secure_url);
            }
            setTimeout(() => {
              setIsUploading(false);
              setUploadError(null);
            }, 500); // Small delay to prevent rapid successive uploads
          }

          if (result.event === "close") {
            setIsUploading(false);
          }
        }
      );
    };

    if (!window.cloudinary) {
      loadCloudinary();
    } else {
      initializeWidget();
    }

    return () => {
      if (uploadWidget.current?.close) {
        uploadWidget.current.close();
      }
    };
  }, [chatPartner, groupChat]);

  // Fetch chat feed
  useEffect(() => {
    // if (!auth.currentUser?.uid || !chatPartner?.userId) return;
    if (!chatPartner?.userId && !groupChat?.key) return;
    if (chatPartner?.userId) {
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
    }
    if (groupChat?.key) {
      const groupChatRef = ref(db, `groupChats/${groupChat.key}`);
      const unsubscribe = onValue(groupChatRef, (snapshot) => {
        const convData = [];
        snapshot.forEach((text) => {
          convData.push(text.val())
        })
        setChatFeedData(convData);
      });

      return () => unsubscribe();
    }
  }, [auth.currentUser?.uid, chatPartner?.userId]);

  const sendMessage = async (senderId, recieverId, text, imageUrl = "") => {
    if (!chatPartner?.userId && !groupChat?.key) return;
    if (chatPartner?.userId) {
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
    }
    if (groupChat?.key) {
      const groupChatRef = ref(db, `groupChats/${groupChat.key}`);
      const lastMessageRef = ref(db, `groups/${groupChat.key}/lastMessage`)
      try {
        await push(groupChatRef, {
          text,
          senderId,
          recieverId,
          imageUrl,
          createdAt: GetTimeNow(),
        });
        await set(lastMessageRef, {
          text
        })
      } catch (error) {
        console.error("Error sending message: ", error.message);
      }
    }
  };

  const handleUpload = () => {
    if (!uploadWidget.current || isUploading) return;
    setIsUploading(true);
    setUploadError(null);
    uploadWidget.current.open();
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
          avatar={chatPartner?.profile_picture || groupChat?.profile_picture || 'https://cdn-icons-png.flaticon.com/512/2043/2043173.png'}
          name={chatPartner?.userName || groupChat?.groupName || 'Name not found'}
          isActive={chatPartner?.isActive || true}
          lastSeen={chatPartner?.lastSeen || [1,2,3] || "now"}
        />
        <div
          className="chatFeed h-[80%] overflow-scroll flex justify-center items-center"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <ChatFeed chatData={chatFeedData} isGroupChat={groupChat?.key ? true : false}/>
        </div>
        <div className="inputPart flex items-center gap-x-2 mt-4 pt-5 pb-1 border-t-gray-300 border-t-[1px] relative">
          {uploadError && (
            <div className="absolute bottom-full mb-1 left-0 text-red-500 text-xs">
              {uploadError}
            </div>
          )}
          <div className="flex items-center bg-[#f1f1f1] rounded-lg flex-grow px-3 py-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              className="flex-grow bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (chatPartner?.userId) {
                    sendMessage(auth.currentUser.uid, chatPartner.userId, input);
                    setInput("");
                  }
                  if(groupChat?.key) {
                    sendMessage(auth.currentUser.uid, groupChat.key, input);
                    setInput("");
                  }
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
            <MdPhoto
              className={`text-black ${isUploading ? "opacity-25 animate-pulse" : "opacity-50"} cursor-pointer`}
              onClick={isUploading ? undefined : handleUpload}
            />
          </div>
          <button
            className="w-10 h-9 bg-mainColor rounded-lg flex items-center justify-center text-white cursor-pointer"
            onClick={() => {
              if (chatPartner?.userId) {
                sendMessage(auth.currentUser.uid, chatPartner.userId, input);
                setInput("");
              }
              if(groupChat?.key) {
                sendMessage(auth.currentUser.uid, groupChat.key, input);
                setInput("");
              }
            }}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;