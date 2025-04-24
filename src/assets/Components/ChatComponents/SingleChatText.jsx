import React from "react";

const SingleChatText = ({ recieved, textContent, deliveryTime, imageUrl}) => {
  return recieved ? (
    <div className="w-full flex flex-col gap-y-0.5 ">
      <span className="py-2 px-3 rounded-md bg-[#f1f1f1] w-fit max-w-[50%]">
        {textContent || null}
      </span>
      {
        imageUrl && (
          <picture>
            <img src={imageUrl} alt="" className="max-w-100 max-h-100 object-center object-cover"/>
          </picture>
        )
      }
      <span className="text-sm opacity-50">{deliveryTime}</span>
    </div>
  ) : (
    <div className="w-full flex flex-col gap-y-1 items-end">
      <span className="py-2 px-3 rounded-md bg-mainColor text-white  w-fit max-w-[50%] text-end">
        {textContent || null}
      </span>
      {
        imageUrl && (
          <picture>
            <img src={imageUrl} alt="" className="max-w-100 max-h-100 object-center object-cover"/>
          </picture>
        )
      }
      <span className="text-sm opacity-50">{deliveryTime}</span>
    </div>
  );
};

export default SingleChatText;
