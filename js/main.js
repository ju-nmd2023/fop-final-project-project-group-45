let player = { health: 100, lives: 3, sprite: "" }; //player ship object. Stores all important information about the player.
let playerBaseSprite;
let playerEngineIdle;
let testBackground;
let y1 = -650;
let y2 = -1650;
let gameIsRunning = true; //if a stage is currently being played. Used to set if the cursor should be showned.
let gameIsPaused = false; //if a stage is currently being played but the player has paused it. Used to set if the cursor should be showned.
function preload() {
  playerBaseSprite = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  testBackground = loadImage("./assets/backgrounds/space_background_test.png");
  testBackground2 = loadImage("./assets/backgrounds/space_background_test2.png");
}
function setup() {
  new Canvas(225, 350, "pixelated x2"); //pixelated x2 upscales the sprites to become the correct size and resolution.
  allSprites.pixelPerfect = true;
  canvasLeftCollider = new Sprite(-1, 0, 1, 700, "static"); //colliders to keep the character inside th ecanvas
  canvasTopCollider = new Sprite(-1, 0, 450, 1, "static");
  canvasRightCollider = new Sprite(226, 0, 1, 700, "static");
  canvasBottomCollider = new Sprite(0, 351, 450, 1, "static");
  /*allSprites.overlaps(canvasBottomCollider);
  allSprites.overlaps(canvasTopCollider);
  allSprites.overlaps(canvasRightCollider);
  allSprites.overlaps(canvasLeftCollider);*/
  frameRate(60);
  player.sprite = new Sprite(32, 32, 32, 32); //creates the sprite object
  player.sprite.img = playerBaseSprite; //loads the sprite image
  playerEngineIdle = new Sprite();
  playerEngineIdle.spriteSheet = "./assets/sprites/player/engine/engine_idle.png";
  playerEngineIdle.anis.offset.x = 2;
  playerEngineIdle.anis.frameDelay = 8;
}

function draw() {
  clear();
  playscreen();
  //Main Menu Screen
  //Shop
  //Playbutton
  //Settings
  //Playscreen
  //playscreen();
  //Level 1
  //Waves
  //Level 2...
}

function playscreen() {
  backgroundMovement();
  playerMovement();
  if (kb.presses("escape")) {
    //turn on and off pause screen.
    gameIsPaused = !gameIsPaused;
  }
  if (gameIsRunning && gameIsPaused === false) {
    // a stage is being played and isn't paused.
    canvas.style.setProperty("--cursorMode", "none");
  } else if (gameIsRunning === false || gameIsPaused) {
    // a stage isn't being played or it's paused.
    canvas.style.setProperty("--cursorMode", "auto");
  }
}
function backgroundMovement() {
  image(testBackground2, 0, y1, 225, 1000);
  image(testBackground2, 0, y2, 225, 1000);
  y1 += 1;
  y2 += 1;

  if (y1 == 350) {
    y1 = -1650;
  }
  if (y2 == 350) {
    y2 = -1650;
  }
}
function playerMovement() {
  player.sprite.rotation = 0;
  player.sprite.moveTowards(mouse, 0.1);
  /*if (mouse.x >= 14 && mouse.x <= 186) {
    player.sprite.moveTowards(mouse, 1);
  } else {
    player.sprite.vel.x = 0;
    player.sprite.vel.y = 0;
  }
  player.sprite.debug = mouse.pressing();*/
}
//Make a playscreen, start coding level 1

//Ship function restores health, etc.
