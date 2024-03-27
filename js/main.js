let ball;
let player = {health: 100, lives: 3 };
//Ship object, 
function setup() {
	new Canvas(400, 700);
	frameRate(30);

	ball = new Sprite();
	ball.diameter = 50;
}

function draw() {
	
	background('gray');

	
	//Main Menu Screen
		//Shop
		//Playbutton
		//Settings
	//Playscreen
	playscreen();
		//Level 1
			//Waves
		//Level 2...
}

function playscreen(){
	
}
//Make a playscreen, start coding level 1

//Ship function restores health, etc.