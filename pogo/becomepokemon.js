/* UPDATE NOTES
10/04/2018 - Started working and researching
           - Started Basic Scripts and Functions
           - Using Hitmonlee for now.
10/05/2018 - More code stuff
           - Rendering stuff
           - Maths
           - Decided that you can only be pokemon that don't have evolutions
10/06/2018 - "fininshed", may add more pokemon in future :p
           - Added arcanine
           - Decided to add any pokemon with no evolutions, but use only one of the types... (maybe the scanner won't notice)
2020-03-27 - Updated pokemon base stats
           - Added Jynx
*/
var outPut = document.getElementsByTagName("canvas")[0];
var c = outPut.getContext('2d');

var pokemons = ["hitmonlee","arcanine","hitmonchan","raikou","tentacruel","sunflora","suicune","jynx"];

pokemons = shuffle(pokemons);

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
    base: [137,224,181]
  },
  "arcanine": {
    type: "fire",
    fast_moves: [{
      name: "Fire Fang",
      damage: 11,
      t: "fire"
    },{
      name: "Snarl",
      damage: 12,
      t: "dark"
    }],
    charge_moves: [{
      name: "Fire Blast",
      damage: 140,
      type: "full",
      t: "fire"
    },{
      name: "Wild Charge",
      damage: 90,
      type: "half",
      t: "electric"
    },{
      name: "Crunch",
      damage: 70,
      type: "third",
      t: "dark"
    }],
    base: [207,227,166]
  },
  "hitmonchan": {
    type: "fighting",
    fast_moves: [{
      name: "Counter",
      damage: 12,
      t: "fighting"
    },{
      name: "Bullet Punch",
      damage: 9,
      t: "steel"
    }],
    charge_moves: [{
      name: "Thunder Punch",
      damage: 45,
      type: "third",
      t: "electric"
    }],
    base: [137,193,197]
  },
  "raikou": {
    type: "electric",
    fast_moves: [{
      name: "Vole Switch",
      damage: 20,
      t: "electric"
    },{
      name: "Thunder Shock",
      damage: 5,
      t: "electric"
    }],
    charge_moves: [{
      name: "Thunder",
      damage: 100,
      type: "full",
      t: "electric"
    },{
      name: "Wild Charge",
      damage: 90,
      type: "half",
      t: "electric"
    },{
      name: "Thunderbolt",
      damage: 80,
      type: "half",
      t: "electric"
    }],
    base: [207,241,195]
  },
  "tentacruel": {
    type: "water",
    fast_moves: [{
      name: "Acid",
      damage: 9,
      t: "poison"
    },{
      name: "Poison Jab",
      damage: 10,
      t: "poison"
    }],
    charge_moves: [{
      name: "Hydro Pump",
      damage: 130,
      type: "full",
      t: "water"
    },{
      name: "Sludge Wave",
      damage: 110,
      type: "full",
      t: "poison"
    },{
      name: "Blizzard",
      damage: 130,
      type: "full",
      t: "ice"
    }],
    base: [190,166,209]
  },
  "sunflora": {
    type: "grass",
    fast_moves: [{
      name: "Razor Leaf",
      damage: 13,
      t: "grass"
    },{
      name: "Bullet Seed",
      damage: 8,
      t: "grass"
    }],
    charge_moves: [{
      name: "Petal Blizzard",
      damage: 110,
      type: "full",
      t: "grass"
    },{
      name: "Solar Beam",
      damage: 180,
      type: "full",
      t: "grass"
    },{
      name: "Sludge Bomb",
      damage: 80,
      type: "full",
      t: "poison"
    }],
    base: [181,185,135]
  },
  "suicune": {
    type: "water",
    fast_moves: [{
      name: "Snarl",
      damage: 12,
      t: "dark"
    },{
      name: "Extrasensory",
      damage: 12,
      t: "psychic"
    }],
    charge_moves: [{
      name: "Hydro Pump",
      damage: 130,
      type: "full",
      t: "water"
    },{
      name: "Bubble Beam",
      damage: 45,
      type: "full",
      t: "water"
    },{
      name: "Water Pulse",
      damage: 70,
      type: "half",
      t: "water"
    }],
    base: [225,180,235]
  },
  "jynx": {
    type: "psychic",
    fast_moves: [{
      name: "Frost Breath",
      damage: 10,
      t: "ice"
    },{
      name: "Confusion",
      damage: 20,
      t: "psychic"
    }],
    charge_moves: [{
      name: "Psyshock",
      damage: 65,
      type: "half",
      t: "water"
    },{
      name: "Avalanche",
      damage: 90,
      type: "full",
      t: "ice"
    },{
      name: "Focus Blast",
      damage: 140,
      type: "full",
      t: "fighting"
    }],
    base: [163,223,151]
  }
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
  rock: "#CBBD8E",
  fire: "#FEA153",
  electric: "#F7DA5C",
  dark: "#5E5B6E",
  water: "#5EAADC",
  poison: "#B961CF",
  ground: "#D58F5C",
  steel: "#5496A2",
  grass: "#5DBE67",
  ice: "#7CD2C7",
  psychic: "#FC8684"
};

