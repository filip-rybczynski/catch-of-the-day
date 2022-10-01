import Rebase from "re-base"; // allows to mirror state to firebase
import firebase from "firebase";

// Values taken from the corresponding project in Firebase
const FIREBASE_APP_INIT_OPTIONS = {
  apiKey: "AIzaSyBED8Pk7YVzcGdFWO8NHAr-l2ANDXvc168",
  authDomain: "catch-of-the-day-by-filip.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-by-filip-default-rtdb.europe-west1.firebasedatabase.app",
}

// Configuring the application
const firebaseApp = firebase.initializeApp(FIREBASE_APP_INIT_OPTIONS);

// Rebase bindings to the firebase app
const base = Rebase.createClass(firebaseApp.database());

// for ease of reference
const appDB = firebaseApp.database();

// named export
export {firebaseApp, appDB};

// default export
export default base;
