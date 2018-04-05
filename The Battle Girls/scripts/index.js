/*notes: 
BoxGeometry appears to mean x,y,z and auto gens your cubes and faces.
MeshBasicMaterial defines a color / image to color the faces? Uses 0x+hex for hex
Mesh is the actual objects which combines all of these rules.
Note: scene.add adds object at pos 0,0,0

MeshLambertMaterial allows for lighting!

use "map" in materials as textureloader.load somthing
*/
//setup
/*global THREE*/
var scene = new THREE.Scene();
scene.background = new THREE.Color(0,0.2,1);
var camera = new THREE.PerspectiveCamera(74, (document.body.clientWidth) / (document.body.clientHeight), 0.1, 1000);
var renderer = new THREE.WebGLRenderer({precision: "highp", antialias: true});
renderer.setSize(document.body.clientWidth, document.body.clientHeight);
document.body.appendChild(renderer.domElement);

//making the ground
var loader = new THREE.TextureLoader();
var texture = loader.load( 'scripts/grass.jpg', function ( texture ) {

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.offset.set( 0, 0 );
    texture.repeat.set( 10, 10 );

} );

var grass = new THREE.PlaneGeometry(1000,200,0);
var grassMat = new THREE.MeshLambertMaterial({map: texture});
var grassMesh = new THREE.Mesh(grass, grassMat);
grassMesh.rotation.set(5,0,0);
grassMesh.position.y = -10;

//making the wall
var loader2 = new THREE.TextureLoader();
var texture2 = loader.load( 'scripts/brick.jpg', function ( texture2 ) {

    texture2.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture2.offset.set( 0, 0 );
    texture2.repeat.set( 10, 10 );

} );

var wall = new THREE.PlaneGeometry(1000,200,0);
var wallMat = new THREE.MeshLambertMaterial({map: texture2});
var wallMesh = new THREE.Mesh(wall, wallMat);
wallMesh.position.y = -10;
wallMesh.position.z = -200;


scene.add(wallMesh);
scene.add(grassMesh);

//max cam dist = 150

//creating cubes
/*var cubeShape = new THREE.BoxGeometry(1,1,1);
var cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
var cube = new THREE.Mesh(cubeShape, cubeMaterial);
scene.add(cube);*/

//creating test female body
/*var girl = {};
girl.body = new THREE.Geometry();
girl.body.vertices.push(
    new THREE.Vector3(-10,10,0),
    new THREE.Vector3(-10,-10,0),
    new THREE.Vector3(10,-10,0)
);
girl.body.faces.push(new THREE.Face3(0,1,2));
girl.mat = new THREE.MeshBasicMaterial({color: 0x00ff00});
girl.mesh = new THREE.Mesh(girl.body, girl.mat);
girl.mesh.position.z = -100;

scene.add(girl.mesh);*/

//loading basic Arianna from json?
scene.add(new THREE.AmbientLight(0xffffff));

var body = {
    Arianna0: undefined,
};
var pose = {
    Arianna0: {
        body: null,
        hair:null,
        eyes:null,
        teeth:null,
        tongue:null,
        eyebrow:null
    },
    Arianna0China:{
        body: null,
        hair:null,
        eyes:null,
        teeth:null,
        tongue:null,
        eyebrow:null,
        clothing:null
    },
    Arianna0Ballet: {
        body: null,
        hair:null,
        eyes:null,
        teeth:null,
        tongue:null,
        eyebrow:null,
        clothing:null
    },
    setrot: function(child,bone,x,y,z){
        //rotates child.
        this[child].body.getObjectByName(bone).rotation.set(x,y,z);
        this[child].hair.getObjectByName(bone).rotation.set(x,y,z);
        this[child].teeth.getObjectByName(bone).rotation.set(x,y,z);
        this[child].tongue.getObjectByName(bone).rotation.set(x,y,z);
        this[child].eyebrow.getObjectByName(bone).rotation.set(x,y,z);
        this[child].eyes.getObjectByName(bone).rotation.set(x,y,z);
        if(typeof(this[child].clothing) != 'undefined' && this[child].clothing != 'null'){
            this[child].clothing.getObjectByName(bone).rotation.set(x,y,z);
        }
    },
    getrot: function(child,bone){
        return this[child].body.getObjectByName(bone).rotation;
    },
    setpos: function(child,x,y,z){
        this[child].body.position.set(x,y,z);
        this[child].hair.position.set(x,y,z);
        this[child].body.position.set(x,y,z);
        this[child].teeth.position.set(x,y,z);
        this[child].tongue.position.set(x,y,z);
        this[child].eyebrow.position.set(x,y,z);
        this[child].eyes.position.set(x,y,z);
        if(typeof(this[child].clothing) != 'undefined' && this[child].clothing != 'null'){
            this[child].clothing.position.set(x,y,z);
        }
    },
    getpos: function(child){
        return this[child].body.position;
    }
};
var hair = {
    Arianna0: undefined,
};
var clothing = {
    Arianna0: null,
};
var eyes = {
    Arianna0: undefined,
};
var teeth = {
    Arianna0: undefined,
};
var tongue = {
    Arianna0: undefined,
};
var eyebrow = {
    Arianna0: undefined
};

