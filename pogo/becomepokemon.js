/* UPDATE NOTES
10/04/2018 - Started working and researching
           - Started Basic Scripts and Functions
           - Using Hitmonlee for now.
10/05/2018 - More code stuff
           - Rendering stuff
           - Maths
           - Decided that you can only be pokemon that don't have evolutions, and only one type...
*/

//max image size is 236x319, located at (201,178)
//canvas size is 640 by 1136
//563 from top, 547 from left is the gender (m)

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
        fast_moves: [{
            name: "Rock Smash",
            damage: 15,
            t: "fighting"
        },{
            name: "Low Kick",
            damage: 6,
            t: "fighting"
        }],
        charge_moves: [{
            name: "Low Sweep",
            damage: 40,
            type: "third",
            t: "fighting"
        },{
            name: "Stone Edge",
            damage: 100,
            type: "full",
            t: "rock"
        },{
            name: "Close Combat",
            damage: 100,
            type: "full",
            t: "fighting"
        }],
        base: [100,224,211]
    }
};
//constant "cp" multipliers for each half pokemon level
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
const images = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
images[0].src = "i/iphone_bar.png";
images[1].src = "i/male_sign.png";
images[2].src = "i/star.png";
images[3].src = "i/powerup-button.png";
images[4].src = "i/pencil.png";
images[5].src = "i/x.png";
images[6].src = "i/menu.png";
images[7].src = "i/star_now.png";
images[8].src = "i/line.png";
images[9].src = "i/wfh.png";
images[10].src = "i/bar_vert.png";
images[11].src = "i/hpbar.png";
images[12].src = "i/female_sign.png";
images[13].src = "i/stardust.png";

const typeColors = {
    fighting: "#D5425F",
    rock: "#CBBD8E"
};

const types = {
    fighting: new Image(),
    rock: new Image(),
    water: new Image(),
    ground: new Image(),
    poison: new Image(),
    electric: new Image()
};
types.fighting.src = "i/t/fighting.png";
types.rock.src = "i/t/rock.png";
types.water.src = "i/t/water.png";
types.ground.src = "i/t/ground.png";
types.poison.src = "i/t/poison.png";
types.electric.src = "i/t/electric.png";

const candies = {
    hitmonlee: {
        n: "tyrogue",
        i: new Image()
    },
    hitmonchan: {
        n: "tyrogue",
        i: new Image()
    }
};
candies.hitmonlee.i.src = "i/c/hitmonlee.png";
candies.hitmonchan.i.src = "i/c/hitmonchan.png";

function drawStarterInfo(){
    c.clearRect(0,0,640,1136);
    c.fillStyle = "rgb(0,157,255)";
    c.fillRect(0,0,640,1136);
    c.fillStyle = "#FAFAFA";
    c.fillRect(14,443,609,703);
    c.drawImage(images[0],0,0);
    c.drawImage(images[2],553,66);
    c.drawImage(images[3],59,884);
    c.fillStyle = "#E8EFE1";
    c.fillRect(316,884,262,79);
    c.drawImage(images[7],128,793);
    c.drawImage(images[8],43,764);
    c.drawImage(images[8],43,997);
    c.drawImage(images[9],97,713);
    c.fillStyle = "#FAFAFA";
    c.fillRect(277,715,90,14);
    c.drawImage(images[10],227,669);
    c.drawImage(images[10],414,669);
    c.drawImage(images[11],158,580);
    c.drawImage(images[5],279,1011);
    c.drawImage(images[6],495,996);
}

let pLevel = document.getElementById("lvl");
let pName = document.getElementById("name");
let sub = document.getElementsByTagName("button")[0];
sub.onclick = renderPokemonStats;

