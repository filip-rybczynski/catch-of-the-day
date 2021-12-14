import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBED8Pk7YVzcGdFWO8NHAr-l2ANDXvc168",
  authDomain: "catch-of-the-day-by-filip.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-by-filip-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());

// named export
export {firebaseApp};

// default export
export default base;
