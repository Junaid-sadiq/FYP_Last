import firebase from 'firebase';

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
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();
export { db, auth, storage, provider }


/* seedDatabase1(firebase); */