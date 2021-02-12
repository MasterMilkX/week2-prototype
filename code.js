//set up the canvas
var canvas = document.createElement("canvas");
canvas.id = "game";
var ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 320;
document.body.appendChild(canvas);

var size = 16;

//camera
var camera = {
	x : 0,
	y : 0
};

var backgroundColor = "#dedede";

//KEYS

// directionals
var upKey = 87;     //[W]
var leftKey = 65;   //[A]
var rightKey = 68;  //[S]
var downKey = 83;   //[D]
var moveKeySet = [upKey, leftKey, rightKey, downKey];

// A and b
var a_key = 79;   //[O]
var b_key = 80;   //[P]
var actionKeySet = [a_key, b_key];

var keys = [];

//box character
var player = {
	x : canvas.width/2,
	y : canvas.height/2,
	size : 16,
	speed : 3,
	color : '#f00'
}


//////////////////    GENERIC FUNCTIONS   ///////////////


//checks if an element is in an array
function inArr(arr, e){
	if(arr.length == 0)
		return false;
	return arr.indexOf(e) !== -1
}


////////////////   KEYBOARD FUNCTIONS  //////////////////


// key events
var keyTick = 0;
var kt = null; 

function anyKey(){
	return anyMoveKey() || anyActionKey();
}

//check if any directional key is held down
function anyMoveKey(){
	return (keys[upKey] || keys[downKey] || keys[leftKey] || keys[rightKey])
}

function anyActionKey(){
	return (keys[a_key] || keys[b_key]);
}


////////////////   CAMERA FUNCTIONS   /////////////////

/*  OPTIONAL IF LARGE GAME MAP
//if within the game bounds
function withinBounds(x,y){
	var xBound = (x >= Math.floor(camera.x / size) - 1) && (x <= Math.floor(camera.x / size) + (canvas.width / size));
	return xBound;
}
//have the camera follow the player
function panCamera(){
	camera.x = 0;
	camera.y = 0;
	if(map.length != 0 && player.x > ((map[0].length) - ((canvas.width/size)/2)))
		camera.x = (map[0].length * size) - canvas.width;
	else if(player.x < ((canvas.width/size)/2))
		camera.y = 0;
	else
		camera.x = player.x *size - (canvas.width / 2);
	if(map.length != 0 && player.y > ((map.length) - ((canvas.height/size) / 2)))
		camera.y = (map.length * size) - canvas.height;
	else if(player.y < ((canvas.height/size)/2))
		camera.y = 0;
	else
		camera.y = player.y *size - (canvas.height / 2) + (size/2);
	camera.x += cam_offset.x;
	camera.y += cam_offset.y;
}
*/


//////////////////  RENDER FUNCTIONS  ////////////////////

function render(){
	ctx.save();
	//ctx.translate(-camera.x, -camera.y);		//camera
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//background
	ctx.fillStyle = backgroundColor;
	ctx.fillRect(0,0,canvas.width, canvas.height);
	
	/*   add draw functions here  */

	//draw a red box to represent the player
	ctx.fillStyle = player.color
	ctx.fillRect(player.x-player.size/2,player.y-player.size/2,player.size,player.size)
	
	ctx.restore();
}



//////////////   GAME LOOP FUNCTIONS   //////////////////

//game initialization function
function init(){
	let checkboxes = document.getElementsByClassName("featTog");
	for(let c=0;c<checkboxes.length;c++){
		checkboxes[c].onchange = function(){changeFeature(checkboxes[c].id)};
	}
}

//changes some feature of the game to show juiciness
function changeFeature(feat){
	console.log("changing " + feat);
	if(feat == "color"){
		player.color = (player.color == "#f00" ? "#00f" : "#f00");
	}else if(feat == "speed"){
		player.speed = (player.speed == 3 ? 5 : 3);
	}else if(feat == "background"){
		backgroundColor = (backgroundColor == "#dedede" ? "#000" : "#dedede");
	}
}

//main game loop
function main(){
	requestAnimationFrame(main);
	canvas.focus();

	//panCamera();

	render();

	//keyboard ticks
	var akey = anyKey();
	if(akey && kt == 0){
		kt = setInterval(function(){keyTick+=1}, 75);
	}else if(!akey){
		clearInterval(kt);
		kt = 0;
		keyTick=0;
	}

	//movement
	if(keys[upKey] && (player.y-player.size/2) > 0)
		player.y -= player.speed;
	if(keys[downKey] && (player.y+player.size/2) < canvas.height)
		player.y += player.speed;
	if(keys[leftKey] && (player.x-player.size/2) > 0)
		player.x -= player.speed;
	if(keys[rightKey] && (player.x+player.size/2) < canvas.width)
		player.x += player.speed;

	//debug
	var settings = "debug here";

	//document.getElementById('debug').innerHTML = settings;
}


/////////////////   HTML5 FUNCTIONS  //////////////////

//determine if valud key to press
document.body.addEventListener("keydown", function (e) {
	if(inArr(moveKeySet, e.keyCode)){
		keys[e.keyCode] = true;
	}else if(inArr(actionKeySet, e.keyCode)){
		keys[e.keyCode] = true;
	}
});

//check for key released
document.body.addEventListener("keyup", function (e) {
	if(inArr(moveKeySet, e.keyCode)){
		keys[e.keyCode] = false;
	}else if(inArr(actionKeySet, e.keyCode)){
		keys[e.keyCode] = false;
	}
});

//prevent scrolling with the game
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if(([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1)){
        e.preventDefault();
    }
}, false);


main();
