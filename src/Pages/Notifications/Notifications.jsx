import React, { useContext, useEffect } from "react";
import SearchBar from "../../assets/Components/CommonComponents/SearchBar";
import NotificationCard from "../../assets/Components/CommonComponents/NotificationCard";
import { auth, db } from "../../../Database/firebase";
import { onValue, ref } from "firebase/database";
import moment from "moment";
import { ChatContext } from "../../contexts/ChatContext";

const Notifications = () => {
  const {notificationsData, setNotificationsData} = useContext(ChatContext);

  useEffect(() => {
    const notificationsRef = ref(db, `notifications/${auth.currentUser.uid}`)
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const updatedNotifications = [];
      if(snapshot.exists()) {
        snapshot.forEach(notification => {
          updatedNotifications.push(notification.val());
        })
      }
      setNotificationsData(updatedNotifications);
    })
    return () => unsubscribe();
  }, [auth.currentUser.uid, db])

  return (
    <div className="flex flex-col justify-between h-full">
      <SearchBar />
      <div className="bg-white shadow-xl rounded-2xl p-5 h-[92%] overflow-scroll">
        {
          notificationsData?.map((notification, idx) => {
            return (
              <div className={idx < notificationsData.length - 1 ? 'border-b-gray-300 border-b-[1px]' : ''}>
                <NotificationCard key={notification.createdAt} message={notification.message} time={moment(notification.createdAt).fromNow()}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default Notifications;
