let player = { health: 100, lives: 3, sprite: "" }; //player ship object. Stores all important information about the player.
let playerBaseSprite;
let testBackground;
let y1 = -650;
let y2 = -1650;
function preload() {
  playerBaseSprite = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  testBackground = loadImage("./assets/backgrounds/space_background_test.png");
  testBackground2 = loadImage("./assets/backgrounds/space_background_test2.png");
}
function setup() {
  new Canvas(200, 350, "pixelated x2"); //pixelated x2 upscales the sprites to become the correct size and resolution.
  canvasLeftCollider = new Sprite(-1, 0, 1, 700, "static"); //colliders to keep the character inside th ecanvas
  canvasTopCollider = new Sprite(-1, 0, 400, 1, "static");
  canvasRightCollider = new Sprite(201, 0, 1, 700, "static");
  canvasBottomCollider = new Sprite(0, 351, 400, 1, "static");
  /*allSprites.overlaps(canvasBottomCollider);
  allSprites.overlaps(canvasTopCollider);
  allSprites.overlaps(canvasRightCollider);
  allSprites.overlaps(canvasLeftCollider);*/
  allSprites.pixelPerfect = true;
  frameRate(60);
  player.sprite = new Sprite(32, 32, 32, 32); //creates the sprite object
  player.sprite.img = playerBaseSprite; //loads the sprite image
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
}
function backgroundMovement() {
  image(testBackground, 0, y1, 200, 1000);
  image(testBackground, 0, y2, 200, 1000);
  y1 += 5;
  y2 += 5;

  if (y1 == 350) {
    y1 = -1650;
  }
  if (y2 == 350) {
    y2 = -1650;
  }
  print(y1);
  print(y2);
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
