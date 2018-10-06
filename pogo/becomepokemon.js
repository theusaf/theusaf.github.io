/* UPDATE NOTES
10/04/2018 - Started working and researching
           - Started Basic Scripts and Functions
           - Using Hitmonlee for now.
*/


//canvas size is 640 by 1136
//609 x 703 is the info box size (14px offset from left)
//star is located 66px from top, 553px from left
//563 from top, 547 from left is the gender
//13 px left of text is the pencil, 2px up

//name font size is 42.9 (42 is incorrect. the measuretext seems to take into account 2 extra pixels at the start/end of text :p)

/*Calculation notes:
weight and random stats will be calculated randomly lol
CP = (BASE ATK + ATK IV)*(BASE DEF + DEF IV)^0.5*(BASE STA + STA IV)^0.5*(CPScalar)^2/10
HP = (BASE STAM + STAM IV) * (CPScalar)*/
var outPut = document.getElementsByTagName("canvas")[0];
var c = outPut.getContext('2d');

//data useful for calculations. base means [STA,ATK,DEF]
const PokemonDB = {
    "hitmonlee": {
        type: "fighting",
        moves: [{
            name: "Rock Smash",
            damage: 15,
            type: "quick",
            t: "fighting"
        },{
            name: "Close Combat",
            damage: 100,
            type: "charge_full",
            t: "fighting"
        },{
            name: "Low Kick",
            damage: 6,
            type: "quick",
            t: "fighting"
        },{
            name: "Stone Edge",
            damage: 100,
            type: "charge_full",
            t: "rock"
        },{
            name: "Low Sweep",
            damage: 40,
            type: "charge_third",
            t: "fighting"
        }],
        base: [100,224,211]
    }
};
const CPScalarList = [0.094,0.135137432,0.16639787,0.192650919,0.21573247,0.236572661,0.25572005,0.273530381,0.29024988,0.306057377,0.3210876,0.335445036,0.34921268,0.362457751,0.37523559,0.387592406,0.39956728,0.411193551,0.42250001,0.432926419,0.44310755,0.4530599578,0.46279839,0.472336083,0.48168495,0.4908558,0.49985844,0.508701765,0.51739395,0.525942511,0.53435433,0.542635767,0.55079269,0.558830576,0.56675452,0.574569153,0.58227891,0.589887917,0.59740001,0.604818814,0.61215729,0.619399365,0.62656713,0.633644533,0.64065295,0.647576426,0.65443563,0.661214806,0.667934,0.674577537,0.68116492,0.687680648,0.69414365,0.700538673,0.70688421,0.713164996,0.71939909,0.725571552,0.7317,0.734741009,0.73776948,0.740785574,0.74378943,0.746781211,0.74976104,0.752729087,0.75568551,0.758630378,0.76156384,0.764486065,0.76739717,0.770297266,0.7731865,0.776064962,0.77893275,0.781790055,0.78463697,0.787473578,0.79030001];
const StarDustCost = [200,400,600,800,1000,1300,1600,1900,2200,2500,3000,3500,4000,4500,5000,6000,7000,8000,9000,10000];
const CandyCosts = [1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,6,6,8,8,10,10,12,12,15,15];

//getting secret CPScalar value
function CPScalar(lvl){
    if(String(lvl).split(".").length > 1){
        return CPScalarList[2 * Number(String(lvl).split(".")[0]) - 1];
    }else{
        return CPScalarList[2 * lvl - 2];
    }
}

function HP(id,lvl,staIV){
    return Math.round((PokemonDB[id].base[0] + staIV)*CPScalar(lvl));
}

function CP(id,lvl,staIV,atkIV,defIV){
    return Math.round(((PokemonDB[id].base[1] + atkIV)*Math.pow(PokemonDB[id].base[2] + defIV,0.5)*Math.pow(PokemonDB[id].base[0] + staIV,0.5)*Math.pow(CPScalar(lvl),2))/10);
}

function StarCandy(plvl){
    return {
        dust: StarDustCost[Math.floor((plvl - 1)/2)],
        candy: CandyCosts[Math.floor(plvl - 1)]
    };
}
//resizing the canvas
window.onload = window.onresize = function(evt){
    let y = window.innerHeight / (1136 + 20);
    let x = window.innerWidth / 2 / (640 + 20);
    let ty = -0.5 * (1-y) * (1136 + 20);
    let tx = -0.5 * (1-x) * (640 + 20);
    console.log(`y: ${y}, x: ${x}\ntx: ${tx}, ty: ${ty}\nwx: ${window.innerWidth}, wh: ${window.innerHeight}`);
    outPut.style.transform = `scaleY(${y}) scaleX(${x})`;
    outPut.style.top = `${ty}px`;
    outPut.style.right = `${tx}px`;
};

