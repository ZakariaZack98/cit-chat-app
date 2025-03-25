import React from "react";
import SearchBar from "../../assets/Components/CommonComponents/SearchBar";
import { getNotificationData } from "../../lib/componentsData";
import NotificationCard from "../../assets/Components/CommonComponents/NotificationCard";

const Notifications = () => {
  const notificationData = getNotificationData();
  return (
    <div className="flex flex-col justify-between h-full">
      <SearchBar />
      <div className="bg-white shadow-xl rounded-2xl p-5 h-[92%] overflow-scroll">
        {
          notificationData?.map((item, idx) => {
            return (
              <div className={idx < notificationData.length - 1 ? 'border-b-gray-300 border-b-[1px]' : ''}>
                <NotificationCard key={item.id} message={item.message}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Notifications;
