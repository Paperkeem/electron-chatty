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

export function onAuth() {
  onAuthStateChanged(auth, async (user) => {
    // 유저 이름 추가하기
    // const updatedUser = user ? await adminUser(user) : null;
    // callback(updatedUser);
    const info = { ...user };
    console.log(info);
  });
}
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
    console.log(items);
    return Object.values(items);
  });
}
