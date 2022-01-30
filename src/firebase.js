import firebase from "firebase/compat";
import 'firebase/database';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBw3TvzFRmTN0ylaUMsfaVg0Ady7jt58mM",
    authDomain: "task-b3792.firebaseapp.com",
    databaseURL: "https://task-b3792-default-rtdb.firebaseio.com",
    projectId: "task-b3792",
    storageBucket: "task-b3792.appspot.com",
    messagingSenderId: "485912114351",
    appId: "1:485912114351:web:4e99261d1bd1d299dbd05a",
    measurementId: "G-PN8K8G6CYQ"
};

const app = firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const auth = getAuth(app);
export const taskRef = databaseRef.child("task")
export default firebase;
