//titlecolors
var tit = document.getElementsByTagName("h1")[0];
window.onload = function(){
    var color = "";
    var color2 = "";
    var r2;
    var g2;
    var b2;
    var n = 250;
    var r = 0;
    var g = 0;
    var b = 0;
    var hi = setInterval(function(){
        //red first
        if(g === 0 && b === 0 && r !== 255){
            r += 1;
            r2 = r + n;
        }else{
            //yellow
            if(r === 255 && b === 0 && g !== 255){
                g += 1;
                g2 = g + n;
            }else{
                //green
                if(g === 255 && r >= 1 && b === 0){
                    r -= 1;
                    r2 = r + n;
                }else{
                //blue
                if(g >= 1 && r === 0){
                    g -= 1;
                    b += 1;
                    g2 = b + n;
                    b2 = b + n;
                    }else{ //purple
                        if(g === 0 && b >= 1){
                            b -= 1;
                            r += 1;
                            b2 = b + n;
                            r2 = r + n;
                        }
                    }
                }
            }
        }
        color = "rgb(" + r + "," + g + "," + b + ")";
        color2 = "rgb(" + (r2) + "," + (g2) + "," + (b2) + ")";
        tit.style["background-image"] = "linear-gradient(to left, " + color + "," + color2+")";
    },10);
};

//game code start
function begin(){
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDMXzhvRImJVnht7BdXdduXKBUpOONyID8",
        authDomain: "chat-62a58.firebaseapp.com",
        databaseURL: "https://chat-62a58.firebaseio.com",
        projectId: "chat-62a58",
        storageBucket: "chat-62a58.appspot.com",
        messagingSenderId: "589207331645"
    };
    firebase.initializeApp(config);
    var ref = firebase.database().ref();
    
    //game loading variables
    var party = ref.child("Parties");
    var isCreating = null;
    
    //short function :p
    var loc = window.location.href.split("?");
    function next(){
        window.location.replace(loc[0]);
    }
    
    //check the url for "?" and see if syntax is safe.
    var keys;
    function test(){
        var n = 0;
        var s = "";
        //deals with my preview url
        if(window.location.host === "preview.c9users.io"){
            n = 1;
            loc[0] = loc[0] + "?_c9_id=livepreview1&_c9_host=https://ide.c9.io";
        }
        if(loc.length > (2+n)){
            alert("invalid URL error (#1), please try again");
            next();
            return "error";
        }
        keys = loc[(1+n)].split("&");
        if(keys.length > 2 || keys.length < 2){
            alert("Argument error. 2 arguments required, but one or more present (#4), please try again");
            next();
            return "error";
        }
        if(keys[0].split("=")[0] !== "action" || keys[1].split("=")[0] !== "key"){
            alert("Unknown variable error (#2), please try again");
            next();
            return "error";
        }
        if(keys[0].split("=")[1] != "create" && keys[0].split("=")[1] != "join"){
            alert("Invalid action (#3), please try again");
            next();
            return "error";
        }
        if(keys[1].split("=")[1] == "none"){
            alert("invalid key error (#5), please try again");
            next();
            return "error";
        }
        var nice = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0"]; //nice characters
        var isnice = false;
        for(var i in keys[1].split("=")[1].toLowerCase()){
            var st = keys[1].split("=")[1].toLowerCase()[i];
            isnice=false;
            for(var j in nice){
                if(st == nice[j]){
                    isnice = true;
                }
            }
        }
        if(isnice === false){
            alert("Invalid key error (#5), please try again");
            next();
            return "error";
        }
        
        //since the syntax passed the syntax test, determine whether joining or not joining.
        if(keys[0].split("=")[1] == "create"){
            isCreating = true;
        }else{
            isCreating = false;
        }
        return "success";
    }
    test();
    
    //begin loading data
    var pkey = keys[1].split("=")[1];
    switch (isCreating) {
        case true:
            party.once('value',function(p){
                var res = p.hasChild(pkey);
                if(res === true){
                    alert("Invalid key. Key is in use by another party. Please try again.");
                    next();
                    return "key in use";
                }else{
                    var username = prompt("What would you like to be called","insert username here");
                    var basicobj = {
                        Data:[
                            {//placeholder. makes sure that the data is actually added.
                                user: username,
                                Troops:[{type:"warrior",pos:[0,1,2],ispromoted:false,health:10,topromote:3}]//will be updated
                            }
                        ],
                        Map: "",//map object will be generated after start
                        Players: [username], //more will be added
                        Theme: "default", //can be set after. this is just basic stuff
                        Type: "Might"
                    };
                    party.child(pkey).set(basicobj);
                }
            });
            break;
        case false:
            
            break;
        default:
            alert("An unknown error occured. try again");
            next();
            return "error";
    }
}
begin();