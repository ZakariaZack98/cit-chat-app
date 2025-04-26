import React, { useState } from "react";
import { FetchUser } from "../../../utils/utils";
import { GoDotFill } from "react-icons/go";

const SingleChatText = ({ recieved, textContent, deliveryTime, imageUrl, isGroupChat, senderId}) => {
  const [senderDetails, setSenderDetails] = useState({});

  const fetchSenderDetails = () => {
    if(!isGroupChat) return;
    FetchUser(senderId)
    .then(data => setSenderDetails(data))
  }
  fetchSenderDetails();

  return recieved ? (
    <div className="flex gap-x-2 my-2">
      {
        isGroupChat && <picture>
          <img src={senderDetails?.profile_picture} className="h-10 w-10 rounded-full translate-y-1" alt="" />
        </picture>
      }
      <div className={`w-full flex flex-col gap-y-0.5 ${isGroupChat ? 'flex-col-reverse' : ''}`}>
      <span className={`py-2 px-3 rounded-md bg-[#dbdbdb] w-fit max-w-[50%] ${textContent === '' || textContent === null ? 'hidden' : ''}`}>
        {textContent || null}
      </span>
      {
        imageUrl && (
          <picture>
            <img src={imageUrl} alt="" className="max-w-100 max-h-100 object-center object-cover rounded-xl"/>
          </picture>
        )
      }
      <div className="flex items-center gap-x-1">
      <span className="font-semibold text-sm">{isGroupChat ? `${senderDetails?.userName || 'Missing'}` : ''}</span> <GoDotFill /> <span className="text-sm opacity-50">{deliveryTime}</span>
      </div>
    </div>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-y-1 items-end">
      <span className={`py-2 px-3 rounded-md bg-mainColor text-white  w-fit max-w-[50%] text-end  ${textContent === '' || textContent === null ? 'hidden' : ''}`}>
        {textContent || null}
      </span>
      {
        imageUrl && (
          <picture>
            <img src={imageUrl} alt="" className="max-w-100 max-h-100 object-center object-cover rounded-xl"/>
          </picture>
        )
      }
      <span className="text-sm opacity-50">{deliveryTime}</span>
    </div>
  );
};

export default SingleChatText;
