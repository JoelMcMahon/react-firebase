



import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDiUh5waxpdrE2IcOUJNr5x0jxXStyjGBY',
    authDomain: 'react-firebase-a5f3c.firebaseapp.com',
    databaseURL: 'https://react-firebase-a5f3c-default-rtdb.firebaseio.com/',
    projectId: 'react-firebase-a5f3c',
    storageBucket: 'react-firebase-a5f3c.appspot.com',
    messagingSenderId: '350150746842',
    appId: '1:350150746842:android:26c2299b60263a2f75fbe3',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };