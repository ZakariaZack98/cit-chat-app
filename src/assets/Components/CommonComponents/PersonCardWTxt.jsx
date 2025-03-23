import React from "react";

const PersonCardWTxt = ({ avatar, name, subText, sideText }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="leftPart flex justify-center items-center gap-x-2">
        <picture>
          <img
            src={avatar}
            className="w-[50px] h-[50px] object-cover rounded-full"
          />
        </picture>
        <div className="namePart">
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{subText}</p>
        </div>
      </div>
      <p className="opacity-50 text-sm">{sideText}</p>
    </div>
  );
};

export default PersonCardWTxt;
