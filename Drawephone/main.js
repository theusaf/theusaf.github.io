//version 0.0.0.13

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
    
    //start data
    var fi = document.getElementById("fi");
    var sbu = document.getElementById("start");
    var sinfo = document.getElementById("theme");
    
    //connects to game?
    function loadGame(int){
        awayD1 = ("Game" + int); //idk
        var game = rootData.child("Game" + int); //shows game ur in
        var pD = ""; //stores player data
        game.once("value",function(s){
            if(s.val().Misc.Started === false){
                pD = s.val().Players;
                if(pD === "none"){
                    console.log("FIRST PLAYER!");
                    pD = "";
                    n = 0;
                    game.child("Players").set(gameName);
                    fi.style.display = "block";
                }else{
                    //WIP
                    game.child("Players").set(pD + "," + gameName);
                    n = pD.split(",").length + 1;
                }
            }
        });
        var plD = ""; //stores active player data
        game.child("Players").on("value",function(t){
            setTimeout(function(){ //Prevent player "None" from appearing in game?
                plD = t.val(); //player data
                var plDli = plD.split(",");
                var tab = document.getElementById("list");
                var nu = plD.split(",").length;
                tab.innerHTML = "";
                for(var i = 0; i < nu; i++){
                    tab.innerHTML += "<td style='display: block'>" + (i+1) + ". " + plDli[i] + "</td>\n";
                }
            },1000);
        });
        
        
        //tests if the game is started by player one
        var mes = document.getElementById("them");
        game.on("value",function(s){
            if(s.child("Misc").child("Started").val() === true){
                mes.innerText = "Game Started! Draw " + s.child("Misc").child("Theme").val();
                mes.style.display = "block";
            }
        });
        
        //start button scripts
        sbu.onmousedown = function(){
            game.child("Misc").child("Theme").set(sinfo.value);
            if(plD.split(",").length >= 3){
                game.child("Misc").child("Started").set(true);
            }else{
                alert("There are not enough players online. Press the button again to change the Theme or start the game");
            }
        }
    }
    
    //setup
    var n = 0; //your player id.
    var gameID;
    var inGame = false;
    var gameName;
    
    submitButton.onclick = function(){
        if(inGame === false && serverInput.value !== "Choose" && userNameInput.value !== "" && userNameInput.value !== "none" && userNameInput.value.search(",") === -1 && userNameInput.value.length < 20){
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
        }else{
            alert("Your username is not valid, or something is broken. Try with a new username, or reload the page");
        }
    };
    
    //read only data
    var awayD1 = -1;
    
    
    //remove player on unload. currently removes all players, causing loads of issues :p
    window.onbeforeunload = function(){
        rootData.child(awayD1).child("Players").set("none");
    }
}
window.onload = start;