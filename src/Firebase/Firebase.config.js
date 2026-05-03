import React from 'react';

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS6GYNa7ZBuepjndmKJpvg04ED6GGbijs",
  authDomain: "habit-tracker-ff102.firebaseapp.com",
  projectId: "habit-tracker-ff102",
  storageBucket: "habit-tracker-ff102.firebasestorage.app",
  messagingSenderId: "8457975253",
  appId: "1:8457975253:web:c5f4032f6513613eafb95c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;