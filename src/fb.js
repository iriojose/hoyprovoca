import firebase from 'firebase';

var firebaseConfig= {
    apiKey:"AIzaSyB431ZONa59Qxgn_te9cjFWXI8HvHy8b4k",
    authDomain:"aftim-3aab3.firebaseapp.com",
    databaseURL:"https//aftim-3aab3.firebaseio.com",
    projectId:"aftim-3aab3",
    storageBucket:"aftim-3aab3.appspot.com",
    messagingSenderId:"485521486790",
    appId:"1:485521486790",
    measurementId:"G-F90210K1MY"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();