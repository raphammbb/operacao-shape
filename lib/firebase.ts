import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVM5HoMPEf9xbivUAbSz1DgSew_xrr8jo",
  authDomain: "barriguinha-e4eb7.firebaseapp.com",
  projectId: "barriguinha-e4eb7",
  storageBucket: "barriguinha-e4eb7.firebasestorage.app",
  messagingSenderId: "70860660866",
  appId: "1:70860660866:web:dc1478c69ad736032cd49b",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