//Yes I'm too lazy and I am going to load all models at once :p
var girlloader = new THREE.ObjectLoader();
var girlloader2 = new THREE.ObjectLoader();
var girlloader3 = new THREE.ObjectLoader();


//Load naked Arianna HairType = 0
girlloader.load(
    "models/Arianna0.json",
    function ( loadedObj ) {    
        body.Arianna0 = loadedObj.getObjectByName("Body");
        hair.Arianna0 = loadedObj.getObjectByName("Hair");
        eyebrow.Arianna0 = loadedObj.getObjectByName("Eyebrow");
        tongue.Arianna0 = loadedObj.getObjectByName("Tongue");
        eyes.Arianna0 = loadedObj.getObjectByName("Eyes");
        teeth.Arianna0 = loadedObj.getObjectByName("Teeth");
        
        pose.Arianna0.body = body.Arianna0.children[0];
        pose.Arianna0.hair = hair.Arianna0.children[0];
        pose.Arianna0.eyebrow = eyebrow.Arianna0.children[0];
        pose.Arianna0.tongue = tongue.Arianna0.children[0];
        pose.Arianna0.eyes = eyes.Arianna0.children[0];
        pose.Arianna0.teeth = teeth.Arianna0.children[0];
        
        //remove invisible materials...
        body.Arianna0.material.transparent = false;
        hair.Arianna0.material.transparent = false;
        eyebrow.Arianna0.material.transparent = false;
        tongue.Arianna0.material.transparent = false;
        eyes.Arianna0.material.transparent = false;
        teeth.Arianna0.material.transparent = false;
        
        //fixing weird eyes
        eyes.Arianna0.material.depthWrite = false;
        
        scene.add(body.Arianna0);
        scene.add(hair.Arianna0);
        scene.add(eyes.Arianna0);
        scene.add(teeth.Arianna0);
        scene.add(tongue.Arianna0);
        scene.add(eyebrow.Arianna0);
        
        //it appears that the objects become materials...
    }
);
//load Chinese Arianna HairType = 0
girlloader2.load(
    "models/Arianna0China.json",
    function ( loadedObj ) {    
        body.Arianna0China = loadedObj.getObjectByName("Body");
        hair.Arianna0China = loadedObj.getObjectByName("Hair");
        eyebrow.Arianna0China = loadedObj.getObjectByName("Eyebrow");
        tongue.Arianna0China = loadedObj.getObjectByName("Tongue");
        eyes.Arianna0China = loadedObj.getObjectByName("Eyes");
        teeth.Arianna0China = loadedObj.getObjectByName("Teeth");
        clothing.Arianna0China = loadedObj.getObjectByName("Clothing");
        
        pose.Arianna0China.body = body.Arianna0China.children[0];
        pose.Arianna0China.hair = hair.Arianna0China.children[0];
        pose.Arianna0China.eyebrow = eyebrow.Arianna0China.children[0];
        pose.Arianna0China.tongue = tongue.Arianna0China.children[0];
        pose.Arianna0China.eyes = eyes.Arianna0China.children[0];
        pose.Arianna0China.teeth = teeth.Arianna0China.children[0];
        pose.Arianna0China.clothing = clothing.Arianna0China.children[0];
        
        //remove invisible materials...
        body.Arianna0China.material.transparent = false;
        hair.Arianna0China.material.transparent = false;
        eyebrow.Arianna0China.material.transparent = false;
        tongue.Arianna0China.material.transparent = false;
        eyes.Arianna0China.material.transparent = false;
        teeth.Arianna0China.material.transparent = false;
        clothing.Arianna0China.material.transparent = false;
        
        //fixing weird eyes
        eyes.Arianna0China.material.depthWrite = false;
        
        //moving AriannaChina
        pose.setpos("Arianna0China",40,pose.getpos("Arianna0China").y,0);
        
        scene.add(body.Arianna0China);
        scene.add(hair.Arianna0China);
        scene.add(eyes.Arianna0China);
        scene.add(teeth.Arianna0China);
        scene.add(tongue.Arianna0China);
        scene.add(eyebrow.Arianna0China);
        scene.add(clothing.Arianna0China);
        
        //it appears that the objects become materials...
    }
);
//load Arianna with "Romper Dress" (not ballet. the ballet one messed up somehow)
girlloader3.load(
    "models/Arianna0Ballet.json",
    function ( loadedObj ) {    
        body.Arianna0Ballet = loadedObj.getObjectByName("Body");
        hair.Arianna0Ballet = loadedObj.getObjectByName("Hair");
        eyebrow.Arianna0Ballet = loadedObj.getObjectByName("Eyebrow");
        tongue.Arianna0Ballet = loadedObj.getObjectByName("Tongue");
        eyes.Arianna0Ballet = loadedObj.getObjectByName("Eyes");
        teeth.Arianna0Ballet = loadedObj.getObjectByName("Teeth");
        clothing.Arianna0Ballet = loadedObj.getObjectByName("Clothing");
        
        pose.Arianna0Ballet.body = body.Arianna0Ballet.children[0];
        pose.Arianna0Ballet.hair = hair.Arianna0Ballet.children[0];
        pose.Arianna0Ballet.eyebrow = eyebrow.Arianna0Ballet.children[0];
        pose.Arianna0Ballet.tongue = tongue.Arianna0Ballet.children[0];
        pose.Arianna0Ballet.eyes = eyes.Arianna0Ballet.children[0];
        pose.Arianna0Ballet.teeth = teeth.Arianna0Ballet.children[0];
        pose.Arianna0Ballet.clothing = clothing.Arianna0Ballet.children[0];
        
        //remove invisible materials...
        body.Arianna0Ballet.material.transparent = false;
        hair.Arianna0Ballet.material.transparent = false;
        eyebrow.Arianna0Ballet.material.transparent = false;
        tongue.Arianna0Ballet.material.transparent = false;
        eyes.Arianna0Ballet.material.transparent = false;
        teeth.Arianna0Ballet.material.transparent = false;
        clothing.Arianna0Ballet.material.transparent = false;
        
        //fixing weird eyes
        eyes.Arianna0Ballet.material.depthWrite = false;
        
        //moving AriannaChina
        pose.setpos("Arianna0Ballet",-40,pose.getpos("Arianna0Ballet").y,0);
        
        scene.add(body.Arianna0Ballet);
        scene.add(hair.Arianna0Ballet);
        scene.add(eyes.Arianna0Ballet);
        scene.add(teeth.Arianna0Ballet);
        scene.add(tongue.Arianna0Ballet);
        scene.add(eyebrow.Arianna0Ballet);
        scene.add(clothing.Arianna0Ballet);
    }
);


//testing GLTFLoader (result: no difference, but more annoying)
/*var GLTFLoad = new THREE.GLTFLoader();
GLTFLoad.load(
    "models/eye.gltf",
    function(loadedObj){
        console.log(loadedObj);
        window["testGLTF"] = loadedObj;
        //var eye = loadedObj.getObjectByName("Eyes");
        //eye.position.x = -40;
        //scene.add(eye);
    }
);*/

//rendering
camera.position.z = 50;
camera.position.y = 25;

/*function gameCode(){
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
}*/

//This is the loop
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

//game stuff will be run in setinterval