import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";
import { isReadable } from "stream";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_PUBLIC_FIRE_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export const signInEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).catch(
    (error) => {
      const errorMessage = error.message;
      throw new Error("회원가입 에러" + errorMessage);
    }
  );
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
      updatedUser = user ? await getUserName(user) : user;
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    } else if (user == null) {
      updatedUser = JSON.parse(localStorage.getItem("userData")) || {};
    }
    callback(updatedUser);
  });
};

export const getUserName = async (user) => {
  const { uid } = user;
  return get(ref(database, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const name = snapshot.val().name;
      return { ...user, name };
    }
    return { ...user, name: "익명" };
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

export const getUserList = async () => {
  return get(ref(database, `users`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
};

// FIXME: uuid 말고 다른 방법 생각하기
export const makeChatRoom = async (
  id: string,
  userId: string,
  otherId: string
) => {
  return set(ref(database, "chatRoom/" + userId), {
    chatRoom: id,
    me: userId,
    other: otherId,
  });
};

export const getGroupList = async () => {
  return get(ref(database, `group`)).then((snapshot) => {
    if (snapshot.exists()) {
      const items = snapshot.val();
      return Object.values(items);
    }
    return [];
  });
};

export const makeGroupChat = async () => {
  return;
};
