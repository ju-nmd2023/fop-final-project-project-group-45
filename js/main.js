let player = { maxHealth: 100, lives: 3, sprite: "" }; //player ship object. Stores all important information about the player.
let playerHealth; //player health variable. Used while the game is playing.
let playerFullHealthImg; //sprite of base ship
let playerEngineFireIdle; //idle engine fire sprite
let shipBaseEngineImg; //standard engine sprite
let shipBaseEngine; //standard engine variable
let testBackground2; //background image
let hudbackground; //hud background image
let hudbackgroundImg; //hud background image
let healthBarBorderSprite; //sprite sheet for the healthbar border
let healthBarSprite; // sprite sheet for the healthbar
let livesSprite;
let startscreenBackground;
let creditsSprite;
let allCreditContainers;
let asteroidSpriteImg;
let asteroidFlameImg;
let creditsValue = 0;
let asteroidObject = { base: "", flame: "", collider: "", group: "" };
let asteroidBaseGroup = [];
let asteroidColliderGroup = [];
let asteroidFlameGroup = [];
let pauseButtonImg;
let pauseButtonSprite;
let mainProjectileImg;
let bulletObject = { base: "", collider: "", group: "" };
let bulletGroup = [];
let healthBarImg;
let pauseMenuBackgroundImg;
let pauseMenuBackgroundSprite;
let pauseMenuBackgroundDarkerSprite;
let pauseMenuContainer;
let numberOfBullets;
let pauseMenuLogo;
let y1 = -650;
let y2 = -1650;
let gameIsRunning = true; //if a stage is currently being played. Used to set if the cursor should be showned.
let gameIsPaused = false; //if a stage is currently being played but the player has paused it. Used to set if the cursor should be showed.
let creditText;
let resumeButton;
let exitButton;
let startMenuContainer;

function preload() {
  startscreenBackground = loadImage("./assets/backgrounds/startscreen.png");
  playerFullHealthImg = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  playerMediumHealthImg = loadImage("./assets/sprites/player/base_ship/base_ship_slight_damaged.png");
  playerLowHealthImg = loadImage("./assets/sprites/player/base_ship/base_ship_very_damaged.png");
  shipBaseEngineImg = loadImage("./assets/sprites/player/engine/ship_base_engine.png");
  testBackground2 = loadImage("./assets/backgrounds/spaceBackground.png");
  hudbackgroundImg = loadImage("./assets/sprites/interface/hud_background.png");
  pauseButtonImg = loadImage("./assets/sprites/interface/pauseButton.png");
  asteroidSpriteImg = loadImage("./assets/sprites/enemies/asteroid/asteroid_explode.png");
  asteroidFlameImg = loadImage("./assets/sprites/enemies/asteroid/asteroid_flame.png");
  mainProjectileImg = loadImage("./assets/sprites/player/weapons/main_projectile.png");
  healthBarImg = loadImage("./assets/sprites/interface/healthbar.png");
  pauseMenuBackgroundImg = loadImage("./assets/sprites/interface/pauseMenuBackground.png");
}
function setup() {
  new Canvas(225, 350, "pixelated x2"); //pixelated x2 upscales the sprites to become the correct size and resolution.
  allSprites.pixelPerfect = true;
  canvasLeftCollider = new Sprite(-1, 0, 1, 700, "static"); //colliders to keep the character inside the canvas
  canvasTopCollider = new Sprite(-1, 0, 450, 1, "static");
  canvasRightCollider = new Sprite(226, 0, 1, 700, "static");
  canvasBottomCollider = new Sprite(0, 351, 450, 1, "static");
  bulletObject.group = new Group();
  asteroidObject.group = new Group();
  resumeButton = document.querySelector("#resumeButton");
  resumeButton.addEventListener("click", function () {
    gameIsPaused = false;
    unpauseGame();
  });
  exitButton = document.querySelector("#exitButton");
  exitButton.addEventListener("click", function () {
    gameIsPaused = false;
    gameIsRunning = false;
  });
  frameRate(60);

  //Player Sprites
  loadPlayer();

  //Enemies
  //loadEnemies();
  loadEnemies();

  //GUI
  loadGUI();
}

