import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyCe1UePFcEPLzU-yUf3dFD2HoptHr5HAIc",
    authDomain: "fir-db-20548.firebaseapp.com",
    databaseURL: "https://fir-db-20548.firebaseio.com",
    projectId: "fir-db-20548",
    storageBucket: "fir-db-20548.appspot.com",
    messagingSenderId: "914454705257"
  };
firebase.initializeApp(config);

export default firebase;