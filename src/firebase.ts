"usw clientƒ";

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

console.log("apiKey", process.env.NEXT_PUBLIC_apiKey);

const firebaseConfig = {
  // apiKey: process.env.NEXT_PUBLIC_apiKey,
  // authDomain: process.env.NEXT_PUBLIC_authDomain,
  // projectId: process.env.NEXT_PUBLIC_projectId,
  // storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  // messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  // appId: process.env.NEXT_PUBLIC_appId,
  // measurementId: process.env.NEXT_PUBLIC_measurementId,
  apiKey: "1",
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
export { app, auth, firestore, storage };
