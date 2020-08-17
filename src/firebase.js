import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDudZwUmnLW9bhjVNKvAaSFKOIq-qtOt8E",
    authDomain: "snack-shack-test.firebaseapp.com",
    databaseURL: "https://snack-shack-test.firebaseio.com",
    projectId: "snack-shack-test",
    storageBucket: "snack-shack-test.appspot.com",
    messagingSenderId: "645218517573",
    appId: "1:645218517573:web:45ac65a77e13c0ca38592c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
