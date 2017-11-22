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
}