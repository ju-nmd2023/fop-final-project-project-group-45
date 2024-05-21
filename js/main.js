let player = { maxHealth: 100, lives: 3, sprite: "", damage: 1, reloadspeed: 70 }; //player ship object. Stores all important information about the player.
let playerHealth; //player health variable. Used while the game is playing.
let playerFullHealthImg; //sprite of base ship
let playerEngineFireIdle; //idle engine fire sprite
let shipBaseEngineImg; //standard engine sprite
let shipBaseEngine; //standard engine variable
let playScreenSpaceBackground; //background image
let hudbackground; //hud background image
let hudbackgroundImg; //hud background image
let healthBarBorderSprite; //sprite sheet for the healthbar border
let healthBarSprite; // sprite sheet for the healthbar
let livesSprite;
let startscreenBackgroundSprite, startscreenBackgroundImg;
let creditsSprite;
let allCreditContainers;
let asteroidSpriteImg;
let asteroidFlameImg;
let creditsValue = 0;
let asteroidObject = { base: "", flame: "", collider: "", group: "", velY: 3, velX: 0, health: 1, spawnRate: 90 };
let asteroidHealthGroup = [];
let difficultyKillCounter = 0; //Counter for the amount of kills that is reset for every 5 kills.
let killCount = 0; //Counter for the amount of kills that is reset for every game.
let asteroidBaseGroup = [];
let asteroidColliderGroup = [];
let asteroidFlameGroup = [];
let pauseButtonImg;
let pauseButtonSprite;
let mainProjectileImg;
let bulletObject = { base: "", collider: "", group: "" };
let bulletGroup = [];
let healthBarImg;
let gameOverContainer, gameOverDarkBackground;
let pauseMenuBackgroundImg, pauseMenuBackgroundSprite, pauseMenuBackgroundDarkerSprite, pauseMenuContainer, launchGameContainer;
let numberOfBullets;
let pauseMenuLogo;
let y1 = -650;
let y2 = -1650;
let gameIsRunning = false; //if a stage is currently being played. Used to set if the cursor should be showned.
let gameIsPaused = false; //if a stage is currently being played but the player has paused it. Used to set if the cursor should be showed.
let creditText;
let startMenuContainer;
let alertBox;
let alertAnswer = "";
let alertBoxIsVisible = false;
let mainMenuSong, playScreenSong, gunShotSound, asteroidExplosionSound, asteroidHitSound, gameOverSound, playerDamageSound, confirmSound, cancelSound, playerLoseLifeSound;
let mainMenuHasBeenToggled = false;
let startButton,
  resumeButton,
  exitGameButton,
  shopButton,
  alertBoxYesButton,
  alertBoxNoButton,
  gameOverButton,
  launchGameButton,
  upgradeHealthButton,
  upgradeDamageButton,
  upgradeFireRateButton,
  upgradeCreditsDoublerButton,
  exitShopButton;
let gameScore,
  gameScoreContainer,
  highscore = 0;
let gameHasBeenLaunched = false;
let bulletDamageLevelSprite;
let bulletReloadSpeedLevelSprite;
let playerHealthLevelSprite;
let creditLevelSprite;
let creditGain = 1;
let bulletDamageLevel = 0,
  bulletReloadSpeedLevel = 0,
  playerHealthLevel = 0,
  creditsLevel = 0;
(highscore = 0), highscoreContainer;
let shopScreenContainer,
  shopIsOpen = false;
let asteroidBottomCollider;
let priceDamageLevel, priceReloadSpeedLevel, priceHealthLevel, priceCreditsLevel, priceContainer;
let priceDamageLevelTextElement, priceReloadSpeedLevelTextElement, priceHealthLevelTextElement, priceCreditsLevelTextElement;