function loadGUI() {
  hudbackground = new Sprite(112, 334, 225, 32, "static"); //hud background sprite
  hudbackground.img = hudbackgroundImg;
  hudbackground.layer = 100;
  healthBarBorderSprite = new Sprite(66, 334, 96, 16, "none"); //healthbarborder sprite
  healthBarBorderSprite.spriteSheet = healthBarImg;
  healthBarBorderSprite.addAnis({
    border: { col: 0, frames: 1 },
  });

  healthBarSprite = new Sprite(66, 334, 96, 16, "none"); //healthbar sprite
  healthBarSprite.spriteSheet = healthBarImg;

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
  livesSprite.spriteSheet = "./assets/sprites/interface/hearts.png";
  livesSprite.addAnis({
    lives3: { col: 0, frames: 1 },
    lives2: { col: 1, frames: 1 },
    lives1: { col: 2, frames: 1 },
  });
  livesSprite.changeAni("lives3");

  creditsSprite = new Sprite(180, 334, 16, 16, "none");
  creditsSprite.spriteSheet = "./assets/sprites/interface/ingot.png";
  creditsSprite.scale = 1;
  creditsSprite.layer = 100;

  creditsSprite.addAnis({
    lives3: { col: 0, frames: 1 },
  });

  allCreditContainers = document.querySelector(".credits-container");
  creditText = document.createElement("p");
  allCreditContainers.appendChild(creditText);

  pauseButtonSprite = new Sprite(200, 25, 32, 32, "none");
  pauseButtonSprite.img = pauseButtonImg;
  pauseButtonSprite.scale = 1;

  pauseMenuBackgroundSprite = new Sprite(112, 150, "none");
  pauseMenuBackgroundSprite.img = pauseMenuBackgroundImg;
  pauseMenuBackgroundSprite.layer = 105;
  pauseMenuBackgroundSprite.visible = false;

  pauseMenuBackgroundDarkerSprite = new Sprite(112, 160, 225, 400, "none");
  pauseMenuBackgroundDarkerSprite.fill = "rgba(0, 0, 0, 0.5)";
  pauseMenuBackgroundDarkerSprite.stroke = "rgba(0, 0, 0, 0.5)";
  pauseMenuBackgroundDarkerSprite.layer = 104;
  pauseMenuBackgroundDarkerSprite.visible = false;
}

function loadEnemies() {
  let x = 1000;
  let y = 1000;
  asteroidObject.flame = new Sprite(x, y, 96, 96, "none");
  asteroidObject.flame.spriteSheet = asteroidFlameImg;
  asteroidObject.flame.addAnis({
    flame: { col: 0, frames: 3 },
  });
  asteroidObject.flame.changeAni("flame");
  asteroidObject.flame.anis.frameDelay = 8;
  asteroidObject.flame.anis.rotation = -90;
  asteroidObject.flame.anis.looping = true;
  asteroidObject.flame.overlaps(allSprites);
  asteroidFlameGroup.push(asteroidObject.flame);

  asteroidObject.base = new Sprite(x, y, 96, 96, "none");
  //asteroidObject.base.scale = 1;
  asteroidObject.base.spriteSheet = asteroidSpriteImg;
  asteroidObject.base.addAnis({
    base: { col: 0, frames: 1 },
    explosion: { col: 1, frames: 6 },
  });
  asteroidObject.base.changeAni("base");
  asteroidObject.base.vel.y = 1.6;
  asteroidObject.base.overlaps(allSprites);
  asteroidObject.base.anis.looping = false;
  asteroidObject.base.anis.frameDelay = 6;
  asteroidBaseGroup.push(asteroidObject.base);

  asteroidObject.flame.overlaps(allSprites);

  let flameGlue = new GlueJoint(asteroidObject.base, asteroidObject.flame);
  flameGlue.visible = false;

  asteroidObject.collider = new Sprite(x, y, 32, 32, "dynamic");
  //asteroidObject.group.add(asteroidObject.collider);
  //console.log(asteroidObject.group.length);
  asteroidObject.collider.color = "blue";
  asteroidObject.collider.visible = false;

  asteroidObject.collider.overlaps(allSprites);
  let glue = new GlueJoint(asteroidObject.base, asteroidObject.collider);
  glue.visible = false;
  asteroidObject.base.vel.y = 6;
  asteroidColliderGroup.push(asteroidObject.collider);

  //console.log(asteroidObject.group.length);
  asteroidObject.base.life = 1000;
  asteroidObject.flame.life = 1000;
  asteroidObject.collider.life = 1000;
  asteroidObject.base.layer = 99;
  asteroidObject.collider.layer = 99;
  asteroidObject.flame.layer = 99;
}

