import { get, push, ref, set } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUpload } from "react-icons/fa";
import { db } from "../../../../Database/firebase";
import { ChatContext } from "../../../contexts/ChatContext";

const UserPart = ({ avatar, name, isActive, lastSeen }) => {
  const {groupChat, setGroupChat, chatPartner} = useContext(ChatContext);
  const [hover, setHover] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const uploadWidget = useRef(null);
  const [participantsName, setParticipantsName] = useState([]);

  useEffect(() => {
    if(chatPartner?.userId) return;
    const promiseArr = []
    const participantsIds = groupChat?.participantsIds;
    participantsIds.forEach(id => {
      const userRef = ref(db, `users/${id}`)
      const userPromise = get(userRef).then(userSnapshot => {
        if(userSnapshot.exists()) {
          return userSnapshot.val().userName;
        }
      })
      promiseArr.push(userPromise);
    })
    Promise.all(promiseArr).then(data => {
      console.log('names: ', data);
      setParticipantsName(data);
    })
  }, [groupChat])

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
          folder: "group_dp",
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
            const groupsDPRef = ref(db, `groups/${groupChat.key}/profile_picture`);
            set(groupsDPRef, result.info.secure_url)
            setGroupChat({...groupChat, profile_picture: result.info.secure_url})
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
  }, groupChat?.key ? [groupChat] : [chatPartner]);

  const handleUpload = () => {
    if (!uploadWidget.current || isUploading) return;
    setIsUploading(true);
    setUploadError(null);
    uploadWidget.current.open();
  };

  return (
    <div className="flex justify-between items-center border-b-gray-300 border-b-[1px] pb-3">
      <div className="left flex gap-x-3 items-center">
        <div className="avatar relative" onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={isUploading ? undefined : () => handleUpload()}>
          <picture>
            <img src={avatar} className="h-15 w-15 object-cover object-center rounded-full" />
          </picture>
          {isActive && (
            <div className="absolute w-4 h-4 bg-green-600 rounded-full right-0 bottom-0 border-white border-solid border-2"></div>
          )}
          {
            hover && groupChat?.key && (
              <span className="absolute top-1/2 left-1/2 flex justify-center items-center cursor-pointer text-white font-5xl h-15 w-15 rounded-full bg-[rgba(0,0,0,0.51)]" style={{ transform: 'translate(-50%, -50%' }}>
                <FaUpload />
              </span>
            )
          }
        </div>
        <div className="name flex flex-col gap-y-1">
          <p className="text-xl font-semibold">{name}</p>
          {
            groupChat?.key ? (
              <div className="text-sm opacity-65 flex gap-x-2">{
                participantsName?.map((name, idx, arr) => (
                  <div className="flex gap-x-0.5">
                    <span>{name}</span>
                    {
                      idx < arr.length - 1 && <span>,</span>
                    }
                  </div>
                ))
              }</div>
            ) : (
              <p className="text-sm opacity-65">{isActive ? "online" : lastSeen}</p>
            )
          }
        </div>
      </div>
      <span className="text-xl">
        <BsThreeDotsVertical />
      </span>
    </div>
  );
};

export default UserPart;