//Buttons Class is created
class Button {
  constructor(width, height, text, type, onclick, sound) {
    this.width = width;
    this.height = height;
    this.text = text;
    this.type = type;
    this.onclick = onclick;
    this.backgroundColor = "rgba(0,0,0,0)";
    this.sound = sound;
  }
  draw() {
    //A standard div and p element is created for the button
    let button = document.createElement("div");
    let textElement = document.createElement("p");
    textElement.innerHTML = this.text;

    //Depending on the type of button it is assigned different classes and appended to different containers
    if (this.type === "startScreenButton") {
      document.querySelector("#startButtonGridContainer").appendChild(button);
      button.classList.add("startScreenButton");
    }
    if (this.type === "pauseScreenButton") {
      //draw pause screen button
      document.querySelector("#pauseButtonGridContainer").appendChild(button);
      button.classList.add("pauseScreenButton");
      button.style.backgroundColor = this.backgroundColor;
    }
    if (this.type === "alertScreenButton") {
      //draw exit button
      document.querySelector("#alertBoxButtonGrid").appendChild(button);
      button.classList.add("alertBoxButton");
      button.style.backgroundColor = this.backgroundColor;
    }
    if (this.type === "gameOverButton") {
      //draw exit button
      document.querySelector("#gameOverContainer").appendChild(button);
      button.classList.add("gameOverButton");
      button.style.backgroundColor = this.backgroundColor;
    }
    if (this.type === "launchButton") {
      //draw launch game button
      document.querySelector("#launchButtonGridContainer").appendChild(button);
      button.classList.add("startScreenButton");
      button.style.backgroundColor = this.backgroundColor;
    }

    if (this.type == "shopButton") {
      document.querySelector("#shopGrid").appendChild(button);
      button.classList.add("shopScreenButton");
      button.style.backgroundColor = this.backgroundColor;
    }
    if (this.type == "exitShopButton") {
      document.querySelector("#shopScreenContainer").appendChild(button);
      button.classList.add("shopExitButton");
      button.style.backgroundColor = this.backgroundColor;
    }

    //The button is styled and assigned an onclick function
    button.setAttribute("onclick", this.onclick);
    button.appendChild(textElement);
    button.style.width = this.width + "px";
    button.style.height = this.height + "px";
  }
}
class Redbutton extends Button {
  constructor(width, height, text, type, onclick) {
    super(width, height, text, type, onclick);
    this.backgroundColor = "rgba(255,0,0,1)";
  }
}

