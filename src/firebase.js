import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "<API-KEY>",
    authDomain: "<PROJECT-ID>.firebaseapp.com",
    databaseURL: "https://<PROJECT-ID>.firebaseio.com",
    projectId: "<PROJECT-ID>",
    storageBucket: "<PROJECT-ID>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
    appId: "<APP_ID>"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
