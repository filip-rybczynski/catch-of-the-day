import firebase from "firebase";
import { AvailableProviders } from "./components/Inventory/types";

// Values taken from the corresponding project in Firebase
const FIREBASE_APP_INIT_OPTIONS = {
  apiKey: "AIzaSyBED8Pk7YVzcGdFWO8NHAr-l2ANDXvc168",
  authDomain: "catch-of-the-day-by-filip.firebaseapp.com",
  databaseURL:
    "https://catch-of-the-day-by-filip-default-rtdb.europe-west1.firebasedatabase.app",
}

// Configuring the application
const firebaseApp = firebase.initializeApp(FIREBASE_APP_INIT_OPTIONS);

// for ease of reference
const appDB = firebaseApp.database();
const appAuth = firebaseApp.auth();

// named exports
export {firebaseApp, appDB, appAuth};

// Constants
export const AUTH_PROVIDERS: AvailableProviders[] = ["Github", "Facebook", "Google"];

export default firebase;
