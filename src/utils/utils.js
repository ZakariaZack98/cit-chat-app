import { onValue, push, ref, remove, get, set } from "firebase/database";
import { auth, db } from "../../Database/firebase";
import { toast } from "react-toastify";

/**
 * TODO: (HELPER) FIND THE KEY OF A RECORD USING A CERTAIN FIELD VALUE THAT MATCH WITH THE GIVEN FIELD VALUE===============
 * @param {snapshot, field, value} (field = the name of the property in the record, value= the given value)
 * @returns {key} string containing the target field's key
 * */ 
export const FindKeyByField = (snapshot, field, value) => {
  let key = null;
  snapshot.forEach(record => {
    if (record.val()[field] === value) key = record.key;
  });
  return key;
};


/**
 * TODO: SEND A FRIEND REQUEST AND ADD A RECORD ON BOTH USER'S SIDE========================================================
 * @param {senderId, recieverId} string containing the current user id and to whom request is being send
 * @returns null
 * */ 
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


/**
 * TODO: CANCEL FRIEND REQUEST AND REMOVE RECORDS FROM BOTH USER'S SIDE====================================================
 * @param {senderId, recieverId} string containing the current user id and to whom request is being send
 * @returns null
 * */ 
export const CancelFriendRequest = async (senderId, recieverId, exception) => {
  try {
    const friendRequestRef = ref(db, `friendRequests/${senderId}`);
    const recieverFriendRequestRef = ref(db, `recievedFriendRequests/${recieverId}`);

    const senderSnapshot = await get(friendRequestRef);
    const recieverSnapshot = await get(recieverFriendRequestRef);

    const senderSideRecordKey = FindKeyByField(senderSnapshot, "recieverId", recieverId);
    const recieverSideRecordKey = FindKeyByField(recieverSnapshot, "senderId", senderId);

    if (!senderSideRecordKey || !recieverSideRecordKey) {
      toast.error('Friend request not found');
      return;
    }

    await Promise.all([
      remove(ref(db, `friendRequests/${senderId}/${senderSideRecordKey}`)),
      remove(ref(db, `recievedFriendRequests/${recieverId}/${recieverSideRecordKey}`))
    ]);
    !exception ? toast.warn('Friend request removed.') : null
  } catch {
    toast.error('Error cancelling friend request');
  }
};

/**
 * TODO: CANCEL FRIEND REQUEST AND REMOVE RECORDS FROM BOTH USER'S SIDE====================================================
 * @param {senderId, recieverId} string containing the current user id and to whom request is being send
 * @returns null
 * */ 
export const AddToFriendlist = async senderId => {
  const friendListRef = ref(db, `friendList/${auth.currentUser.uid}/${senderId}`);
  try {
    await Promise.all([
      set(friendListRef, {
        userId: senderId,
        createdAt: new Date().toISOString()
      }),
      CancelFriendRequest(senderId, auth.currentUser.uid, true)
    ])
    toast.success('Added to friendlist.')
  } catch (error) {
    toast.error('Error adding friend', error.message)
  }
}