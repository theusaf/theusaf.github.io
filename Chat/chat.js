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
    var users = [];
    var userPos = [];
    /*
    User data is submitted as such:
    "username":{
        type: "user",
        name: name,
        message: "message", //reset to "" after 1 second when sent.
        x: x,
        y: y,
        online: bool,//detected with document.hasFocus()
        op: bool, //if person is op :p (can /kick ppl)
        inv: array,
        health: num,
        armor:[feet,legs,chest,head],
        weapon: weapon,
        money: int
    },
    "item":{
        type: "item",
        item: "item",
        count: int,
        x: int
    }
    
    Commands:
    kick <player> <reason(optional)>- attacks a specified person -- *Kicks player* *Kicks player for being a duck*
    /kick <player> <reason(optional)> - kicks specified person off the game (possible abuse?)
    punch <player> <reason(optional)> - same as kick
    yell <text> - game will remove yell and instead cap and bold text
    whisper <text> - game will shrink text size
    message <player> <text> - specified player can see message
    eat <text>
    /showstats - shows stats on sidebar
    /hidestats - hides stats on sidebar
    WASD - move (w = jump. s = crouch)
    enter - chat
    attack <player> - attacks specified player using current weapon
    /inv - shows inventory
    loadvehicle <vehicle> - loads vehcile from inv
    selectweapon <weapon> - loads weapon from inv
    reload - reloads (can be hacked :p)
    upupdowndownleftrightleftrightba (typed) - makes you invincible for 1 minute
    throw <item:hand> <item> <count> - throws selected item or specific item on ground. default throws all.
    select <item> - selects item from inv
    
    Rules:
    - 
    
    Map: (the area)
    */
}