function preload() {
  startscreenBackgroundImg = loadImage("./assets/backgrounds/startscreen.png");
  playerFullHealthImg = loadImage("./assets/sprites/player/base_ship/base_ship_full_health.png");
  playerMediumHealthImg = loadImage("./assets/sprites/player/base_ship/base_ship_slight_damaged.png");
  playerLowHealthImg = loadImage("./assets/sprites/player/base_ship/base_ship_very_damaged.png");
  shipBaseEngineImg = loadImage("./assets/sprites/player/engine/ship_base_engine.png");
  playScreenSpaceBackground = loadImage("./assets/backgrounds/spaceBackground.png");
  hudbackgroundImg = loadImage("./assets/sprites/interface/hud_background.png");
  pauseButtonImg = loadImage("./assets/sprites/interface/pauseButton.png");
  asteroidSpriteImg = loadImage("./assets/sprites/enemies/asteroid/asteroid_explode.png");
  asteroidFlameImg = loadImage("./assets/sprites/enemies/asteroid/asteroid_flame.png");
  mainProjectileImg = loadImage("./assets/sprites/player/weapons/main_projectile.png");
  healthBarImg = loadImage("./assets/sprites/interface/healthbar.png");
  pauseMenuBackgroundImg = loadImage("./assets/sprites/interface/pauseMenuBackground.png");
  mainMenuSong = loadSound("./assets/audio/music/mainMenuMusic.mp3");
  playScreenSong = loadSound("./assets/audio/music/playScreenMusic.mp3");
  gunShotSound = loadSound("./assets/audio/sfx/gunShot.mp3");
  asteroidExplosionSound = loadSound("./assets/audio/sfx/asteroidExplosion.wav");
  confirmSound = loadSound("./assets/audio/sfx/confirm.wav");
  cancelSound = loadSound("./assets/audio/sfx/cancel.wav");
  playerDamageSound = loadSound("./assets/audio/sfx/playerDamage.wav");
  playerLoseLifeSound = loadSound("./assets/audio/sfx/playerLoseLife.wav");
  gameOverSound = loadSound("./assets/audio/sfx/gameOver.wav");
  asteroidHitSound = loadSound("./assets/audio/sfx/asteroidHit.mp3");
  playScreenSong.setVolume(0.9);
  mainMenuSong.loop();
  playScreenSong.loop();
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
  alertBox = document.querySelector("#alertBoxContainer"); //defining the alert box
  gameOverContainer = document.querySelector("#gameOverContainer");
  pauseMenuContainer = document.querySelector("#pauseScreenContainer");
  gameOverDarkBackground = document.querySelector("#gameOverDarkBackground");
  gameScoreContainer = document.querySelector("#gameScore");
  startMenuContainer = document.querySelector("#startScreenContainer");
  launchGameContainer = document.querySelector("#launchGameContainer");
  shopScreenContainer = document.querySelector("#shopScreenContainer");
  gameScore = document.createElement("p");
  gameScoreContainer.appendChild(gameScore);
  highscoreContainer = document.querySelector("#highscoreContainer");
  priceContainer = document.querySelector("#priceContainer");
  priceDamageLevelTextElement = document.querySelector("#damagePrice");
  priceReloadSpeedLevelTextElement = document.querySelector("#fireRatePrice");
  priceHealthLevelTextElement = document.querySelector("#healthPrice");
  priceCreditsLevelTextElement = document.querySelector("#doubleCreditsPrice");

  alertBoxYesButton = new Button(100, 30, "Yes", "alertScreenButton", "gameIsRunning = false; gameIsPaused = false; toggleExitAlertBox(); gameOver(); confirmSound.play();");
  alertBoxNoButton = new Button(100, 30, "No", "alertScreenButton", "toggleExitAlertBox(); cancelSound.play();");
  startButton = new Button(250, 50, "Start", "startScreenButton", "startGame(); confirmSound.play();");
  shopButton = new Button(250, 50, "Shop", "startScreenButton", "toggleShop(); confirmSound.play();");
  resumeButton = new Button(150, 30, "Resume", "pauseScreenButton", "gameIsPaused = false; unpauseGame(); cancelSound.play();");
  exitGameButton = new Redbutton(150, 30, "Exit", "pauseScreenButton", "toggleExitAlertBox(); cancelSound.play();");
  gameOverButton = new Button(
    120,
    30,
    "Main Menu",
    "gameOverButton",
    "document.querySelector('#gameOverContainer').style.display = 'none'; document.querySelector('#gameOverDarkBackground').style.display = 'none'; confirmSound.play();"
  );
  launchGameButton = new Button(300, 70, "Launch Game", "launchButton", "confirmSound.play(); gameHasBeenLaunched = true; launchGameContainer.style.display = 'none';");
  upgradeHealthButton = new Button(150, 30, "Health", "shopButton", "confirmSound.play(); upgradeButton('health');");
  upgradeDamageButton = new Button(150, 30, "Damage", "shopButton", "confirmSound.play(); upgradeButton('damage');");
  upgradeFireRateButton = new Button(150, 30, "Fire Rate", "shopButton", "confirmSound.play(); upgradeButton('firerate');");
  upgradeCreditsDoublerButton = new Button(150, 30, "Double Credits", "shopButton", "confirmSound.play(); upgradeButton('doubleCredits');");
  exitShopButton = new Redbutton(150, 30, "Exit Shop", "exitShopButton", "toggleShop(); cancelSound.play();");
  //exitShopButton = new Redbutton(150, 30, "Exit Shop", "exitShopButton",  "cancelSound.play();");
  resumeButton.draw();
  exitGameButton.draw();
  startButton.draw();
  shopButton.draw();
  alertBoxYesButton.draw();
  alertBoxNoButton.draw();
  gameOverButton.draw();
  launchGameButton.draw();
  upgradeHealthButton.draw();
  upgradeDamageButton.draw();
  upgradeFireRateButton.draw();
  upgradeCreditsDoublerButton.draw();
  exitShopButton.draw();

  frameRate(60);
  loadPlayer();
  loadEnemies();
  loadGUI();
}

