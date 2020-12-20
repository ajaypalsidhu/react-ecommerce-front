import firebase from 'firebase/app';
import 'firebase/auth';

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA3eXQ_WsBpCM7OFnZnkAuxa2biB8hMNXA",
    authDomain: "ecommerce-2f56f.firebaseapp.com",
    databaseURL: "https://ecommerce-2f56f.firebaseio.com",
    projectId: "ecommerce-2f56f",
    storageBucket: "ecommerce-2f56f.appspot.com",
    messagingSenderId: "54461922302",
    appId: "1:54461922302:web:6734ff84f8419757429eaf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);   

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();