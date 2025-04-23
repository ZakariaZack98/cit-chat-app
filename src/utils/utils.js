import { push, ref } from "firebase/database";
import { db } from "../../Database/firebase";
import { toast } from "react-toastify";

export const SendFriendRequest = async (senderId, recieverId) => {
  const friendRequestRef = ref(db, `friendRequests/${senderId}`);
  const recieverFriendRequestRef = ref(db, `recievedFriendRequests/${recieverId}`);
  console.log('success', senderId, recieverId);
  await Promise.all([
    push(friendRequestRef, {
      recieverId,
      senderId,
      createdAt: new Date().toISOString(),
    }),
    push(recieverFriendRequestRef, {
      recieverId,
      senderId,
      createdAt: new Date().toISOString(),
    })
  ])
  .then(() => toast.success('Friend Request Sent.'))
  .catch(err => toast.error('Friend Request Failed'))
};