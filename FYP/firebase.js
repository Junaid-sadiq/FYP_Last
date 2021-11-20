import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { seedDatabase1 } from './app/data/seed/detailseed';
const firebaseConfig = {
  apiKey: "AIzaSyBSjvm9f57RNi8wa2cS7ZNNo74_nrebo-k",
  authDomain: "final-year-project-21.firebaseapp.com",
  projectId: "final-year-project-21",
  storageBucket: "final-year-project-21.appspot.com",
  messagingSenderId: "206929677529",
  appId: "1:206929677529:web:c42f377bbc13fa5a7102c8",
  measurementId: "G-395LML6LF7"
};
//initialize App
const firebase = Firebase.initializeApp(firebaseConfig);
//Populate the Database with Dummy data
/* seedDatabase1(firebase); */
const db = Firebase.firestore();
const auth = firebase.auth();

export { firebase, db, auth };

