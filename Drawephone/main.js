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
//Data
var key;
window.onmousedown = function(e){
    if(e.key === "Enter"){
        key = "enter";
    }
}
var start = function(){
    var gameData = firebase.database().ref();
    var key = 0;
};