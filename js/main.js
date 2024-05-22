let player = { maxHealth: 50, lives: 3, sprite: "", damage: 1, reloadspeed: 70 }; //player ship object. Stores all important information about the player.
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
let progress = { bulletDamageLevel: 0, bulletReloadSpeedLevel: 0, playerHealthLevel: 0, creditsLevel: 0, highscore: 0, creditsValue: 0 }; //progress object that stores all the progress of the player.
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
let alertExitBox, alertResetBox;
let alertAnswer = "";
let alertExitBoxIsVisible = false;
let alertResetBoxIsVisible = false;
let mainMenuSong, playScreenSong, gunShotSound, asteroidExplosionSound, asteroidHitSound, gameOverSound, playerDamageSound, confirmSound, cancelSound, playerLoseLifeSound;
let mainMenuHasBeenToggled = false;
let startButton,
  resumeButton,
  exitGameButton,
  shopButton,
  alertExitBoxYesButton,
  alertExitBoxNoButton,
  alertResetBoxYesButton,
  alertResetBoxNoButton,
  gameOverButton,
  launchGameButton,
  upgradeHealthButton,
  upgradeDamageButton,
  upgradeFireRateButton,
  upgradeCreditsDoublerButton,
  exitShopButton,
  resetProgressButton;
let gameOverScore, gameOverScoreContainer, playScreenScore, playScreenScoreContainer;
let gameHasBeenLaunched = false;
let bulletDamageLevelSprite;
let bulletReloadSpeedLevelSprite;
let playerHealthLevelSprite;
let creditLevelSprite;
let creditGain = 1;
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
    if (this.type === "alertScreenExitButton") {
      //draw exit button
      document.querySelector("#alertBoxExitButtonGrid").appendChild(button);
      button.classList.add("alertBoxButton");
      button.style.backgroundColor = this.backgroundColor;
    }
    if (this.type === "alertScreenResetButton") {
      //draw reset button
      document.querySelector("#alertBoxResetButtonGrid").appendChild(button);
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
    if (this.type == "resetProgress") {
      document.querySelector("#startButtonGridContainer").appendChild(button);
      button.classList.add("startScreenButton");
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
  alertExitBox = document.querySelector("#alertBoxExitContainer"); //defining the alert box
  alertResetBox = document.querySelector("#alertBoxResetContainer"); //defining the alert box
  gameOverContainer = document.querySelector("#gameOverContainer"); //defining the game over container
  pauseMenuContainer = document.querySelector("#pauseScreenContainer"); //defining the pause menu container
  gameOverDarkBackground = document.querySelector("#gameOverDarkBackground"); //defining the dark background for the game over screen
  gameOverScoreContainer = document.querySelector("#gameScore"); //defining the game score container
  startMenuContainer = document.querySelector("#startScreenContainer"); //defining the start menu container
  launchGameContainer = document.querySelector("#launchGameContainer"); //defining the launch game container
  shopScreenContainer = document.querySelector("#shopScreenContainer"); //defining the shop screen container
  gameOverScore = document.createElement("p"); //creating a p element for the game score in Game Over Screen
  gameOverScoreContainer.appendChild(gameOverScore); //appending the game score to the game score container

  highscoreContainer = document.querySelector("#highscoreContainer");
  priceContainer = document.querySelector("#priceContainer");
  priceDamageLevelTextElement = document.querySelector("#damagePrice");
  priceReloadSpeedLevelTextElement = document.querySelector("#fireRatePrice");
  priceHealthLevelTextElement = document.querySelector("#healthPrice");
  priceCreditsLevelTextElement = document.querySelector("#doubleCreditsPrice");

  alertExitBoxYesButton = new Button(100, 30, "Yes", "alertScreenExitButton", "gameIsRunning = false; gameIsPaused = false; toggleExitAlertBox(); gameOver(); confirmSound.play();");
  alertExitBoxNoButton = new Button(100, 30, "No", "alertScreenExitButton", "toggleExitAlertBox(); cancelSound.play();");
  resetProgressButton = new Button(250, 50, "Reset Progress", "resetProgress", "toggleResetAlertBox(); cancelSound.play();");
  alertResetBoxYesButton = new Button(100, 30, "Yes", "alertScreenResetButton", "resetProgress(); toggleResetAlertBox(); confirmSound.play();");
  alertResetBoxNoButton = new Button(100, 30, "No", "alertScreenResetButton", "toggleResetAlertBox(); cancelSound.play();");
  startButton = new Button(250, 50, "Start", "startScreenButton", "startGame(); confirmSound.play();");
  shopButton = new Button(250, 50, "Shop", "startScreenButton", "toggleShop(); confirmSound.play();");
  resumeButton = new Button(150, 30, "Resume", "pauseScreenButton", "gameIsPaused = false; unpauseGame(); cancelSound.play();");
  exitGameButton = new Redbutton(150, 30, "Exit", "pauseScreenButton", "toggleExitAlertBox(); cancelSound.play();");
  gameOverButton = new Button(120, 30, "Main Menu", "gameOverButton", "document.querySelector('#gameOverContainer').style.display = 'none'; document.querySelector('#gameOverDarkBackground').style.display = 'none'; confirmSound.play();");
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
  alertExitBoxYesButton.draw();
  alertExitBoxNoButton.draw();
  gameOverButton.draw();
  launchGameButton.draw();
  upgradeHealthButton.draw();
  upgradeDamageButton.draw();
  upgradeFireRateButton.draw();
  upgradeCreditsDoublerButton.draw();
  exitShopButton.draw();
  resetProgressButton.draw();
  alertResetBoxYesButton.draw();
  alertResetBoxNoButton.draw();

  frameRate(60);
  loadPlayer();
  loadEnemies();
  loadGUI();
}

function toggleExitAlertBox() {
  if (alertExitBoxIsVisible) {
    alertExitBox.style.display = "none";
    alertExitBoxIsVisible = false;
  } else {
    alertExitBox.style.display = "block";
    alertExitBoxIsVisible = true;
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
  livesSprite.layer = 101;

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

  playScreenScoreContainer = document.querySelector("#gameScoreContainer"); //defining the play screen score container

  playScreenScore = document.createElement("p"); //creating a p element for the game score in Play Screen
  playScreenScoreContainer.appendChild(playScreenScore); //appending the game score to the game score container

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

function draw() {
  clear();

  localStorage.progress = JSON.stringify(progress);
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
    if (alertExitBoxIsVisible) {
      alertExitBox.style.display = "none";
      alertExitBoxIsVisible = false;
    }
    if (alertResetBoxIsVisible) {
      alertResetBox.style.display = "none";
      alertResetBoxIsVisible = false;
    }
    if (shopIsOpen) {
      toggleShop();
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
  creditText.innerHTML = progress.creditsValue;
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
  updateScore();
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
  playScreenSong.setVolume(0.2);
  asteroidExplosionSound.setVolume(0.05);
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
  playScreenScoreContainer.style.display = "none";
  startscreenBackgroundSprite.visible = true;
  highscoreContainer.style.display = "flex";
  highscoreContainer.innerHTML = "Highscore: " + progress.highscore;
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
  playScreenScoreContainer.style.display = "flex";
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
}

function updateScore() {
  playScreenScore.innerHTML = "Score: " + killCount;
}

function increaseDifficulty() {
  if (frameCount % 600 === 0) {
    //every 10 seconds
    if (asteroidObject.velY < 12) {
      asteroidObject.velY += 0.25; //increase the Y speed of the asteroids
    }
    if (asteroidObject.spawnRate > 24) {
      asteroidObject.spawnRate -= 0.4; //increase the spawn rate of the asteroids
    }
    if (asteroidObject.velX > -3) {
      asteroidObject.velX -= 0.15; //increase the X speed of the asteroids
    }
  }

  if (frameCount % 1800 === 0) {
    //every 30 seconds
    if (asteroidObject.health < 15) {
      asteroidObject.health += 1;
    }
  }

  if (difficultyKillCounter % 5 === 0 && difficultyKillCounter !== 0) {
    //every 5 kills
    if (asteroidObject.velY < 12) {
      asteroidObject.velY += 0.12; //increase the Y speed of the asteroids
    }
    if (asteroidObject.spawnRate > 24) {
      asteroidObject.spawnRate -= 0.2; //decrease the spawn rate of the asteroids
    }
    if (asteroidObject.velX > -3) {
      asteroidObject.velX += 0.075; //increase the X speed of the asteroids
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
  gameOverScore.innerHTML = "Score: " + killCount;
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
  if (killCount > progress.highscore) {
    progress.highscore = killCount;
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
    mainMenuSong.setVolume(0.3);
    playScreenSong.setVolume(0.3);
    cancelSound.setVolume(0.2);
    confirmSound.setVolume(0.2);
    gameOverSound.setVolume(0.1);
  }
}

function upgradeChecker() {
  if (progress.bulletReloadSpeedLevel === 0) {
    player.reloadspeed = 70;
  }
  if (progress.bulletReloadSpeedLevel === 1) {
    player.reloadspeed = 60;
  }
  if (progress.bulletReloadSpeedLevel === 2) {
    player.reloadspeed = 50;
  }
  if (progress.bulletReloadSpeedLevel === 3) {
    player.reloadspeed = 40;
  }
  if (progress.bulletReloadSpeedLevel === 4) {
    player.reloadspeed = 20;
  }

  if (progress.bulletDamageLevel === 0) {
    player.damage = 1;
  }
  if (progress.bulletDamageLevel === 1) {
    player.damage = 2;
  }
  if (progress.bulletDamageLevel === 2) {
    player.damage = 3;
  }
  if (progress.bulletDamageLevel === 3) {
    player.damage = 4;
  }
  if (progress.bulletDamageLevel === 4) {
    player.damage = 5;
  }

  if (progress.playerHealthLevel === 0) {
    player.maxHealth = 50;
  }
  if (progress.playerHealthLevel === 1) {
    player.maxHealth = 100;
  }
  if (progress.playerHealthLevel === 2) {
    player.maxHealth = 150;
  }
  if (progress.playerHealthLevel === 3) {
    player.maxHealth = 200;
  }
  if (progress.playerHealthLevel === 4) {
    player.maxHealth = 250;
  }

  if (progress.creditsLevel === 0) {
    creditGain = 1;
  }
  if (progress.creditsLevel === 1) {
    creditGain = 2;
  }

  playerHealth = player.maxHealth;
}

window.addEventListener("load", function () {
  //Check if there is any progress saved in the local storage, if so, load it.
  if (localStorage.progress) {
    progress = JSON.parse(localStorage.progress);
  }
});

function toggleResetAlertBox() {
  if (alertResetBoxIsVisible) {
    alertResetBox.style.display = "none";
    alertResetBoxIsVisible = false;
  } else if (!alertResetBoxIsVisible) {
    alertResetBox.style.display = "block";
    alertResetBoxIsVisible = true;
  }
}

function resetProgress() {
  console.log("Progress reset");
  localStorage.clear();
  progress = {
    highscore: 0,
    bulletDamageLevel: 0,
    bulletReloadSpeedLevel: 0,
    playerHealthLevel: 0,
    creditsLevel: 0,
    creditsValue: 0,
  };
}