function toggleExitAlertBox() {
  if (alertBoxIsVisible) {
    alertBox.style.display = "none";
    alertBoxIsVisible = false;
  } else {
    alertBox.style.display = "block";
    alertBoxIsVisible = true;
  }
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
  creditsSprite.layer = 101;

  creditsSprite.addAnis({
    lives3: { col: 0, frames: 1 },
  });

  allCreditContainers = document.querySelector(".creditsContainer");
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

  startscreenBackgroundSprite = new Sprite(112, 175, "none");
  startscreenBackgroundSprite.img = startscreenBackgroundImg;
  startscreenBackgroundSprite.layer = 100;
  startscreenBackgroundSprite.visible = false;

  bulletDamageLevelSprite = new Sprite(158, 166, 16, 8, "none");
  bulletDamageLevelSprite.scale = 2;
  bulletDamageLevelSprite.spriteSheet = "./assets/sprites/interface/upgradeLevel.png";
  bulletDamageLevelSprite.addAnis({
    level0: { col: 0, frames: 1 },
    level1: { col: 1, frames: 1 },
    level2: { col: 2, frames: 1 },
    level3: { col: 3, frames: 1 },
    level4: { col: 4, frames: 1 },
  });
  bulletDamageLevelSprite.changeAni("level0");
  bulletDamageLevelSprite.layer = 101;
  bulletDamageLevelSprite.visible = false;

  bulletReloadSpeedLevelSprite = new Sprite(68, 241, 16, 8, "none");
  bulletReloadSpeedLevelSprite.scale = 2;
  bulletReloadSpeedLevelSprite.spriteSheet = "./assets/sprites/interface/upgradeLevel.png";
  bulletReloadSpeedLevelSprite.addAnis({
    level0: { col: 0, frames: 1 },
    level1: { col: 1, frames: 1 },
    level2: { col: 2, frames: 1 },
    level3: { col: 3, frames: 1 },
    level4: { col: 4, frames: 1 },
  });
  bulletReloadSpeedLevelSprite.changeAni("level0");
  bulletReloadSpeedLevelSprite.layer = 101;
  bulletReloadSpeedLevelSprite.visible = false;

  playerHealthLevelSprite = new Sprite(68, 166, 16, 8, "none");
  playerHealthLevelSprite.scale = 2;
  playerHealthLevelSprite.spriteSheet = "./assets/sprites/interface/upgradeLevel.png";
  playerHealthLevelSprite.addAnis({
    level0: { col: 0, frames: 1 },
    level1: { col: 1, frames: 1 },
    level2: { col: 2, frames: 1 },
    level3: { col: 3, frames: 1 },
    level4: { col: 4, frames: 1 },
  });
  playerHealthLevelSprite.changeAni("level0");
  playerHealthLevelSprite.layer = 101;
  playerHealthLevelSprite.visible = false;

  creditLevelSprite = new Sprite(158, 241, 8, 8, "none");
  creditLevelSprite.scale = 2;
  creditLevelSprite.spriteSheet = "./assets/sprites/interface/creditUpgradeLevel.png";
  creditLevelSprite.addAnis({
    level0: { col: 0, frames: 1 },
    level1: { col: 1, frames: 1 },
  });
  creditLevelSprite.changeAni("level0");
  creditLevelSprite.layer = 101;
  creditLevelSprite.visible = false;
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

  //console.log(asteroidObject.group.length);
  asteroidObject.base.life = 1000;
  asteroidObject.flame.life = 1000;
  asteroidObject.collider.life = 1000;
  asteroidObject.base.layer = 99;
  asteroidObject.collider.layer = 99;
  asteroidObject.flame.layer = 99;

  asteroidBottomCollider = new Sprite(112, 360, 225, 1, "static");
  asteroidBottomCollider.overlaps(allSprites);
}

