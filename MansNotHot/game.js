//audio
var Loop4Min = new Audio("res/loop4.mp3"); //256 seconds

var introScene = {
    variations: false,
    start: 0,
    end: 49
};
var Maff = {
    variations: false,
    start: 64.5,
    end: 68
};
var MansNotHot = {
    variations: true,
    values: [
        {
            start: 107.5,
            end: 110
        },
        {
            start: 113,
            end: 114.8
            
        }
    ]
};
var SpinJaw = {
    variations: false,
    start: 134,
    end: 135.3
};
var Sauce = {
    variations: false,
    start: 140,
    end: 146
};
var Ting = {
    variations: true,
    values: [
        {
            start: 150,
            end: 153
        },
        {
            start: 153.3,
            end: 155
        },
        {
            start: 155,
            end: 157
        }
    ]
};
var Statistacs = {
    variations: false,
    start: 36.7,
    end: 38
};
var isPlaying = {
    introScene: false,
    Maff: false,
    Ting: false,
    Sauce: false,
    SpinJaw: false,
    MansNotHot: false,
    Statistacs: false
};

function play(s,e,opt){
    var a = new Audio("res/main.mp3");
    a.currentTime = s;
    a.play();
    
    function b(){
        if(a.currentTime >= e){
            a.pause();
            a.removeEventListener('timeupdate',b);
        }
    }
    a.addEventListener('timeupdate',b);
    
    //'start'
    function d(){
        a.pause();
        canvas.removeEventListener('click',d);
    }
    function f(){
        isPlaying.introScene = false;
        a.removeEventListener('pause',f);
        begin();
    }
    
    if(opt === 'start'){
        canvas.addEventListener('click',d);
        a.addEventListener('pause',f);
    }
}

//random vars
window['adminPause'] = false;
var keys = {};
window.onkeyup = window.onkeydown = function(e){
    e = e || e.which;
    keys[e.key] = e.type == 'keydown';
};

var md = false;

window.onmousedown = window.onmouseup = function(e){
    e = e || e.which;
    md = e.type == 'mousedown';
};

function obj(name,startx,starty,hitx,hity,hashitbox,deg,fire){
    this.name = name;
    this.x = startx;
    this.y = starty;
    this.hitbox = [hitx,hity];
    this.hasHitBox = hashitbox;
    this.aim = deg;
    this.power = fire;
}

//canvas
var canvas = document.getElementById('game');

Loop4Min.play();
var runLoop = setInterval(function(){
    if(Loop4Min.currentTime >= 256){
        Loop4Min.currentTime = 0;
    }
    if(isPlaying.introScene || /*global adminPause*/ adminPause == true){
        Loop4Min.pause();
    }else if(Loop4Min.paused == true){
        Loop4Min.play();
    }
});

//drawing stuff
var c = canvas.getContext('2d');

function lo(){
    c.font = "100px 'Indie Flower', cursive";
    c.fillText("Start",400,300);
    canvas.addEventListener('click',wait);
}
lo();

function wait(){
    c.clearRect(0,0,1000,800);
    start();
    canvas.removeEventListener('click',wait);
}


var renderCanvas = setInterval(
    function(){
        //floor
        c.fillStyle = 'green';
        c.fillRect(0,500,1000,100);
        
    }
);

//game
function start(){
    //play intro
    isPlaying.introScene = true;
    play(introScene.start,introScene.end,'start');
}

var scx = 0;
//Note: Scaling Images Works, but You will need to fix the x and y

var playerY = 0;
var speed = 0;
var score = 0;
var temp = 0 /*degrees?*/;

var objects = [];

var spawnChances = {
    enemies: .7,
    ice: .8,
    block: .4,
    powerup: .05,
    lava: .5
};

function add(e){
    var l;
    if(e == "enemies"){
        l = new obj("turret",1100,0,20,20,true,Math.random()*45,Math.random()*5);
        objects.push(l);
    }
}

function doSpawns(){
    var n = Math.random();
    for(var i in spawnChances){
        if(spawnChances[i] <= n){
            add(i);
        }
    }
}

var oge = setInterval(function(){
    
},10);

function begin(){
    objects = [];
    speed = 0;
    //game engine
    var ge = setInterval(function(){
        /*plan:
        objects generated at x/y values. a constand x (score) value increases by a specific speed
        main character simply stays in 1 positon, moving up and down. When temp reaches 212, game over
        */
        
        speed = (temp * 0.0235849057) + 1;
        
        var spawnChance = Math.random() > 0.5;
        
        if(spawnChance){
            doSpawns();
        }
    },500);
}