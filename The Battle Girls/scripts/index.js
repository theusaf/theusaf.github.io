/*notes: 
BoxGeometry appears to mean x,y,z and auto gens your cubes and faces.
MeshBasicMaterial defines a color / image to color the faces? Uses 0x+hex for hex
Mesh is the actual objects which combines all of these rules.
Note: scene.add adds object at pos 0,0,0
*/
//setup
/*global THREE*/
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(74, document.body.clientWidth / document.body.clientHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(document.body.clientWidth, document.body.clientHeight);
document.body.appendChild(renderer.domElement);

//creating cubes
var cubeShape = new THREE.BoxGeometry(1,1,1);
var cubeMaterial = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
var cube = new THREE.Mesh(cubeShape, cubeMaterial);
scene.add(cube);

//rendering
camera.position.z = 5;

function gameCode(){
    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;
}

//This is the loop
function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	
	gameCode();
}
animate();