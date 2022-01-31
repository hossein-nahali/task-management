import firebase from "firebase/compat";
import 'firebase/database';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API,
    authDomain: process.env.REACT_APP_FB_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_URL,
    projectId: process.env.REACT_APP_FB_PROJECT,
    storageBucket: process.env.REACT_APP_FB_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_SENDER,
    appId: process.env.REACT_APP_FB_APP,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT
};

const app = firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const auth = getAuth(app);
export const taskRef = databaseRef.child("task")
export default firebase;
