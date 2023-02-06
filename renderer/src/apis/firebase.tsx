// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API,
  authDomain: process.env.NEXT_PUBLIC_FIRE_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE,
  projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const database = getDatabase();

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
    const info = { ...user, name: "종이" };
    console.log(info);
  });
}
// export const writeUserData = (userId, name, email) => {
//   set(ref(database, "users/" + userId), {
//     userId,
//     name,
//     email,
//   });
// };
