let player = { health: 100, lives: 3, sprite: "" }; //player ship object. Stores all important information about the player.
let playerBaseShipImg; //sprite of base ship
let playerEngineFireIdle; //idle engine fire sprite
let shipBaseEngineImg; //standard engine sprite
let shipBaseEngine; //standard engine variable
let testBackground2; //background image
let hudbackground; //hud background image
let hudbackgroundImg; //hud background image
let healthBarBorderSprite; //sprite sheet for the healthbar border
let healthBarSprite; // sprite sheet for the healthbar
let livesSprite;
let creditsSprite;
let creditsValue = 100;
let smallFont;

let creditsTextSprite;

let pauseButtonImg;
let pauseButtonSprite;
let y1 = -650;
let y2 = -1650;
let gameIsRunning = true; //if a stage is currently being played. Used to set if the cursor should be showned.
let gameIsPaused = false; //if a stage is currently being played but the player has paused it. Used to set if the cursor should be showed.

function preload() {
  playerBaseShipImg = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  shipBaseEngineImg = loadImage("./assets/sprites/player/engine/ship_base_engine.png");
  testBackground2 = loadImage("./assets/backgrounds/space_background_test2.png");
  hudbackgroundImg = loadImage("./assets/sprites/GUI/hud_background.png");
  pauseButtonImg = loadImage("./assets/sprites/GUI/pauseButton.png");
  smallFont = loadFont("./assets/fonts/small_font.ttf");
}
function setup() {
  new Canvas(225, 350, "pixelated x2"); //pixelated x2 upscales the sprites to become the correct size and resolution.
  allSprites.pixelPerfect = true;
  canvasLeftCollider = new Sprite(-1, 0, 1, 700, "static"); //colliders to keep the character inside the canvas
  canvasTopCollider = new Sprite(-1, 0, 450, 1, "static");
  canvasRightCollider = new Sprite(226, 0, 1, 700, "static");
  canvasBottomCollider = new Sprite(0, 351, 450, 1, "static");
  /*allSprites.overlaps(canvasBottomCollider);
  allSprites.overlaps(canvasTopCollider);
  allSprites.overlaps(canvasRightCollider);
  allSprites.overlaps(canvasLeftCollider);*/
  frameRate(60);

  //Player Sprites
  loadPlayer();

  //GUI
  loadGUI();
}

function loadGUI() {
  hudbackground = new Sprite(112, 334, 225, 32, "static"); //hud background sprite
  hudbackground.img = hudbackgroundImg;
  healthBarBorderSprite = new Sprite(66, 334, 96, 16, "none"); //healthbarborder sprite
  healthBarBorderSprite.spriteSheet = "./assets/sprites/GUI/healthbar.png";
  healthBarBorderSprite.addAnis({
    border: { col: 0, frames: 1 },
  });

  healthBarSprite = new Sprite(66, 334, 96, 16, "none"); //healthbar sprite
  healthBarSprite.spriteSheet = "./assets/sprites/GUI/healthbar.png";
  healthBarSprite.addAnis({
    //adding a state for every sprite
    health100: { col: 1, frames: 1 },
    health94: { col: 2, frames: 1 },
    health88: { col: 3, frames: 1 },
    health81: { col: 4, frames: 1 },
    health75: { col: 5, frames: 1 },
    health69: { col: 6, frames: 1 },
    health63: { col: 7, frames: 1 },
    health56: { col: 8, frames: 1 },
    health50: { col: 9, frames: 1 },
    health44: { col: 10, frames: 1 },
    health38: { col: 11, frames: 1 },
    health31: { col: 12, frames: 1 },
    health25: { col: 13, frames: 1 },
    health19: { col: 14, frames: 1 },
    health13: { col: 15, frames: 1 },
    health6: { col: 16, frames: 1 },
  });
  healthBarSprite.changeAni("health100");

  livesSprite = new Sprite(140, 334, 48, 16, "none"); //lives sprite
  livesSprite.spriteSheet = "./assets/sprites/GUI/hearts.png";
  livesSprite.addAnis({
    lives3: { col: 0, frames: 1 },
    lives2: { col: 1, frames: 1 },
    lives1: { col: 2, frames: 1 },
  });
  livesSprite.changeAni("lives3");

  creditsSprite = new Sprite(180, 334, 16, 16, "none");
  creditsSprite.spriteSheet = "./assets/sprites/GUI/ingot.png";
  creditsSprite.scale = 1;
  
  creditsSprite.addAnis({
    lives3: { col: 0, frames: 1 },
  });

  creditsTextSprite = new Sprite(160, 334, 16, 16, "none");
  creditsTextSprite.text = creditsValue;
  creditsTextSprite.textSize = 8;
  creditsTextSprite.textFont = smallFont;
  creditsTextSprite.textColor = "white";

}

function loadPlayer() {
  shipBaseEngine = new Sprite(32, 32, 32, 32);
  shipBaseEngine.img = shipBaseEngineImg;
  shipBaseEngine.offset.y = 2;

  player.sprite = new Sprite(32, 32, 32, 32); //creates the sprite object
  player.sprite.img = playerBaseShipImg; //loads the sprite image

  playerEngineFireIdle = new Sprite(32, 32, 48, 48);
  playerEngineFireIdle.spriteSheet = "./assets/sprites/player/engine/engine_idle.png";

  playerEngineFireIdle.anis.frameDelay = 8;
  playerEngineFireIdle.anis.looping = true;

  playerEngineFireIdle.addAnis({
    idle: { row: 0, frames: 4 },
  });

  playerEngineFireIdle.overlaps(allSprites);
  new GlueJoint(player.sprite, playerEngineFireIdle);
  new GlueJoint(player.sprite, shipBaseEngine);

  pauseButtonSprite = new Sprite(200, 25, 32, 32, "none");
  pauseButtonSprite.img = pauseButtonImg;
  pauseButtonSprite.scale = 1;
}

function draw() {
  clear();
  
  playscreen();
  allSprites.draw(); //To draw all sprites before drawing the text, making sure the text stays on top of the sprites.
  updateCredits();  
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
function updateCredits(){
  fill(255,255,255);
  textSize(10);
  textFont(smallFont);
  text(creditsValue, 180, 334);
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
  player.sprite.rotationLock = true;
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
