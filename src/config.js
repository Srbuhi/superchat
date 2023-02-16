import { initializeApp } from "firebase/app";
import { getFirestore }  from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAhDTF4oBN7kZk_FwxJb14D9qD5_jqDxKQ",
    authDomain: "super-chat-4b8a2.firebaseapp.com",
    projectId: "super-chat-4b8a2",
    storageBucket: "super-chat-4b8a2.appspot.com",
    messagingSenderId: "331518370454",
    appId: "1:331518370454:web:dcfb876b2440f2074b18b7"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore();
  const auth = getAuth(app);

  export {firestore, auth};
