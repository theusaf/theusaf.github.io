function start(){
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
    };

    var rootData = firebase.database().ref();
    var key = 0;
    //confirm("this works?");
    
    var submitButton = document.getElementById("submit");
    var userNameInput = document.getElementById("user");
    var serverInput = document.getElementById("server");
    
    var gameID;
    submitButton.onclick = function(){
        gameID = serverInput.value;
    }
}
window.onload = start;