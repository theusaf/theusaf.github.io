//from https://scratch.mit.edu/projects/18289574/#player
//vars
var x=-40;
var y=-40;
var z=-40;

var angleX = 0;
var angleY = 0;
var angleZ = 0;

var angleXSin = 0;
var angleXCos = 0;

var angleYCos = 0;
var angleYSin = 0;

var angleZSin = 0;
var angleZCos = 0;

var startX = 0;
var startY = 0;
var startZ = 0;

var endX = 0;
var endY = 0;
var endZ = 0;

var x2 = 0;
var y2 = 0;
var z2 = 0;

var repeat = 50;
var fov = 200;

//functions
//math
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

var sin = function(n){
    return Math.sin(toRadians(n));
};
var cos = function(n){
    return Math.cos(toRadians(n));
};

//rand
function setUp(xx,yy,zz,e){
    x2 = xx - x;
    y2 = yy - y;
    z2 = zz - z;
    if(e == false){
        startX = (angleYCos * ((angleZSin * y2) + (angleZCos * x2))) - (angleYSin * z2);
        startY = (angleXSin * ((angleYCos * z2) + (angleYSin * ((angleZSin * y2) + (angleZCos * x2))))) + (angleXCos * ((angleZCos * y2) - (angleZSin * x2)));
        startZ = (angleXCos * ((angleYCos * z2) + (angleYSin * ((angleZSin * y2) + (angleZCos * x2))))) - (angleXSin * ((angleZCos * y2) - (angleZSin * x2)));
    }
    if(e == true){
        endX = (angleYCos * ((angleZSin * y2) + (angleZCos * x2))) - (angleYSin * z2);
        endY = (angleXSin * ((angleYCos * z2) + (angleYSin * ((angleZSin * y2) + (angleZCos * x2))))) + (angleXCos * ((angleZCos * y2) - (angleZSin * x2)));
        endZ = (angleXCos * ((angleYCos * z2) + (angleYSin * ((angleZSin * y2) + (angleZCos * x2))))) - (angleXSin * ((angleZCos * y2) - (angleZSin * x2)));
    }
}

//drawLine vars
var chX = 0;
var chY = 0;
var chZ = 0;

var abs = Math.abs;

var canvas = document.getElementById('engine');
var c = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

function drawLine(x1,y1,z1,x2,y2,z2,thick,color){
    setUp(x1,y1,z1,false);
    setUp(x2,y2,z2,true);
    chX = (endX - startX) / repeat;
    chY = (endY - startY) / repeat;
    chZ = (endZ - startZ) / repeat;
    //draw
    if(startZ < 0 && abs(startY * fov / startZ) < height && abs(startX * fov / startZ) < width){
        c.strokeStyle = color;
        c.lineWidth = thick * fov / startZ;
        c.moveTo(startX * fov / startZ, startY * fov / startZ);
    }else{
        c.moveTo(startX * fov / startZ, startY * fov / startZ);
    }
    for(var i = 0; i < repeat; i++){
        startX += chX;
        startY += chY;
        startZ += chZ;
        if(0 < startZ && (abs(startY * fov / startZ) < height && abs(startX * fov / startZ) < width)){
            c.strokeStyle = color;
            c.lineWidth = thick * fov / startZ;
            c.moveTo(startX * fov / startZ, startY * fov / startZ);
            penDown(startX * fov / startZ,startY * fov / startZ,startX * fov / startZ,startY * fov / startZ,color,thick * fov / startZ);
        }else{
            c.moveTo(startX * fov / startZ, startY * fov / startZ);
        }
    }
}
function penDown(x1,y1,x2,y2,co,t){
    if(x1 == x2 && y1 == y2){
        c.beginPath();
        c.fillStyle = co;
        c.arc(x1,y1,t / 2,0,2 * Math.PI);
        c.stroke();
    }else{
        c.beginPath();
        c.strokeStyle = c;
        c.lineWidth = t;
        c.moveTo(x1,y1);
        c.lineTo(x2,y2);
        c.stroke();
    }
}

function setUpAngles(){
    angleXSin = sin(angleX);
    angleXCos = cos(angleX);
    angleYSin = sin(angleY);
    angleYCos = cos(angleY);
    angleZSin = sin(angleZ);
    angleZCos = cos(angleZ);
}
//add 'controls' or game engine, aka velocity and stuff
var velocityY = 0;
var velocityForwards = 0;
var velocityR = 0;
var turnVelX = 0;
var turnVelY = 0;
var km = {
    38: false,
    39: false,
    40: false,
    37: false,
    87: false,
    83: false,
    65: false,
    68: false,
    32: false, //space
    16: false //shift
};

window.onkeydown = window.onkeyup = function(e){
    km[e.keyCode] = e.type == 'keydown';
}

var sens = 0.5;

function controls(){
    if(km[38] == true){
        turnVelX += - sens;
    }
    if(km[40] == true){
        turnVelX += sens;
    }
    if(km[39] == true){
        turnVelY += sens;
    }
    if(km[37] == true){
        turnVelY += -sens;
    }
    if(km[37] == false && km[39] == false){
        turnVelY = 0;
    }
    if(km[38] == false && km[40] == false){
        turnVelX = 0;
    }
    if((angleX + turnVelX) < -90){
        turnVelX = 0;
        angleX = -90;
    }
    if((angleX + turnVelX) > 90){
        turnVelX = 0;
        angleX = 90;
    }
    if(angleY > 180){
        angleY = 180 + (abs(angleY) - 180);
    }
    angleX += turnVelX;
    angleY += turnVelY;
    if(km[87] == true){
        velocityForwards += sens;
    }
    if(km[83] == true){
        velocityForwards += -sens;
    }
    if(km[87] == false && km[83] == false){
        velocityForwards = 0;
    }
    x += sin(angleY) * velocityForwards;
    z += cos(angleY) * velocityForwards;
    if(km[65] == true){
        velocityR += -sens;
    }
    if(km[68] == true){
        velocityR += sens;
    }
    if(km[68] == false && km[65] == false){
        velocityR = 0;
    }
    x += cos(angleY) * velocityR;
    z += -sin(angleY) * velocityR;
    if(km[32] == true){
        velocityY += sens;
    }
    if(km[16] == true){
        velocityY += -sens;
    }
    if(km[16] == false && km[32] == false){
        velocityY = 0;
    }
    y += velocityY;
}

//add draw or setinterval running drawline

var run = setInterval(
    function(){
       if(false){
           clearInterval(run);
       }
       setUpAngles();
       controls();
       c.clearRect(0 - width / 2,0 - height / 2,width,height);
       //draw objects
       //cube
       drawLine(0,0,0,0,0,40,2,'blue');
       drawLine(40,0,0,40,0,40,2,'blue');
       drawLine(0,0,0,40,0,0,2,"blue");
       drawLine(0,0,40,40,0,40,2,"blue");
       drawLine(0,0,0,0,40,0,2,"blue");
       drawLine(0,0,40,0,40,40,2,"blue");
       drawLine(40,0,0,40,40,0,2,"blue");
       drawLine(40,0,40,40,40,40,2,"blue");
       drawLine(0,40,0,40,40,0,2,"blue");
       drawLine(0,40,40,40,40,40,2,"blue");
       drawLine(0,40,0,0,40,40,2,"blue");
       drawLine(40,40,0,40,40,40,2,"blue");
    }
);
c.translate(width/2,height/2);