import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLXKSOXTCK5R-C4_cJEALs6M4wi40G1es",
  authDomain: "laundry-application-843ea.firebaseapp.com",
  projectId: "laundry-application-843ea",
  storageBucket: "laundry-application-843ea.appspot.com",
  messagingSenderId: "758125621047",
  appId: "1:758125621047:web:7ff25d4272153fdcc774b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};