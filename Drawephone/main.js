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
    key = 0;
    //confirm("this works?");
    
    var submitButton = document.getElementById("submit");
    var userNameInput = document.getElementById("user");
    var serverInput = document.getElementById("server");
    
    //connects to game?
    function loadGame(int){
        var game = rootData.child("Game" + int);
        var pD = "";
        game.once("value",function(s){
            if(s.val().Misc.Started === false){
                pD = s.val().Players;
                if(pD === "none"){
                    console.log("FIRST PLAYER!");
                    pD = "";
                    n = 0;
                    game.child("Players").set(gameName);
                }else{
                    //WIP
                    game.child("Players").set(pD + "," + gameName);
                    n = pD.split(",").length + 1;
                }
            }
        });
    }
    
    //setup
    var n = 0;
    var gameID;
    var inGame = false;
    var gameName;
    submitButton.onclick = function(){
        if(inGame === false && userNameInput.value !== "" && userNameInput.value.search(",") === -1){
            inGame = true;
            gameID = serverInput.value;
            gameName = userNameInput.value;
            if(gameID === "Game1"){
                loadGame(1);
            }else if(gameID === "Game2"){
                loadGame(2);
            }else if(gameID === "Game3"){
                loadGame(3);
            }
        }
    };
}
window.onload = start;