/*global Image*/
const images = [new Image(),new Image(),new Image()];
images[0].src = "i/iphone_bar.png";
images[1].src = "i/male_sig.png";
images[2].src = "i/star.png";

function drawStarterInfo(){
    c.fillStyle = "rgb(0,157,255)";
    c.fillRect(0,0,640,1136);
    c.fillStyle = "white";
    c.fillRect(14,443,609,703);
    c.drawImage(images[0],0,0);
    c.drawImage(images[1],547,563);
    c.drawImage(images[2],553,66);
    c.font = "Lato";
}

let pLevel = document.getElementById("lvl");
let pName = document.getElementById("name");
let sub = document.getElementsByTagName("button")[0];
sub.onclick = renderPokemonStats;

function renderPokemonStats(){
    lvl = lvl.value <= 40 && lvl.value > 0 ? Number(lvl.value) : 1;
}

var atk = 0;
var def = 0;
var sta = 0;
var lvl = 1;
var quickAttack = {};
var chargeAttack = {};
var qs = document.getElementById("questions");

var levelQuests = [{n:"How old are you?",t:"number",i:0},{n:"What is your lowest grade in your last/current school?",t:"text",i:1},{n:"Do you play Minecraft?",t:"checkbox",i:2},{n:"Do you play Roblox?",t:"checkbox",i:3},{n:"Do you play Pokemon Go?",t:"checkbox",i:4}];
var HealthQuests = [{n:"How much time do you spend on the computer?",t:"number",i:5},{n:"Do you eat breakfast every day?",t:"checkbox",i:6},{n:"How much sleep do you get?",t:"number",i:7},{n:"Do you go out to eat often?",t:"checkbox",i:8}];
var DamageQuests = [{n:"Do you consider yourself buff?",t:"checkbox",i:9},{n:"Do you prefer revenge over forgiveness?",t:"checkbox",i:10},{n:"How much money do you earn?",t:"number",i:11},{n:"What is your gender ('male'/'female'/'neither')",t:"checkbox",i:12}];
var DefenseQuests = [{n:"Do you get angry to insults?",t:"checkbox",i:13},{n:"Do you consider yourself as sexy?",t:"checkbox",i:14},{n:"How many push ups can you do?",t:"number",i:15},{n:"Are you scared of weapons / sharp tools?",t:"checkbox",i:16}];

setTimeout(function(){
    //drawing basic stuff
    drawStarterInfo();
    //randomize questions
    //asks 16 questions...
    let idsUsed = [];
    let reqType = "lvl";
    let ok = false;
    while(idsUsed.length < 16){
        ok = false;
        let q = document.createElement("p");
        q.className = "question";
        let a = document.createElement("input");
        switch (reqType) {
            case 'lvl':
                var w = levelQuests[Math.floor(Math.random()*levelQuests.length)];
                if(idsUsed.includes(w.i)){
                    break;
                }else{
                    q.innerHTML = w.n;
                    q.id = w.i;
                    a.id = w.i;
                    a.type = w.t;
                    idsUsed.push(w.i);
                    reqType = "hp";
                    ok = true;
                }
            break;
            case 'hp':
                var w = HealthQuests[Math.floor(Math.random()*HealthQuests.length)];
                if(idsUsed.includes(w.i)){
                    break;
                }else{
                    q.innerHTML = w.n;
                    q.id = w.i;
                    a.id = w.i;
                    a.type = w.t;
                    idsUsed.push(w.i);
                    reqType = "atk";
                    ok = true;
                }
            break;
            case 'atk':
                var w = DamageQuests[Math.floor(Math.random()*DamageQuests.length)];
                if(idsUsed.includes(w.i)){
                    break;
                }else{
                    q.innerHTML = w.n;
                    q.id = w.i;
                    a.id = w.i;
                    a.type = w.t;
                    idsUsed.push(w.i);
                    reqType = "def";
                    ok = true;
                }
            break;
            case 'def':
                var w = DefenseQuests[Math.floor(Math.random()*DefenseQuests.length)];
                if(idsUsed.includes(w.i)){
                    break;
                }else{
                    q.innerHTML = w.n;
                    q.id = w.i;
                    a.id = w.i;
                    a.type = w.t;
                    idsUsed.push(w.i);
                    reqType = "lvl";
                    ok = true;
                }
            break;
        }
        if(ok){
            qs.appendChild(q);
            qs.appendChild(a);
            qs.appendChild(document.createElement("br"));
        }
    }
},1000);