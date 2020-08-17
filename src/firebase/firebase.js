import firebase from "firebase";
import * as secrets from "./secrets.json";

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

const { apiKey, authDomain, projectId, databaseUrl } = secrets;

// Initialize Firebase
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  databaseURL: databaseUrl,
};

export default firebase;
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