function draw() {
  clear();
  gameLaunch();
  if (kb.presses("escape") || pauseButtonSprite.mouse.presses()) {
    //pause or unpause the game.
    if (gameIsRunning) {
      gameIsPaused = !gameIsPaused;
      cancelSound.play();
      if (!gameIsPaused) {
        unpauseGame();
      }
    }
    if (alertBoxIsVisible) {
      alertBox.style.display = "none";
      alertBoxIsVisible = false;
    }
  }
  if (gameIsRunning && gameIsPaused === false) {
    canvas.style.setProperty("--cursorMode", "none");
    playscreen();
  } else if (gameIsRunning || gameIsPaused) {
    pauseGame();
  } else if (gameIsRunning === false && gameHasBeenLaunched === true) {
    canvas.style.setProperty("--cursorMode", "auto");
    startscreen();
  }
  allSprites.draw(); //To draw all sprites before drawing the text, making sure the text stays on top of the sprites.
}
function updateCredits() {
  creditText.innerHTML = creditsValue;
}

function startscreen() {
  if (!mainMenuHasBeenToggled) {
    playScreenSong.stop();
    mainMenuSong.play();
    mainMenuHasBeenToggled = true;
  }
  toggleMainMenu();
  if (shopIsOpen) {
    shopScreenContainer.style.display = "flex";
    startMenuContainer.style.display = "none";
    priceContainer.style.display = "grid";
    updatePrices();
  } else {
    shopScreenContainer.style.display = "none";
    startMenuContainer.style.display = "flex";
    priceContainer.style.display = "none";
  }
}

