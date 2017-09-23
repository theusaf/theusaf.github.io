// Initialize Firebase
var config = {
    apiKey: "AIzaSyDM0YKh4JZf8cohxMAr7q6-UsrJBjqngpc",
    authDomain: "drawephone.firebaseapp.com",
    databaseURL: "https://drawephone.firebaseio.com",
    projectId: "drawephone",
    storageBucket: "",
    messagingSenderId: "1028184834674"
};
firebase.initializeApp(config);

var chatData = firebase.database().ref();