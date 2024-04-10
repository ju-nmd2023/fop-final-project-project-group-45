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
let allCreditContainers;
let creditsValue = 100;
let asteroidObject = { base: "", flame: "", collider: "" };
let asteroids = [];
/*
let smallFont;
let creditsTextSprite;
*/
let pauseButtonImg;
let pauseButtonSprite;
let y1 = -650;
let y2 = -1650;
let gameIsRunning = true; //if a stage is currently being played. Used to set if the cursor should be showned.
let gameIsPaused = false; //if a stage is currently being played but the player has paused it. Used to set if the cursor should be showed.
let creditText;

function preload() {
  playerBaseShipImg = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  shipBaseEngineImg = loadImage("./assets/sprites/player/engine/ship_base_engine.png");
  testBackground2 = loadImage("./assets/backgrounds/space_background_test2.png");
  hudbackgroundImg = loadImage("./assets/sprites/GUI/hud_background.png");
  pauseButtonImg = loadImage("./assets/sprites/GUI/pauseButton.png");

  //smallFont = loadFont("./assets/fonts/small_font.ttf");
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

  //load enemies
  loadEnemies();

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

  allCreditContainers = document.querySelector(".credits-container");
  creditText = document.createElement("p");
  allCreditContainers.appendChild(creditText);
  /*creditsTextSprite = new Sprite(160, 334, 16, 16, "none");
  creditsTextSprite.text = creditsValue;
  creditsTextSprite.textSize = 8;
  creditsTextSprite.textFont = smallFont;
  creditsTextSprite.textColor = "white";*/
}

function loadPlayer() {
  shipBaseEngine = new Sprite(32, 32, 32, 32);
  shipBaseEngine.img = shipBaseEngineImg;
  shipBaseEngine.offset.y = 2;

  player.sprite = new Sprite(32, 32, 32, 32); //creates the sprite object
  player.sprite.img = playerBaseShipImg; //loads the sprite image
  player.sprite.addSensor(0, 0, 32, 32); //adds a sensor to the sprite
  player.sprite.debug = true; //turns on the debug mode for the sprite

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

function loadEnemies() {
  asteroidObject.flame = new Sprite(90, 50, 96, 96, "none");
  asteroidObject.flame.spriteSheet = "./assets/sprites/enemies/asteroid/asteroid_flame.png";
  asteroidObject.flame.addAnis({
    flame: { col: 0, frames: 3 },
  });
  asteroidObject.flame.changeAni("flame");
  asteroidObject.flame.anis.frameDelay = 8;
  asteroidObject.flame.anis.rotation = -90;
  asteroidObject.flame.anis.looping = true;

  asteroidObject.base = new Sprite(90, 50, 96, 96, "dynamic");
  asteroidObject.base.scale = 1;
  asteroidObject.base.spriteSheet = "./assets/sprites/enemies/asteroid/asteroid_explode.png";
  asteroidObject.base.addAnis({
    base: { col: 0, frames: 1 },
    explosion: { col: 1, frames: 6 },
  });
  asteroidObject.base.changeAni("base");
  asteroidObject.base.addSensor(0, 0, 48, 48);
  //asteroidObject.base.offset.x = 20;
  asteroidObject.base.width = 96;
  asteroidObject.base.height = 96;
  asteroidObject.base.overlaps(allSprites);

  asteroidObject.flame.overlaps(allSprites);
  new GlueJoint(asteroidObject.base, asteroidObject.flame);

  asteroidObject.collider = new Sprite(90, 50, 38, 36, "dynamic");
  asteroidObject.collider.color = "blue";
  asteroidObject.collider.visible = false;
  asteroidObject.collider.overlaps(allSprites);
  new GlueJoint(asteroidObject.base, asteroidObject.collider);
}

function draw() {
  clear();
  playscreen();
  playerCollision();
  enemySpawner();
  allSprites.draw(); //To draw all sprites before drawing the text, making sure the text stays on top of the sprites.

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
function updateCredits() {
  /*fill(255,255,255);
  textSize(10);
  textFont(smallFont);
  text(creditsValue, 180, 334);*/

  creditText.innerHTML = creditsValue;
}

function playscreen() {
  backgroundMovement();
  playerMovement();
  document.getElementById("credits-playscreen").style.display = "block";
  updateCredits();
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

  //shooting

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

function playerCollision() {
  asteroidObject.base.vel.y = 1.6;
  /*player.sprite.overlaps(asteroidObject.base, function (player, asteroid) {
    asteroid.changeAni("explosion");
    asteroid.anis.looping = false;
    asteroid.anis.frameDelay = 8;
    asteroid.onAnimationEnd = function () {
      asteroid.remove();
    };
    player.remove();
  });*/
  if (player.sprite.overlaps(asteroidObject.collider)) {
    console.log("collision");
    asteroidObject.base.changeAni("explosion");
    asteroidObject.base.anis.looping = false;
    asteroidObject.base.anis.frameDelay = 6;
    killAsteroid(asteroidObject.base, asteroidObject.collider, asteroidObject.flame);
  }
  if (canvasBottomCollider.overlapped(asteroidObject.collider)) {
    asteroidObject.base.remove();
    asteroidObject.collider.remove();
    asteroidObject.flame.remove();
    print("hit");
  }
}
async function killAsteroid(base, collider, flame) {
  flame.remove();
  collider.remove();
  await delay(600);
  base.remove();
}

function enemySpawner() {
  let randomFrameCOunt = Math.floor(random(180, 600));
  if (frameCount % randomFrameCOunt === 0) {
    createAsteroid(random(50, 200), 50);
  }
}
function createAsteroid(x, y) {
  console.log("created asteroid");
}
