import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

export const signInEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password).catch(
    (error) => {
      const errorMessage = error.message;
      throw new Error("회원가입 에러" + errorMessage);
    }
  );
};

export const logInEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password).catch((error) => {
    const errorMessage = error.message;
    throw new Error("로그인 에러" + errorMessage);
  });
};

export function Logout() {
  signOut(auth).catch(console.error);
}

export function onAuth(callback) {
  onAuthStateChanged(auth, async (user) => {
    // 유저 이름 추가하기
    const updatedUser = user ? await getUserName(user) : null;
    callback(updatedUser);
  });
}

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

export const writeUserData = (userId: string, email: string, name: string) => {
  set(ref(database, "users/" + userId), {
    userId,
    email,
    name,
  });
};

export async function getUserList() {
  return get(ref(database, `users`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
}