function playscreen() {
  backgroundMovement();
  playerMovement();
  enemySpawner();
  asteroidCollision();
  updateCredits();
  updateHealth();
  increaseDifficulty();
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
    asteroidBaseGroup[asteroidIndex].vel.x = 0;
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
  image(playScreenSpaceBackground, 0, y1, 225, 1000);
  image(playScreenSpaceBackground, 0, y2, 225, 1000);
  pauseMenuBackgroundSprite.visible = true;
  pauseMenuBackgroundDarkerSprite.visible = true;
  pauseMenuContainer.style.display = "block";
  playScreenSong.setVolume(0.4);
  asteroidExplosionSound.setVolume(0.1);
  gunShotSound.setVolume(0.1);
}
function unpauseGame() {
  creditText.style.opacity = "100%";
  canvas.style.setProperty("--cursorMode", "none");
  playerEngineFireIdle.animation.play();
  bulletObject.group.vel.y = -3;
  bulletObject.base.animation.play();
  for (let asteroidIndex in asteroidBaseGroup) {
    asteroidBaseGroup[asteroidIndex].vel.y = asteroidObject.velY;
    if (asteroidBaseGroup[asteroidIndex].x < 90) {
      asteroidBaseGroup[asteroidIndex].vel.x = -asteroidObject.velX;
    }
    if (asteroidBaseGroup[asteroidIndex].x > 144) {
      asteroidBaseGroup[asteroidIndex].vel.x = asteroidObject.velX;
    } else {
      asteroidBaseGroup[asteroidIndex].vel.x = 0;
    }
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
  playScreenSong.setVolume(0.9);
  asteroidExplosionSound.setVolume(0.3);
  gunShotSound.setVolume(0.5);
}
function toggleMainMenu() {
  updateCredits();
  startscreenBackgroundSprite.visible = true;
  highscoreContainer.style.display = "flex";
  highscoreContainer.innerHTML = "Highscore: " + highscore;
  pauseMenuBackgroundSprite.visible = false;
  pauseMenuBackgroundDarkerSprite.visible = false;
  healthBarSprite.visible = false;
  healthBarBorderSprite.visible = false;
  livesSprite.visible = false;
  pauseButtonSprite.visible = false;
  hudbackground.visible = false;
  pauseMenuContainer.style.display = "none";
  player.sprite.visible = false;
  shipBaseEngine.visible = false;
  playerEngineFireIdle.visible = false;
  startMenuContainer.style.display = "flex";
  creditText.style.opacity = "100%";
  creditsSprite.visible = true;
  updateCredits();
}
function startGame() {
  highscoreContainer.style.display = "none";
  mainMenuSong.stop();
  playScreenSong.play();
  startscreenBackgroundSprite.visible = false;
  mainMenuHasBeenToggled = false;
  gameIsRunning = true;
  gameIsPaused = false;
  startMenuContainer.style.display = "none";
  healthBarSprite.visible = true;
  healthBarBorderSprite.visible = true;
  livesSprite.visible = true;
  creditsSprite.visible = true;
  pauseButtonSprite.visible = true;
  hudbackground.visible = true;
  player.sprite.visible = true;
  shipBaseEngine.visible = true;
  playerEngineFireIdle.visible = true;
  creditText.style.opacity = "100%";
  playerHealth = player.maxHealth;
  player.lives = 3;
  livesSprite.changeAni("lives3");
  killCount = 0;
  player.sprite.img = playerFullHealthImg;
  asteroidObject.velY = 3;
  asteroidObject.velX = 0;
  asteroidObject.spawnRate = 90;
  asteroidObject.health = 1;
  frameCount = 0;

  upgradeChecker();
}
function backgroundMovement() {
  image(playScreenSpaceBackground, 0, y1, 225, 1000);
  image(playScreenSpaceBackground, 0, y2, 225, 1000);
  y1 += 1;
  y2 += 1;

  if (y1 == 350) {
    y1 = -1650;
  }
  if (y2 == 350) {
    y2 = -1650;
  }
  console.log(frameCount);
}

function enemySpawner() {
  let spawnRate = asteroidObject.spawnRate;
  let randomFrameCount = Math.floor(random(spawnRate, spawnRate + 20));
  let x = random(20, 210);

  if (frameCount % randomFrameCount === 0) {
    spawnAsteroid(x, -25);
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
  asteroidObject.base.vel.y = asteroidObject.velY;
  //make velx randomly positive or negative
  if (x < 90) {
    asteroidObject.base.vel.x = -asteroidObject.velX;
  } else if (x > 144) {
    asteroidObject.base.vel.x = asteroidObject.velX;
  } else {
    asteroidObject.base.vel.x = 0;
  }
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
  asteroidColliderGroup.push(asteroidObject.collider);

  asteroidObject.base.life = 1000;
  asteroidObject.flame.life = 1000;
  asteroidObject.collider.life = 1000;
  asteroidObject.base.layer = 99;
  asteroidObject.collider.layer = 99;
  asteroidObject.flame.layer = 99;

  //This group is only for the bullet collision in createbullet function.
  asteroidObject.group.add(asteroidObject.collider);
  asteroidHealthGroup.push(asteroidObject.health);
  console.log(asteroidHealthGroup);
}
function increaseDifficulty() {
  if (frameCount % 600 === 0) {
    //every 10 seconds
    if (asteroidObject.velY < 9) {
      asteroidObject.velY += 0.2; //increase the Y speed of the asteroids
    }
    if (asteroidObject.spawnRate > 30) {
      asteroidObject.spawnRate -= 0.3; //decrease the spawn rate of the asteroids
    }
    if (asteroidObject.velX > -3) {
      asteroidObject.velX -= 0.1; //increase the X speed of the asteroids
    }
  }

  if (frameCount % 1800 === 0) {
    //every 30 seconds
    asteroidObject.health += 1;
  }

  if (difficultyKillCounter % 5 === 0 && difficultyKillCounter !== 0) {
    //every 5 kills
    if (asteroidObject.velY < 9) {
      asteroidObject.velY += 0.1; //increase the Y speed of the asteroids
    }
    if (asteroidObject.spawnRate > 30) {
      asteroidObject.spawnRate -= 0.15; //decrease the spawn rate of the asteroids
    }
    if (asteroidObject.velX > -3) {
      asteroidObject.velX += 0.02; //increase the X speed of the asteroids
    }
    difficultyKillCounter = 0; //reset the kill count
  }
}

function gameOver() {
  gameOverSound.play();
  toggleMainMenu();
  gameIsPaused = false;
  gameIsRunning = false;
  //The game over background is put in HTML to make sure it is on top of all other elements.
  gameOverContainer.style.display = "flex";
  gameOverDarkBackground.style.display = "block";
  gameScore.innerHTML = "Score: " + killCount;
  for (let asteroidIndex in asteroidBaseGroup) {
    asteroidBaseGroup[asteroidIndex].remove();
    asteroidFlameGroup[asteroidIndex].remove();
    asteroidColliderGroup[asteroidIndex].remove();
  }
  for (let bulletIndex in bulletGroup) {
    bulletGroup[bulletIndex].remove();
  }
  asteroidBaseGroup = [];
  asteroidColliderGroup = [];
  asteroidFlameGroup = [];
  asteroidHealthGroup = [];
  bulletGroup = [];
  highScore();
}

function highScore() {
  if (killCount > highscore) {
    highscore = killCount;
  }
}

function gameLaunch() {
  if (!gameHasBeenLaunched) {
    startscreenBackgroundSprite.visible = true;
    creditsSprite.visible = false;
    healthBarSprite.visible = false;
    healthBarBorderSprite.visible = false;
    livesSprite.visible = false;
    player.sprite.visible = false;
    pauseButtonSprite.visible = false;
    gameOverDarkBackground.style.display = "none";
    launchGameContainer.style.display = "flex";
    creditText.style.opacity = "100%";
    document.getElementById("creditsPlayscreen").style.display = "block";
  }
}

function upgradeChecker() {
  if (bulletReloadSpeedLevel === 0) {
    player.reloadspeed = 70;
  }
  if (bulletReloadSpeedLevel === 1) {
    player.reloadspeed = 60;
  }
  if (bulletReloadSpeedLevel === 2) {
    player.reloadspeed = 50;
  }
  if (bulletReloadSpeedLevel === 3) {
    player.reloadspeed = 40;
  }
  if (bulletReloadSpeedLevel === 4) {
    player.reloadspeed = 20;
  }

  if (bulletDamageLevel === 0) {
    player.damage = 1;
  }
  if (bulletDamageLevel === 1) {
    player.damage = 2;
  }
  if (bulletDamageLevel === 2) {
    player.damage = 3;
  }
  if (bulletDamageLevel === 3) {
    player.damage = 4;
  }
  if (bulletDamageLevel === 4) {
    player.damage = 5;
  }

  if (playerHealthLevel === 0) {
    player.maxHealth = 50;
  }
  if (playerHealthLevel === 1) {
    player.maxHealth = 100;
  }
  if (playerHealthLevel === 2) {
    player.maxHealth = 150;
  }
  if (playerHealthLevel === 3) {
    player.maxHealth = 200;
  }
  if (playerHealthLevel === 4) {
    player.maxHealth = 250;
  }

  if (creditsLevel === 0) {
    creditGain = 1;
  }
  if (creditsLevel === 1) {
    creditGain = 2;
  }

  playerHealth = player.maxHealth;
}
function toggleShop() {
  if (shopIsOpen) {
    shopIsOpen = false;

    bulletDamageLevelSprite.visible = false;
    bulletReloadSpeedLevelSprite.visible = false;
    playerHealthLevelSprite.visible = false;
    creditLevelSprite.visible = false;
  } else {
    shopIsOpen = true;
    bulletDamageLevelSprite.visible = true;
    bulletReloadSpeedLevelSprite.visible = true;
    playerHealthLevelSprite.visible = true;
    creditLevelSprite.visible = true;
  }
}

function updatePrices() {
  if (bulletDamageLevel === 0) {
    bulletDamageLevelSprite.changeAni("level0");
    priceDamageLevel = 10;
    priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
  }
  if (bulletDamageLevel === 1) {
    bulletDamageLevelSprite.changeAni("level1");
    priceDamageLevel = 20;
    priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
  }
  if (bulletDamageLevel === 2) {
    bulletDamageLevelSprite.changeAni("level2");
    priceDamageLevel = 30;
    priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
  }
  if (bulletDamageLevel === 3) {
    bulletDamageLevelSprite.changeAni("level3");
    priceDamageLevel = 40;
    priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
  }
  if (bulletDamageLevel === 4) {
    bulletDamageLevelSprite.changeAni("level4");
    priceDamageLevelTextElement.innerHTML = "MAX";
  }

  if (bulletReloadSpeedLevel === 0) {
    bulletReloadSpeedLevelSprite.changeAni("level0");
    priceReloadSpeedLevel = 10;
    priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
  }
  if (bulletReloadSpeedLevel === 1) {
    bulletReloadSpeedLevelSprite.changeAni("level1");
    priceReloadSpeedLevel = 20;
    priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
  }
  if (bulletReloadSpeedLevel === 2) {
    bulletReloadSpeedLevelSprite.changeAni("level2");
    priceReloadSpeedLevel = 30;
    priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
  }
  if (bulletReloadSpeedLevel === 3) {
    bulletReloadSpeedLevelSprite.changeAni("level3");
    priceReloadSpeedLevel = 40;
    priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
  }
  if (bulletReloadSpeedLevel === 4) {
    bulletReloadSpeedLevelSprite.changeAni("level4");
    priceReloadSpeedLevelTextElement.innerHTML = "MAX";
  }

  if (playerHealthLevel === 0) {
    playerHealthLevelSprite.changeAni("level0");
    priceHealthLevel = 10;
    priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
  }
  if (playerHealthLevel === 1) {
    playerHealthLevelSprite.changeAni("level1");
    priceHealthLevel = 20;
    priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
  }
  if (playerHealthLevel === 2) {
    playerHealthLevelSprite.changeAni("level2");
    priceHealthLevel = 30;
    priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
  }
  if (playerHealthLevel === 3) {
    playerHealthLevelSprite.changeAni("level3");
    priceHealthLevel = 40;
    priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
  }
  if (playerHealthLevel === 4) {
    playerHealthLevelSprite.changeAni("level4");
    priceHealthLevelTextElement.innerHTML = "MAX";
  }

  if (creditsLevel === 0) {
    creditLevelSprite.changeAni("level0");
    priceCreditsLevel = 100;
    priceCreditsLevelTextElement.innerHTML = "Price: " + priceCreditsLevel;
  }
  if (creditsLevel === 1) {
    creditLevelSprite.changeAni("level1");
    priceCreditsLevelTextElement.innerHTML = "MAX";
  }
}

function upgradeButton(upgrade) {
  if (upgrade === "damage") {
    if (creditsValue >= priceDamageLevel) {
      bulletDamageLevel++;
      creditsValue = creditsValue - priceDamageLevel;
    }
  }
  if (upgrade === "firerate") {
    if (creditsValue >= priceReloadSpeedLevel) {
      bulletReloadSpeedLevel++;
      creditsValue = creditsValue - priceReloadSpeedLevel;
    }
  }
  if (upgrade === "health") {
    if (creditsValue >= priceHealthLevel) {
      playerHealthLevel++;
      creditsValue = creditsValue - priceHealthLevel;
    }
  }
  if (upgrade === "doubleCredits") {
    if (creditsValue >= priceCreditsLevel) {
      creditsLevel++;
      creditsValue = creditsValue - priceCreditsLevel;
    }
  }
}
