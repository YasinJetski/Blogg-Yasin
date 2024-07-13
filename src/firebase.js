import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD3GGLrN3gn5o9NKJ33q1M4AeH67nf-Xps",
    authDomain: "blogg-yasin.firebaseapp.com",
    projectId: "blogg-yasin",
    storageBucket: "blogg-yasin.appspot.com",
    messagingSenderId: "735391295445",
    appId: "1:735391295445:web:a0c0717dbae7722910ff5c"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