const types = {
  fighting: new Image(),
  rock: new Image(),
  water: new Image(),
  ground: new Image(),
  poison: new Image(),
  electric: new Image(),
  dark: new Image(),
  fire: new Image(),
  steel: new Image(),
  grass: new Image(),
  ice: new Image(),
  psychic: new Image()
};
for(let i in types){
  types[i].src = `i/t/${i}.png`;
}

const candies = {
  hitmonlee: {
    n: "tyrogue",
    i: new Image()
  },
  hitmonchan: {
    n: "tyrogue",
    i: new Image()
  },
  arcanine: {
    n: "growlithe",
    i: new Image()
  },
  raikou: {
    n: "raikou",
    i: new Image()
  },
  sunflora: {
    n: "sunkern",
    i: new Image()
  },
  suicune: {
    n: "suicune",
    i: new Image()
  },
  tentacruel: {
    n: "tentacool",
    i: new Image()
  },
  jynx: {
    n: "jynx",
    i: new Image()
  }
};
for(let i in candies){
  candies[i].i.src = `i/c/${candies[i].n}.png`;
}

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
  return Math.floor((PokemonDB[id].base[0] + staIV)*CPScalar(lvl));
}

function CP(id,lvl,staIV,atkIV,defIV){
  return Math.floor(((PokemonDB[id].base[1] + atkIV)*Math.pow(PokemonDB[id].base[2] + defIV,0.5)*Math.pow(PokemonDB[id].base[0] + staIV,0.5)*Math.pow(CPScalar(lvl),2))/10);
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

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

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
sub.onclick = rendcalc;

function calculateValues(pLevel){
  atk = 8;
  def = 8;
  sta = 8;
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
      case "17":
      if(Number(ans[i].value) > 5.4){
        atk = atk + 4;
        def = def - 1;
      }else{
        def = def + 1;
        atk = atk - 2;
      }
      break;
      case "18":
      if(ans[i].checked){
        atk = atk + 10;
        sta = sta - 3;
      }else{
        atk = atk - 1;
        sta = sta + 1;
      }
      break;
      case "19":
      if(ans[i].checked){
        sta = sta + 5;
        def = def - 4;
      }else{
        sta = sta - 2;
      }
      break;
      case "20":
      if(ans[i].checked){
        lvl = lvl / 1.4;
      }else{
        lvl = lvl * 2;
      }
      break;
      case "21":
      if(ans[i].checked){
        sta = sta + 4;
      }else{
        sta = sta - 2;
      }
      break;
      case "22":
      if(Number(ans[i].value) < 4){
        sta = sta - 5;
      }else if(ans[i].value < 7){
        sta = sta + 3;
      }else{
        sta = sta - 1;
      }
      break;
      case "23":
      if(ans[i].checked){
        def = def + 4;
      }else{
        def = def - 2;
      }
      break;
      case "24":
      if(ans[i].checked){
        atk = atk + 11;
      }else{
        atk = atk - 4;
      }
      break;
      case "25":
      if(ans[i].checked){
        def = def - 3;
      }else{
        def = def + 2;
      }
      break;
      case "26":
      if(ans[i].value.search(/(cast)/img) != -1 && ans[i].value.search(/(passant)/img) != -1){
        lvl = lvl * 3;
      }else{
        lvl = lvl / 1.7;
      }
      break;
      case "27":
      switch (ans[i].value.toLowerCase()) {
        case 'run':
        def = def + 1;
        break;
        case 'hide':
        def = def + 3;
        break;
        case 'defend':
        def = def - 2;
        atk = atk + 1;
        sta = sta - 1;
        break;
        default:
        def = def - 3;
        atk = atk - 1;
        break;
      }
      break;
      case "28":
      if(Number(ans[i].value) > 3){
        lvl = lvl * 1.2;
      }else if(Number(ans[i].value) < 3){
        lvl = lvl / 1.4;
      }else{
        lvl = lvl * 1.5;
      }
      break;
      case "30":
      if(ans[i].value.search(/(african)/img) != -1 && ans[i].value.search(/(european)/img) != -1){
        lvl = lvl * 3;
        sta = sta + 1;
        def = def + 1;
      }else{
        lvl = lvl / 3;
        sta = sta - 2;
        def = def - 1;
        atk = atk - 1;
      }
      break;
      case "29":
      if(ans[i].checked){
        def = def + 2;
      }else{
        def = def - 2;
        atk = atk - 1;
        sta = sta - 1;
      }
      break;
      case "31":
      if(ans[i].value == "50"){
        sta = sta + 1;
      }else{
        sta = sta - 5;
        def = def - 3;
        atk = atk - 2;
      }
      break;
      case "32":
      switch (ans[i].value.toLowerCase()) {
        case 'leia':
        atk = atk + 3;
        def = def - 1;
        break;
        case 'luke':
        atk = atk + 4;
        sta = sta - 1;
        break;
        case 'vader':
        atk = atk + 5;
        sta = sta - 2;
        break;
        case 'rey':
        atk = atk + 2;
        def = def - 1;
        break;
        case 'ren':
        atk = atk + 6;
        def = def - 4;
        sta = sta - 1;
        break;
        case 'han':
        atk = atk + 2;
        def = def + 1;
        sta = sta - 1;
        break;
        case 'chewy':
        atk = atk + 2;
        def = def + 4;
        sta = sta - 4;
        break;
        case 'rose':
        atk = atk - 2;
        def = def - 2;
        sta = sta - 2;
        break;
        case 'yoda':
        atk = atk + 1;
        def = def + 1;
        sta = sta + 1;
        break;
        default:
        sta = sta - 2;
        atk = atk - 1;
        def = def - 1;
      }
      break;
      case "33":
      if(ans[i].value > 8){
        sta += 11;
        def += 4;
        atk -= 1;
      }else if(ans[i].value > 4){
        sta += 3;
        def += 1;
      }else{
        sta -= 5;
        def -= 2;
        atk += 1;
      }
      break;
      case "34":
      if(ans[i].checked){
        levelPercent *= 2;
      }else{
        levelPercent /= 1.2;
      }
      break;
      case "35":
      if(ans[i].checked){
        def -= 10;
      }else{
        def += 4;
      }
      break;
      case "36":
      if(ans[i].checked){
        atk += 8;
        def --;
      }else{
        sta ++;
        atk -= 9;
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

function rendcalc(){
  let plvl = pLevel.value <= 40 && pLevel.value > 0 ? Number(pLevel.value) : 1;
  calculateValues(plvl);
  renderPokemonStats();
}

function renderPokemonStats(){
  drawStarterInfo();
  let plvl = pLevel.value <= 40 && pLevel.value > 0 ? Number(pLevel.value) : 1;
  c.fillStyle = "#44696C";
  c.font = "42.8px \"Lato\", sans-serif";
  var name = pName.value == "" ? "You" : pName.value;
  var namex = 320 - (c.measureText(name).width / 2);
  var pokemon = pokemons[Number(document.getElementById("pokeid").value)];
  if(pokemon == undefined){
    pokemon = "hitmonlee";
  }
  c.fillText(name,namex,559);
  c.drawImage(images[4],namex + c.measureText(name).width + 13,526);
  let cp = CP(pokemon,lvl,sta,atk,def);
  let hp = HP(pokemon,lvl,sta);
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
  c.arc(318,405,262.5,Math.PI,Math.PI * (1 + cp / CP(pokemon,plvl,sta,atk,def)));
  c.stroke();
  c.closePath();
  //drawing the bigger dot :p
  c.beginPath();
  c.fillStyle = "white";
  c.arc(getPoint(318,405,262.5,Math.PI * (1 + cp / CP(pokemon,plvl,sta,atk,def)))[0],getPoint(318,405,262.5,Math.PI * (1 + cp / CP(pokemon,plvl,sta,atk,def)))[1],7,0,2*Math.PI);
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
  ax = 320 - (c.measureText(String(PokemonDB[pokemon].type.toUpperCase())).width / 2);
  c.fillText(PokemonDB[pokemon].type.toUpperCase(),ax,729);
  c.drawImage(types[PokemonDB[pokemon].type],302,664);
  c.font = "27px \"Lato\", sans-serif";
  c.fillStyle = "#466B6D";
  ax = 504.5 - (c.measureText("2.25m").width / 2);
  c.fillText("2.25m",ax,698);
  ax = 136.5 - (c.measureText("43.7kg").width / 2);
  c.fillText("43.7kg",ax,698);
  c.font = "26px \"Lato\", sans-serif";
  c.fillStyle = "#456A6D";
  ax = 442.5 - (c.measureText("99").width / 2);
  c.fillText("99",ax,823);
  c.drawImage(candies[pokemon].i,395,795);
  c.fillStyle = "#98ACAD";
  c.font = "18.9px \"Lato\", sans-serif";
  ax = 442 - (c.measureText(String(`${candies[pokemon].n.toUpperCase()} CANDY`)).width / 2);
  c.fillText(`${candies[pokemon].n.toUpperCase()} CANDY`,ax,854);
  c.drawImage(images[13],339,908);
  c.fillStyle = "#45696C";
  c.font = "26px \"Lato\", sans-serif";
  ax = 382 - (c.measureText(String(candust.dust)).width / 2);
  c.fillText(String(candust.dust),ax,934);
  c.drawImage(candies[pokemon].i,449,910,28,28);
  c.font = "26px \"Lato\", sans-serif";
  ax = 489 - (c.measureText(String(candust.candy)).width / 2);
  c.fillText(String(candust.candy),ax,934);
  //randomly choose a charged and quick attack
  let qa = PokemonDB[pokemon].fast_moves[Math.floor(Math.random()*PokemonDB[pokemon].fast_moves.length)];
  let qc = PokemonDB[pokemon].charge_moves[Math.floor(Math.random()*PokemonDB[pokemon].charge_moves.length)];
  c.drawImage(types[qa.t],43,1028);
  c.drawImage(types[qc.t],43,1084);
  c.fillStyle = "#44696C";
  c.font = "28.6px \"Lato\", sans-serif";
  c.fillText(qa.name,92,1058);
  c.fillText(qc.name,92,1114);
  c.fillStyle = typeColors[qc.t];
  ax = c.measureText(qc.name).width + 13 + 91;
  console.log(ax);
  if(qc.type == "full"){
    c.beginPath();
    c.moveTo(ax,1112);
    c.lineTo(ax + 8,1094);
    c.lineTo(ax + 176,1094);
    c.lineTo(ax + 169,1112);
    c.fill();
    c.closePath();
  }else if(qc.type == "half"){
    c.beginPath();
    c.moveTo(ax,1112);
    c.lineTo(ax + 8,1094);
    c.lineTo(ax + 87,1094);
    c.lineTo(ax + 80,1112);
    c.fill();
    c.closePath();
    c.beginPath();
    c.moveTo(ax + 90,1112);
    c.lineTo(ax + 98,1094);
    c.lineTo(ax + 176,1094);
    c.lineTo(ax + 169,1112);
    c.fill();
    c.closePath();
  }else if(qc.type == "third"){
    c.beginPath();
    c.moveTo(ax,1112);
    c.lineTo(ax + 8,1094);
    c.lineTo(ax + 56,1094);
    c.lineTo(ax + 49,1112);
    c.fill();
    c.closePath();
    c.beginPath();
    c.moveTo(ax + 60,1112);
    c.lineTo(ax + 67,1094);
    c.lineTo(ax + 116,1094);
    c.lineTo(ax + 109,1112);
    c.fill();
    c.closePath();
    c.beginPath();
    c.moveTo(ax + 120,1112);
    c.lineTo(ax + 126,1094);
    c.lineTo(ax + 175,1094);
    c.lineTo(ax + 169,1112);
    c.fill();
    c.closePath();
  }else{
    //dont render.
  }
  outPut.toBlob(function(blob){
    var url = URL.createObjectURL(blob);
    var link = document.getElementById("d");
    if(link == null){
      link = document.createElement("a");
      link.id = "d";
      link.href = url;
      link.innerHTML = "Download Image";
      document.body.appendChild(link);
      document.body.appendChild(document.createElement("br"));
    }else{
      link.href = url;
      link.innerHTML = "Download Image";
    }
    var reader = new FileReader();
    var link2 = document.getElementById("d2");
    reader.onload = function(e){
      if(link2 == null){
        link2 = document.createElement("a");
        link2.id = "d2";
        link2.href = reader.result;
        link2.innerHTML = "Download image (if the first link doesn't work)";
        document.body.appendChild(link2);
      }else{
        link2.href = reader.result;
        link2.innerHTML = "Download image (if the first link doesn't work)";
      }
    };
    reader.readAsDataURL(blob);
  });
  var appraisalIV = ((atk + def + sta) / 45)*100;
  var ivapp = document.getElementById("appraisal");
  var strap = document.getElementById("appraisal2");
  var staap = document.getElementById("appraisal3");
  if(appraisalIV > 82.2){
    ivapp.innerHTML = `Your ${name} is amazing!!!`;
  }else if(appraisalIV > 66.7){
    ivapp.innerHTML = `Your ${name} is pretty strong!`;
  }else if(appraisalIV > 51.1){
    ivapp.innerHTML = `Your ${name} is decent.`;
  }else{
    ivapp.innerHTML = `Your ${name} is weak.`;
  }
  var highest = "";
  if(def > sta){
    if(def > atk){
      highest = "Defense";
    }else if(def == atk){
      highest = "Defense and Attack";
    }else{
      highest = "Attack";
    }
  }else if(def == sta){
    if(def > atk){
      highest = "Defense and HP";
    }else if(def == atk){
      highest = "Defense, HP, and Attack";
    }else{
      highest = "Attack";
    }
  }else{
    if(sta > atk){
      highest = "HP";
    }else if(sta == atk){
      highest = "HP and Attack";
    }else{
      highest = "Attack";
    }
  }
  strap.innerHTML = `Its best attribute(s) is/are ${highest}`;
  if(def == 15 || sta == 15 || atk == 15){
    staap.innerHTML = "Its stats are out of this world!";
  }else if(def >= 13 || sta >= 13 || atk >= 13){
    staap.innerHTML = "Its stats are pretty impressive!";
  }else if(def >= 8 || sta >= 8 || atk >= 8){
    staap.innerHTML = "Its stats are decent.";
  }else{
    staap.innerHTML = "Its stats are garbage...";
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
playerImage.src = "i/empty.png";
var qs = document.getElementById("questions");

var levelQuests = [{n:"How old is your character?",t:"number",i:0},{n:"What is your characters average grade?",t:"text",i:1},{n:"Does your character play Minecraft?",t:"checkbox",i:2},{n:"Does your character play Roblox?",t:"checkbox",i:3},{n:"Does your character play Pokemon Go?",t:"checkbox",i:4},{n:"Is your character gay/lesbian/etc?",t:"checkbox",i:20},{n:"Name the two 'secret' chess moves.",t:"text",i:26},{n:"How many meals does your character have per day?",t:"number",i:28},{n:"What is the airspeed velocity of an unladen swallow?",t:"text",i:30},{n:"Does your character like swimsuits?",t:"checkbox",i:34}];
var HealthQuests = [{n:"How much time does your character spend on the computer/day?",t:"number",i:5},{n:"Does your character eat breakfast every day?",t:"checkbox",i:6},{n:"How much sleep does your character get?",t:"number",i:7},{n:"Does your character go out to eat often?",t:"checkbox",i:8},{n:"Is your character in a relationship?",t:"checkbox",i:19},{n:"Can your character cook?",t:"checkbox",i:21},{n:"What hour does your character wake up on weekends?",t:"number",i:22},{n:"How many states are there in the US? (2020)",t:"number",i:31},{n:"How big are your character's breasts? (1-10)",t:"number",i:33}];
var DamageQuests = [{n:"Do you consider your character 'buff'?",t:"checkbox",i:9},{n:"Does your character prefer revenge over forgiveness?",t:"checkbox",i:10},{n:"How much money does your character earn (hourly)?",t:"number",i:11},{n:"What is your character's gender ('male'/'female'/'neither')",t:"text",i:12},{n:"How tall is your character (in ft)?",t:"number",i:17},{n:"Does your character own a gun?",t:"checkbox",i:18},{n:"Does your character believe in God?",t:"checkbox",i:24},{n:"Who is your character's favorite star wars character (or who would they choose)?",t:"text",i:32},{n:"Has your character killed anyone?",t:"checkbox",i:36}];
var DefenseQuests = [{n:"Does your character get easily offended?",t:"checkbox",i:13},{n:"Is your character sexy?",t:"checkbox",i:14},{n:"How many push ups can your character do in one go?",t:"number",i:15},{n:"Is your character scared of weapons / sharp tools?",t:"checkbox",i:16},{n:"Is your character 'good' at chess?",t:"checkbox",i:23},{n:"Would your character eat green eggs and ham?",t:"checkbox",i:25},{n:"In a shooting, would your character rather run, hide, or defend?",t:"text",i:27},{n:"Does your character like math?",t:"checkbox",i:29},{n:"Would you be willing to sleep with your character",t:"checkbox",i:35}];

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
  playerImage = new Image();
  playerImage.crossOrigin = "anonymous";
  playerImage.src = u;
}