function calculateValues(pLevel){
    let qs = Array.from(document.getElementsByClassName("question2"));
    let ans = Array.from(document.getElementsByClassName("question3"));
    let levelPercent = 0.5;
    for(let i in qs){
        switch (qs[i].id) {
            case "0":
                if(Number(ans[i].value) <= 10){
                    levelPercent = levelPercent / 2;
                }else if(Number(ans[i].value) > 10 && Number(ans[i].value) <= 21){
                    levelPercent = levelPercent * 1.2;
                }else{
                    levelPercent = levelPercent * 1.75;
                }
            break;
            case "1":
                switch (ans[i].value.toLowerCase()){
                    case 'a':
                        levelPercent = levelPercent * 2;
                    break;
                    case 'b':
                        levelPercent = levelPercent * 1.3;
                    break;
                    case 'c':
                        levelPercent = levelPercent * 1.1;
                    break;
                    case 'd':
                        levelPercent = levelPercent / 1.2;
                    break;
                    default:
                        levelPercent = levelPercent / 2;
                    break;
                }
            break;
            case "2":
                if(ans[i].checked){
                    levelPercent = levelPercent + 0.1;
                }else{
                    levelPercent = levelPercent - 0.1;
                }
            break;
            case "3":
                if(ans[i].checked){
                    levelPercent = levelPercent / 4;
                }else{
                    levelPercent = levelPercent + 0.05;
                }
            break;
            case "4":
                if(ans[i].checked){
                    levelPercent = levelPercent * 3;
                }else{
                    levelPercent = levelPercent / 2;
                }
            break;
            case "5":
                if(Number(ans[i].value) > 6){
                    sta = sta - 3;
                }else{
                    sta = sta + 2;
                }
            break;
            case "6":
                if(ans[i].checked){
                    sta = sta + 4;
                }else{
                    sta = sta - 2;
                }
            break;
            case "7":
                if(Number(ans[i].value) >= 7){
                    sta = sta + 5;
                }else{
                    sta = sta - 3;
                }
            break;
            case "8":
                if(ans[i].checked){
                    sta = sta - 2;
                }else{
                    sta = sta + 5;
                }
            break;
            case "9":
                if(ans[i].checked){
                    atk = atk + 4;
                }else{
                    atk = atk - 1;
                }
            break;
            case "10":
                if(ans[i].checked){
                    atk = atk + 3;
                    def = def - 1;
                }else{
                    atk = atk - 2;
                    def = def + 4;
                }
            break;
            case "11":
                if(Number(ans[i].value) >= 13){
                    atk = atk + 5;
                }else{
                    atk = atk - 3;
                }
            break;
            case "12":
                if(ans[i].value == "male"){
                    atk = atk + 4;
                    gender = "male";
                }else if(ans[i].value == "female"){
                    atk = atk + 3;
                    gender = "female";
                }else{
                    atk = atk - 3;
                }
            break;
            case "13":
                if(ans[i].checked){
                    def = def - 2;
                }else{
                    def = def + 2;
                }
            break;
            case "14":
                if(ans[i].checked){
                    def = def + 10;
                }else{
                    def = def + 1;
                }
            break;
            case "15":
                if(Number(ans[i].value) >= 8){
                    def = def + 5;
                    atk = atk + 1;
                }else{
                    def = def - 4;
                }
            break;
            case "16":
                if(ans[i].checked){
                    def = def + 4;
                }else{
                    def = def - 3;
                }
            break;
        }
    }
    if(levelPercent > 1){
        lvl = pLevel;
    }else{
        lvl = Math.ceil(levelPercent * pLevel);
    }
    if(atk > 15){
        atk = 15;
    }else if(atk < 0){
        atk = 0;
    }
    if(def > 15){
        def = 15;
    }else if(def < 0){
        def = 0;
    }
    if(sta > 15){
        sta = 15;
    }else if(sta < 0){
        sta = 0;
    }
}