function draw() {
  clear();
  if (kb.presses("escape")) {
    //pause or unpause the game.
    gameIsPaused = !gameIsPaused;
    if (!gameIsPaused) {
      unpauseGame();
    }
  }
  if (gameIsRunning && gameIsPaused === false) {
    canvas.style.setProperty("--cursorMode", "none");
    playscreen();
  } else if (gameIsRunning || gameIsPaused) {
    pauseGame();
  } else if (gameIsRunning === false) {
    canvas.style.setProperty("--cursorMode", "auto");
    startscreen();
    //Main Menu Screen
    //Shop
    //Playbutton
    //Settings
  }
  allSprites.draw(); //To draw all sprites before drawing the text, making sure the text stays on top of the sprites.
}
function updateCredits() {
  creditText.innerHTML = creditsValue;
}

function startscreen() {
  console.log("startscreen");
  image(startscreenBackground, 0, 0, 225, 350);
  pauseMenuBackgroundSprite.visible = false;
  pauseMenuBackgroundDarkerSprite.visible = false;
  healthBarSprite.visible = false;
  healthBarBorderSprite.visible = false;
  livesSprite.visible = false;
  creditsSprite.visible = false;
  pauseButtonSprite.visible = false;
  hudbackground.visible = false;
  pauseMenuContainer.style.display = "none";
  player.sprite.visible = false;
  shipBaseEngine.visible = false;
  playerEngineFireIdle.visible = false;

  startMenuContainer = document.querySelector("#startScreenContainer");
  startMenuContainer.style.display = "flex";
}

