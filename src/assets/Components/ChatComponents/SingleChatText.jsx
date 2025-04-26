import React, { useState } from "react";
import { FetchUser } from "../../../utils/utils";

const SingleChatText = ({ recieved, textContent, deliveryTime, imageUrl, isGroupChat, senderId}) => {
  const [senderDetails, setSenderDetails] = useState({});

  const fetchSenderDetails = () => {
    if(!isGroupChat) return;
    FetchUser(senderId)
    .then(data => setSenderDetails(data))
  }
  fetchSenderDetails();

  return recieved ? (
    <div className="w-full flex flex-col gap-y-0.5 ">
      <span className={`py-2 px-3 rounded-md bg-[#f1f1f1] w-fit max-w-[50%] ${textContent === '' || textContent === null ? 'hidden' : ''}`}>
        {textContent || null}
      </span>
      {
        imageUrl && (
          <picture>
            <img src={imageUrl} alt="" className="max-w-100 max-h-100 object-center object-cover rounded-xl"/>
          </picture>
        )
      }
      <span className="text-sm opacity-50">{isGroupChat ? `sent by ${senderDetails?.userName || 'Missing'}` : ''} {deliveryTime}</span>
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
