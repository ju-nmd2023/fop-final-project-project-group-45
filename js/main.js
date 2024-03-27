let player = { health: 100, lives: 3, sprite: "" };
let playerBaseSprite;
let testBackground;
let y1 = -600;
//Ship object,
function preload() {
  playerBaseSprite = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  testBackground = loadImage("./assets/backgrounds/space_background_test.png");
}
function setup() {
  new Canvas(200, 350, "pixelated x2");
  allSprites.pixelPerfect = true;
  frameRate(30);

  player.sprite = new Sprite(32, 32, 32, 32);
  player.sprite.img = playerBaseSprite;
}

function draw() {
  clear();
  image(testBackground, 0, y1, 200, 1000);
  y1 += 1;
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

function playscreen() {}
//Make a playscreen, start coding level 1

//Ship function restores health, etc.
