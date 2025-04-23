import { onValue, push, ref, remove, get } from "firebase/database";
import { db } from "../../Database/firebase";
import { toast } from "react-toastify";

export const SendFriendRequest = async (senderId, recieverId) => {
  const friendRequestRef = ref(db, `friendRequests/${senderId}`);
  const recieverFriendRequestRef = ref(db, `recievedFriendRequests/${recieverId}`);
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
  .catch(err => toast.error('Friend Request Failed', err))
};

export const CancelFriendRequest = async (senderId, recieverId) => {
  try {
    const friendRequestRef = ref(db, `friendRequests/${senderId}`);
    const recieverFriendRequestRef = ref(db, `recievedFriendRequests/${recieverId}`);

    const findKeyByField = (snapshot, field, value) => {
      let key = null;
      snapshot.forEach(record => {
        if (record.val()[field] === value) key = record.key;
      });
      return key;
    };

    const senderSnapshot = await get(friendRequestRef);
    const recieverSnapshot = await get(recieverFriendRequestRef);

    const senderSideRecordKey = findKeyByField(senderSnapshot, "recieverId", recieverId);
    const recieverSideRecordKey = findKeyByField(recieverSnapshot, "senderId", senderId);

    if (!senderSideRecordKey || !recieverSideRecordKey) {
      toast.error('Friend request not found');
      return;
    }

    await Promise.all([
      remove(ref(db, `friendRequests/${senderId}/${senderSideRecordKey}`)),
      remove(ref(db, `recievedFriendRequests/${recieverId}/${recieverSideRecordKey}`))
    ]);
    toast.success('Friend request cancelled');
  } catch {
    toast.error('Error cancelling friend request');
  }
};