function renderPokemonStats(){
    atk = 8;
    def = 8;
    sta = 8;
    drawStarterInfo();
    let plvl = pLevel.value <= 40 && pLevel.value > 0 ? Number(pLevel.value) : 1;
    c.fillStyle = "#44696C";
    c.font = "42.8px \"Lato\", sans-serif";
    var name = pName.value == "" ? "You" : pName.value;
    var namex = 320 - (c.measureText(name).width / 2);
    c.fillText(name,namex,559);
    c.drawImage(images[4],namex + c.measureText(name).width + 13,526);
    calculateValues(plvl);
    let cp = CP("hitmonlee",lvl,sta,atk,def);
    let hp = HP("hitmonlee",lvl,sta);
    let candust = StarCandy(lvl);
    c.drawImage(playerImage,200,178,236,319);
    if(gender == "male"){
        c.drawImage(images[1],547,563);
    }else{
        c.drawImage(images[12],547,563);
    }
    //arc center is (318,405)
    c.beginPath();
    c.strokeStyle = "grey";
    c.lineWidth = 6;
    c.arc(318,405,262.5,Math.PI,0);
    c.stroke();
    c.closePath();
    c.beginPath();
    c.strokeStyle = "white";
    c.lineWidth = 8;
    c.arc(318,405,262.5,Math.PI,Math.PI * (1 + cp / CP("hitmonlee",plvl,sta,atk,def)));
    c.stroke();
    c.closePath();
    //drawing the bigger dot :p
    c.beginPath();
    c.fillStyle = "white";
    c.arc(getPoint(318,405,262.5,Math.PI * (1 + cp / CP("hitmonlee",plvl,sta,atk,def)))[0],getPoint(318,405,262.5,Math.PI * (1 + cp / CP("hitmonlee",plvl,sta,atk,def)))[1],7,0,2*Math.PI);
    c.fill();
    c.closePath();
    //hp stat is located (center,592)
    c.fillStyle = "#517376";
    c.font = "18.3px \"Lato\", sans-serif";
    let a = `${hp} / ${hp} HP`;
    var ax = 320 - (c.measureText(a).width / 2);
    c.fillText(a,ax,608);
    c.fillStyle = "#FEFEFE";
    c.font = "30.9px \"Lato\", sans-serif";
    c.fillText("CP",217,119);
    c.font = "51px \"Lato\", sans-serif";
    ax = 320 - (c.measureText(String(cp)).width / 2);
    c.fillText(cp,ax,119);
    c.fillStyle = "#98ACAD";
    c.font = "18.9px \"Lato\", sans-serif";
    ax = 320 - (c.measureText(String("FIGHTING")).width / 2);
    c.fillText("FIGHTING",ax,729);
    c.drawImage(types.fighting,302,664);
    c.font = "27px \"Lato\", sans-serif";
    c.fillStyle = "#466B6D";
    ax = 504.5 - (c.measureText("2.25m").width / 2);
    c.fillText("2.25m",ax,676);
    ax = 136.5 - (c.measureText("43.7kg").width / 2);
    c.fillText("43.7kg",ax,676);
    c.font = "26px \"Lato\", sans-serif";
    c.fillStyle = "#456A6D";
    ax = 442.5 - (c.measureText("99").width / 2);
    c.fillText("99",ax,823);
    c.drawImage(candies.hitmonlee.i,395,795);
    c.fillStyle = "#98ACAD";
    c.font = "18.9px \"Lato\", sans-serif";
    ax = 442 - (c.measureText(String("TYROGUE CANDY")).width / 2);
    c.fillText("TYROGUE CANDY",ax,854);
    c.drawImage(images[13],339,908);
    c.fillStyle = "#45696C";
    c.font = "26px \"Lato\", sans-serif";
    ax = 382 - (c.measureText(String(candust.dust)).width / 2);
    c.fillText(String(candust.dust),ax,934);
    c.drawImage(candies.hitmonlee.i,449,910,28,28);
    c.font = "26px \"Lato\", sans-serif";
    ax = 489 - (c.measureText(String(candust.candy)).width / 2);
    c.fillText(String(candust.candy),ax,934);
    //randomly choose a charged and quick attack
    let qa = PokemonDB.hitmonlee.fast_moves[Math.floor(Math.random()*PokemonDB.hitmonlee.fast_moves.length)];
    let qc = PokemonDB.hitmonlee.charge_moves[Math.floor(Math.random()*PokemonDB.hitmonlee.charge_moves.length)];
    c.drawImage(types[qa.t],43,1028);
    c.drawImage(types[qc.t],43,1084);
    c.fillStyle = "#44696C";
    c.font = "28.6 \"Lato\", sans-serif";
    c.fillText(qa.name,92,1058);
    c.fillText(qc.name,92,1114);
    ax = c.measureText(qc.name) + 13;
    c.fillStyle = typeColors[qc.t];
    if(qc.type == "full"){
        
    }else if(qc.type == "half"){
        
    }else if(qc.type == "third"){
        
    }else{
        //dont render.
    }
}

function getPoint(c1,c2,radius,angle){
    return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}

var gender = "female";
var atk = 8;
var def = 8;
var sta = 8;
var lvl = 1;
var playerImage = new Image();
var qs = document.getElementById("questions");

var levelQuests = [{n:"How old are you?",t:"number",i:0},{n:"What is your lowest grade in your last/current school?",t:"text",i:1},{n:"Do you play Minecraft?",t:"checkbox",i:2},{n:"Do you play Roblox?",t:"checkbox",i:3},{n:"Do you play Pokemon Go?",t:"checkbox",i:4}];
var HealthQuests = [{n:"How much time do you spend on the computer per day?",t:"number",i:5},{n:"Do you eat breakfast every day?",t:"checkbox",i:6},{n:"How much sleep do you get?",t:"number",i:7},{n:"Do you go out to eat often?",t:"checkbox",i:8}];
var DamageQuests = [{n:"Do you consider yourself buff?",t:"checkbox",i:9},{n:"Do you prefer revenge over forgiveness?",t:"checkbox",i:10},{n:"How much money do you earn per hour?",t:"number",i:11},{n:"What is your gender ('male'/'female'/'neither')",t:"text",i:12}];
var DefenseQuests = [{n:"Do you get angry to insults?",t:"checkbox",i:13},{n:"Do you consider yourself as sexy?",t:"checkbox",i:14},{n:"How many push ups can you do in one go, no stopping?",t:"number",i:15},{n:"Are you scared of weapons / sharp tools?",t:"checkbox",i:16}];

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
        q.className = "question2";
        let a = document.createElement("input");
        a.className = "question3";
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

document.getElementById("pic").addEventListener("change",saveImage,false);

function saveImage(e){
    /*global URL*/
    let u = URL.createObjectURL(e.target.files[0]);
    playerImage.src = u;
}