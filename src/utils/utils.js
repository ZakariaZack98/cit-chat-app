import { push, ref, remove, get, set } from "firebase/database";
import { auth, db } from "../../Database/firebase";
import { toast } from "react-toastify";
import moment from "moment";

//* TIME FORMATTER HELPER FUNCTION ===================
export const GetTimeNow = () => {
  return moment().format("MM DD YYYY hh:mm:ss a");
};

/**
 * TODO: (HELPER) FIND THE KEY OF A RECORD USING A CERTAIN FIELD VALUE THAT MATCH WITH THE GIVEN FIELD VALUE===============
 * @param {snapshot, field, value} (field = the name of the property in the record, value= the given value)
 * @returns {key} string containing the target field's key
 * */
export const FindKeyByField = (snapshot, field, value) => {
  let key = null;
  snapshot.forEach((record) => {
    if (record.val()[field] === value) key = record.key;
  });
  return key;
};

/**
 * TODO: (HELPER) FETCH A USER'S LATEST INFO USING USERID =============================================================
 * @param {userId} string containing target user's uid
 * @return {object} containing user's latest info
 * */
export const FetchUser = async (userId) => {
  const userRef = ref(db, `users/${userId}`);
  try {
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      return userSnapshot.val();
    }
    return null;
  } catch (error) {
    console.error("User data fetch failed", error.message);
  }
};

/**
 * TODO: SEND A FRIEND REQUEST AND ADD A RECORD ON BOTH USER'S SIDE========================================================
 * @param {senderId, recieverId} string containing the current user id and to whom request is being send
 * @returns null
 * */
export const SendFriendRequest = async (senderId, recieverId) => {
  const friendRequestRef = ref(db, `friendRequests/${senderId}`);
  const recieverFriendRequestRef = ref(
    db,
    `recievedFriendRequests/${recieverId}`
  );
  const notificationRef = ref(db, `notifications/${recieverId}`);
  await Promise.all([
    push(friendRequestRef, {
      recieverId,
      senderId,
      createdAt: GetTimeNow(),
    }),
    push(recieverFriendRequestRef, {
      recieverId,
      senderId,
      createdAt: GetTimeNow(),
    }),
    push(notificationRef, {
      message: `${auth.currentUser.displayName} sent you a friend request.`,
      createdAt: GetTimeNow(),
    }),
  ])
    .then(() => toast.success("Friend Request Sent."))
    .catch((err) => toast.error("Friend Request Failed", err));
};

/**
 * TODO: CANCEL FRIEND REQUEST AND REMOVE RECORDS FROM BOTH USER'S SIDE====================================================
 * @param {senderId, recieverId} string containing the current user id and to whom request is being send
 * @returns null
 * */
export const CancelFriendRequest = async (senderId, recieverId, exception) => {
  try {
    const friendRequestRef = ref(db, `friendRequests/${senderId}`);
    const recieverFriendRequestRef = ref(
      db,
      `recievedFriendRequests/${recieverId}`
    );

    const senderSnapshot = await get(friendRequestRef);
    const recieverSnapshot = await get(recieverFriendRequestRef);

    const senderSideRecordKey = FindKeyByField(
      senderSnapshot,
      "recieverId",
      recieverId
    );
    const recieverSideRecordKey = FindKeyByField(
      recieverSnapshot,
      "senderId",
      senderId
    );

    if (!senderSideRecordKey || !recieverSideRecordKey) {
      toast.error("Friend request not found");
      return;
    }

    await Promise.all([
      remove(ref(db, `friendRequests/${senderId}/${senderSideRecordKey}`)),
      remove(
        ref(db, `recievedFriendRequests/${recieverId}/${recieverSideRecordKey}`)
      ),
    ]);
    !exception ? toast.warn("Friend request removed.") : null;
  } catch {
    toast.error("Error cancelling friend request");
  }
};

/**
 * TODO: ADD TO FRIENDLIST & REMOVE RECORD OF FRIEND REQUEST (FROM BOTH SIDE) ====================================================
 * @param {senderId} string containing the user id who sent the friend request
 * @returns null
 * */
export const AddToFriendlist = async (senderId) => {
  const friendListRef = ref(
    db,
    `friendList/${auth.currentUser.uid}/${senderId}`
  );
  const sendersFriendListRef = ref(
    db,
    `friendList/${senderId}/${auth.currentUser.uid}`
  );
  const notificationRef = ref(db, `notifications/${senderId}`);
  try {
    await Promise.all([
      set(friendListRef, {
        userId: senderId,
        createdAt: GetTimeNow(),
      }),
      set(sendersFriendListRef, {
        userId: auth.currentUser.uid,
        createdAt: GetTimeNow(),
      }),
      push(notificationRef, {
        message: `${auth.currentUser.displayName} accepted your friend request.`,
        createdAt: GetTimeNow(),
      }),
      CancelFriendRequest(senderId, auth.currentUser.uid, true), //? Removes the friend req without triggering toast
    ]);
    toast.success("Added to friendlist.");
  } catch (error) {
    toast.error("Error adding friend", error.message);
  }
};


/**
 * TODO: CREATE A GROUP CHAT REF IN DATABASE AND ADD FRIENDS TO GROUP CHAT ===========================================
 * @param {groupDetails} object containing group name, key, participants etc
 * @return void
 * */ 
export const AddToGroupChat = async (groupDetails) => {
  if (groupDetails.participantsIds.length < 3) {
    toast.warn('You have to add atleast 2 people to start a group conversation');
    return;
  }
  if(groupDetails.groupName.length === 0) {
    toast.warn('Please enter a name for the group chat');
    return;
  }
  const promises = [];
  groupDetails.participantsIds.forEach(id => {
    const associationRef = ref(db, `userAssociations/${id}/groupChats`);
    const userPromise = push(associationRef, {
      groupName: groupDetails.groupName,
      key: groupDetails.key,
      createdAt: groupDetails.createdAt
    })
    promises.push(userPromise);
  })
  try {
    await Promise.all(promises)
    toast.success('Group chat created')
  } catch(err) {
    toast.error(`Creating group chat failed, ${err.message}`)
  }
}
