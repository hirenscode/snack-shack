import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyAElZmctppPqFyUcPVwfmx2kaEV5fs9Zj0",
//     authDomain: "vishals-snack-shack.firebaseapp.com",
//     databaseURL: "https://vishals-snack-shack.firebaseio.com",
//     projectId: "vishals-snack-shack",
//     storageBucket: "vishals-snack-shack.appspot.com",
//     messagingSenderId: "24993547713",
//     appId: "1:24993547713:web:4c23f4f1bf20c53ac09b40"
// };

const firebaseConfig = {
    apiKey: "AIzaSyAElZmctppPqFyUcPVwfmx2kaEV5fs9Zj0",
    authDomain: "vishals-snack-shack.firebaseapp.com",
    databaseURL: "https://vishals-snack-shack.firebaseio.com",
    projectId: "vishals-snack-shack",
    storageBucket: "vishals-snack-shack.appspot.com",
    messagingSenderId: "24993547713",
    appId: "1:24993547713:web:4c23f4f1bf20c53ac09b40"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
