import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  databaseURL: process.env.REACT_APP_databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export const AddFriend = (info) => {
  const friendRef = ref(database, "friend/");
  const newFriendRef = push(friendRef);
  set(newFriendRef, {
    groupone: [...info],
  });
};

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [friendList, setFriendList] = useState();
  useEffect(() => {
    const friendRef = ref(database, "friendone/");

    onValue(friendRef, (snapshot) => {
      const data = snapshot.val();
      const friendsArray = [];

      for (let id in data) {
        friendsArray.push(data[id]);
      }
      setFriendList(friendsArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, friendList };
};

export const UpdateFriend = (info) => {
  const updates = {};
  updates["friendone/"] = info;
  return update(ref(database), updates);
};