function playscreen() {
  backgroundMovement();
  playerMovement();
  enemySpawner();
  asteroidCollision();
  document.getElementById("credits-playscreen").style.display = "block";
  updateCredits();
  updateHealth();
}
function pauseGame() {
  creditText.style.opacity = "30%";
  canvas.style.setProperty("--cursorMode", "auto");
  player.sprite.vel.y = 0;
  player.sprite.vel.x = 0;
  playerEngineFireIdle.animation.pause();
  bulletObject.group.vel.y = 0;
  for (let asteroidIndex in asteroidBaseGroup) {
    asteroidBaseGroup[asteroidIndex].vel.y = 0;
    asteroidBaseGroup[asteroidIndex].animation.pause();
    asteroidFlameGroup[asteroidIndex].life = 0;
    asteroidColliderGroup[asteroidIndex].life = 0;
    asteroidBaseGroup[asteroidIndex].life = 0;
    asteroidFlameGroup[asteroidIndex].animation.pause();
  }
  for (let bulletIndex in bulletGroup) {
    bulletGroup[bulletIndex].animation.pause();
    bulletGroup[bulletIndex].life = 0;
    bulletGroup[bulletIndex].layer = 0;
  }
  image(testBackground2, 0, y1, 225, 1000);
  image(testBackground2, 0, y2, 225, 1000);
  pauseMenuBackgroundSprite.visible = true;
  pauseMenuBackgroundDarkerSprite.visible = true;
  pauseMenuContainer = document.querySelector("#pauseScreenContainer");
  pauseMenuContainer.style.display = "block";
}
function unpauseGame() {
  creditText.style.opacity = "100%";
  canvas.style.setProperty("--cursorMode", "none");
  playerEngineFireIdle.animation.play();
  bulletObject.group.vel.y = -3;
  bulletObject.base.animation.play();
  for (let asteroidIndex in asteroidBaseGroup) {
    asteroidBaseGroup[asteroidIndex].vel.y = 6;
    asteroidFlameGroup[asteroidIndex].life = 1000;
    asteroidColliderGroup[asteroidIndex].life = 1000;
    asteroidBaseGroup[asteroidIndex].life = 1000;
    asteroidFlameGroup[asteroidIndex].animation.play();
  }
  for (let bulletIndex in bulletGroup) {
    bulletGroup[bulletIndex].animation.play();
    bulletGroup[bulletIndex].life = 100;
    bulletGroup[bulletIndex].layer = 1;
  }
  pauseMenuBackgroundSprite.visible = false;
  pauseMenuBackgroundDarkerSprite.visible = false;
  pauseMenuContainer.style.display = "none";
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

//Make a playscreen, start coding level 1

//Ship function restores health, etc.

async function killAsteroid(base, flame, collider) {
  flame.remove();
  collider.remove();
  await delay(600);
  base.remove();
}

function enemySpawner() {
  let randomFrameCount = Math.floor(random(50, 80));
  let x = random(20, 210);

  if (frameCount % randomFrameCount === 0) {
    spawnAsteroid(x, -50);
  }
}

function spawnAsteroid(x, y) {
  asteroidObject.flame = new Sprite(x, y, 96, 96, "none");
  asteroidObject.flame.spriteSheet = asteroidFlameImg;
  asteroidObject.flame.addAnis({
    flame: { col: 0, frames: 3 },
  });
  asteroidObject.flame.changeAni("flame");
  asteroidObject.flame.anis.frameDelay = 8;
  asteroidObject.flame.anis.rotation = -90;
  asteroidObject.flame.anis.looping = true;
  asteroidObject.flame.overlaps(allSprites);
  asteroidFlameGroup.push(asteroidObject.flame);

  asteroidObject.base = new Sprite(x, y, 96, 96, "none");
  asteroidObject.base.spriteSheet = asteroidSpriteImg;
  asteroidObject.base.addAnis({
    base: { col: 0, frames: 1 },
    explosion: { col: 1, frames: 6 },
  });
  asteroidObject.base.changeAni("base");
  asteroidObject.base.vel.y = 1.6;
  asteroidObject.base.overlaps(allSprites);
  asteroidObject.base.anis.looping = false;
  asteroidObject.base.anis.frameDelay = 6;
  asteroidBaseGroup.push(asteroidObject.base);

  asteroidObject.flame.overlaps(allSprites);
  let flameGlue = new GlueJoint(asteroidObject.base, asteroidObject.flame);
  flameGlue.visible = false;

  asteroidObject.collider = new Sprite(x, y, 32, 32, "dynamic");
  asteroidObject.collider.color = "blue";
  asteroidObject.collider.visible = false;
  asteroidObject.collider.overlaps(allSprites);

  let glue = new GlueJoint(asteroidObject.base, asteroidObject.collider);
  glue.visible = false;
  asteroidObject.base.vel.y = 6;
  asteroidColliderGroup.push(asteroidObject.collider);

  asteroidObject.base.life = 1000;
  asteroidObject.flame.life = 1000;
  asteroidObject.collider.life = 1000;
  asteroidObject.base.layer = 99;
  asteroidObject.collider.layer = 99;
  asteroidObject.flame.layer = 99;

  //This group is only for the bullet collision in createbullet function.
  asteroidObject.group.add(asteroidObject.collider);
}
