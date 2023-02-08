import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_PUBLIC_FIRE_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// auth
export const signInEmail = async (
  email: string,
  password: string,
  name: string
) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res) => {
      updateProfile(auth.currentUser, {
        displayName: name,
      });
      return res;
    })
    .catch((error) => {
      const errorMessage = error.message;
      throw new Error("회원가입 에러" + errorMessage);
    });
};

export const logInEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorMessage = error.message;
    throw new Error("로그인 에러" + errorMessage);
  });
};

export const Logout = () => {
  signOut(auth).catch(console.error);
  localStorage.removeItem("userData");
};

export const onAuth = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    let updatedUser;
    if (user != null) {
      updatedUser = user;
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    } else if (user == null) {
      updatedUser = JSON.parse(localStorage.getItem("userData")) || {};
    }
    callback(updatedUser);
  });
};

export const writeUserData = async (
  userId: string,
  email: string,
  name: string
) => {
  return set(ref(database, "users/" + userId), {
    userId,
    email,
    name,
  });
};

// list
export const getUserList = async () => {
  return get(ref(database, `users`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
};

// group
export const getGroupList = async () => {
  return get(ref(database, `group`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val();
      return Object.keys(items);
    }
    return [];
  });
};

export const makeGroupChat = async (idx) => {
  return set(ref(database, `group/그룹채팅방${idx}`), Date.now());
};

export const setChatMsgInGroup = async (idx, uid, name, message) => {
  const stamp = Date.now();
  return set(ref(database, `group/그룹채팅방${idx}/${stamp}`), {
    uid,
    name,
    message,
  });
};

export const getGroupMsg = async (idx) => {
  return get(ref(database, `group/그룹채팅방${idx}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val();
      return Object.values(items);
    }
    return [];
  });
};

//1:1 chat
export const getMyChatList = async (myId) => {
  return get(ref(database, `chatRoom/${myId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val();
      return Object.entries(items);
    }
    return [];
  });
};

export const makeChatRoom = async (myId, myName, yourId, yourName) => {
  const stamp = Date.now();

  return get(ref(database, `chatRoom/${myId}/${yourId}@${yourName}`)).then(
    (snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        set(ref(database, `chatRoom/${myId}/${yourId}@${yourName}`), stamp);
        set(ref(database, `chatRoom/${yourId}/${myId}@${myName}`), stamp);
        return stamp;
      }
    }
  );
};

export const getChatMsg = async (roomId) => {
  return get(ref(database, `message/${roomId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val();
      return Object.values(items);
    }
    return [];
  });
};

export const setChatMsg = async (roomId, uid, name, message) => {
  const stamp = Date.now();
  return set(ref(database, `message/${roomId}/${stamp}`), {
    uid,
    name,
    message,
  });
};
