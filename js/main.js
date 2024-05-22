let player = { maxHealth: 50, lives: 3, sprite: "", damage: 1, reloadspeed: 70 }; //player ship object. Stores all important information about the player.
let playerHealth; //player health variable. Used while the game is playing.
let playerFullHealthImg; //sprite of base ship
let playerEngineFireIdle; //idle engine fire sprite
let shipBaseEngineImg; //standard engine sprite
let shipBaseEngine; //standard engine variable
let playScreenSpaceBackground; //background image
let hudbackground, hudbackgroundImg; //hudbackground spritesheet and img for preload
let healthBarBorderSprite; //sprite sheet for the healthbar border
let healthBarSprite; //sprite sheet for the healthbar
let livesSprite; //sprite sheet for the hearts
let startscreenBackgroundSprite, startscreenBackgroundImg; //Spritesheet for background and Img for preload
let creditsSprite, creditContainer; //Sprite for credits icon and container to hold the text and icon.
let progress = { bulletDamageLevel: 0, bulletReloadSpeedLevel: 0, playerHealthLevel: 0, creditsLevel: 0, highscore: 0, creditsValue: 1000}; //progress object that stores all the progress of the player.
let difficultyKillCounter = 0; //Counter for the amount of kills that is reset for every 5 kills.
let killCount = 0; //Counter for the amount of kills that is reset for every game.
let asteroidObject = { base: "", flame: "", collider: "", group: "", velY: 3, velX: 0, health: 1, spawnRate: 90 }; //Object that stores group, sprites, velocity and spawnrate
let asteroidSpriteImg, asteroidFlameImg; //Variables for asteroid image preloading
let asteroidHealthGroup = []; //Array to store the health of the asteroids
let asteroidBaseGroup = [], asteroidColliderGroup = [], asteroidFlameGroup = []; //Arrays containing sprites for the elements of an asteroid
let pauseButtonImg, pauseButtonSprite; //Sprite for pause icon and img for preload
let mainProjectileImg; //Variable for preloading bullet sprite img.
let bulletObject = {base: "", collider: "", group: ""};
let bulletGroup = []; //Array for storing all the bullets
let healthBarImg; //Variable for preloading healthbar sprite img.
let gameOverContainer, gameOverDarkBackground; //Game over container and dark background
let pauseMenuBackgroundImg, pauseMenuBackgroundSprite, pauseMenuBackgroundDarkerSprite, pauseMenuContainer, launchGameContainer; //Containers for pause menu and sprite for background
let background1Yposition = -650, background2Yposition = -1650; //Variables containing y coordinates for the background. The background is looped therefore there are two y positions
let gameIsRunning = false; //if a stage is currently being played. Used to start the game and display different screens
let gameIsPaused = false; //if a stage is currently being played but the player has paused it. Used to set if the cursor should be showed and to show pausescreen
let startMenuContainer; //Container for the start menu
let alertExitBox, alertResetBox; //Containers for the alert boxes
let alertExitBoxIsVisible = false, alertResetBoxIsVisible = false; //Used to display the alert boxes
let mainMenuSong, playScreenSong, gunShotSound, asteroidExplosionSound, asteroidHitSound, gameOverSound, playerDamageSound, confirmSound, cancelSound, playerLoseLifeSound; //Variables to store music and sound fx
let mainMenuHasBeenToggled = false; //Used to toggle the main menu music
let startButton, resumeButton, exitGameButton, shopButton, alertExitBoxYesButton, alertExitBoxNoButton, alertResetBoxYesButton, alertResetBoxNoButton,
  gameOverButton, launchGameButton, upgradeHealthButton, upgradeDamageButton, upgradeFireRateButton, upgradeCreditsDoublerButton, exitShopButton, resetProgressButton;
let gameOverScore, gameOverScoreContainer, playScreenScore, playScreenScoreContainer; //Variables for storing score and containers for the score
let gameHasBeenLaunched = false; //Variable to check if player has clicked "launch game", required to make sure sounds are played
let bulletDamageLevelSprite, bulletReloadSpeedLevelSprite, playerHealthLevelSprite, creditLevelSprite; //Sprites in the shop that display upgrade level
let creditGain = 1; //Variable for credit multiplier upgrade
let creditText; //Variable for storing the text element of credits
let shopScreenContainer, shopIsOpen = false; //Container for shop and bool to check if its open
let asteroidBottomCollider; //Collider to check if the asteroid has left the canvas
let priceDamageLevel, priceReloadSpeedLevel, priceHealthLevel, priceCreditsLevel, priceContainer; //Variable for prices of upgrades and container to store all price elements
let priceDamageLevelTextElement, priceReloadSpeedLevelTextElement, priceHealthLevelTextElement, priceCreditsLevelTextElement; //Variables for storing the text elements of the prices


//All images and sounds used have to be preloaded before the game can start
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
  //colliders to keep the character inside the canvas
  canvasLeftCollider = new Sprite(-1, 0, 1, 700, "static"); 
  canvasTopCollider = new Sprite(-1, 0, 450, 1, "static");
  canvasRightCollider = new Sprite(226, 0, 1, 700, "static");
  canvasBottomCollider = new Sprite(0, 351, 450, 1, "static");

  //groups objects and variables can be defined in setup to be used in the game
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

  //Buttons are defined in setup as well
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
  
  //The button draw function is run
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

  //The game is set to run at 60 frames per second and external load functions are run
  frameRate(60);
  loadPlayer();
  loadEnemies();
  loadGUI();
}

//GUI is loaded in a separate function to keep the setup function cleaner
function loadGUI() {
  hudbackground = new Sprite(112, 334, 225, 32, "static"); //hud background sprite
  hudbackground.img = hudbackgroundImg;
  hudbackground.layer = 100;
  healthBarBorderSprite = new Sprite(66, 334, 96, 16, "none"); //healthbarborder sprite
  healthBarBorderSprite.spriteSheet = healthBarImg;
  healthBarBorderSprite.addAnis({
    border: { col: 0, frames: 1 },
  });

  //Animation with 16 frames is added to healthbar defining different health states
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
  healthBarSprite.changeAni("health100"); //By default the healthbar is set to 100%

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

  creditContainer = document.querySelector(".creditsContainer");
  creditText = document.createElement("p");
  creditContainer.appendChild(creditText);

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

  //If the player has played the game before, the progress is loaded from the local storage
  localStorage.progress = JSON.stringify(progress);
  //gameLaunch function is run to make the player click "launch" allowing sounds to be played
  gameLaunch();

  //If escape is pressed or the pause button is clicked, the game is paused and unpaused, shop and alert boxes are also closed using this
  //This part is only for the escape key and pause button
  if (kb.presses("escape") || pauseButtonSprite.mouse.presses()) {
    //Game can only be paused if game is running
    if (gameIsRunning) {//If game is running
      gameIsPaused = !gameIsPaused; //Toggle pause
      cancelSound.play();
      if (!gameIsPaused) { //If game is paused, unpause the game.
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
  
  if (gameIsRunning && gameIsPaused === false) { //If game is running and not paused, everything runs
    canvas.style.setProperty("--cursorMode", "none"); //Custom css variable cursorMode is toggled to hide cursor
    playscreen();
  } else if (gameIsPaused) { //If game is paused, everything is paused
    pauseGame();
  } else if (gameIsRunning === false && gameHasBeenLaunched === true) { //If the game has been launched but isn't played, main menu is shown
    canvas.style.setProperty("--cursorMode", "auto"); 
    startscreen();
  }
  allSprites.draw(); //To draw all sprites before drawing the text, making sure the text stays on top of the sprites.
}

function updateCredits() {
  creditText.innerHTML = progress.creditsValue;
}

//Main function for main menu and shop screen
function startscreen() {
  if (!mainMenuHasBeenToggled) { 
    playScreenSong.stop();
    mainMenuSong.play();
    mainMenuHasBeenToggled = true;
  }
  toggleMainMenu();
  //Display shop
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

//Playscreen contains functions of the game that is continuously drawn when the game is running
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

function pauseGame() { //When game is paused
  creditText.style.opacity = "30%";
  canvas.style.setProperty("--cursorMode", "auto");
  player.sprite.vel.y = 0;
  player.sprite.vel.x = 0;
  playerEngineFireIdle.animation.pause(); //Pause animation
  bulletObject.group.vel.y = 0;
  //All asteroids and bullets are paused
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
  //Background image is set to the current position of the looping background
  image(playScreenSpaceBackground, 0, background1Yposition, 225, 1000);
  image(playScreenSpaceBackground, 0, background2Yposition, 225, 1000);
  pauseMenuBackgroundSprite.visible = true;
  pauseMenuBackgroundDarkerSprite.visible = true;
  pauseMenuContainer.style.display = "block";
  playScreenSong.setVolume(0.15);
  asteroidExplosionSound.setVolume(0.05);
  gunShotSound.setVolume(0.1);
}
function unpauseGame() {
  creditText.style.opacity = "100%";
  canvas.style.setProperty("--cursorMode", "none");
  playerEngineFireIdle.animation.play();
  bulletObject.group.vel.y = -3;
  bulletObject.base.animation.play();
  //Reset asteroids and bullets when game is unpaused. Life is extended and animations are played.
  for (let asteroidIndex in asteroidBaseGroup) {
    asteroidBaseGroup[asteroidIndex].vel.y = asteroidObject.velY;
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
  playScreenSong.setVolume(0.3);
  asteroidExplosionSound.setVolume(0.1);
  gunShotSound.setVolume(0.3);
}

//Alert box for "Are you sure you want to exit?"
function toggleExitAlertBox() {
  if (alertExitBoxIsVisible) {
    alertExitBox.style.display = "none";
    alertExitBoxIsVisible = false;
  } else {
    alertExitBox.style.display = "block";
    alertExitBoxIsVisible = true;
  }
}

//Main menu visibility is toggled
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
  //Updatecredits is run to make sure the credits are updated when using the shop
  updateCredits();
}

//Game is started
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

//Background movement function to loop the background
function backgroundMovement() {
  image(playScreenSpaceBackground, 0, background1Yposition, 225, 1000);
  image(playScreenSpaceBackground, 0, background2Yposition, 225, 1000);
  background1Yposition += 1;
  background2Yposition += 1;

  //When the background reaches the bottom of the canvas, it is reset to the top
  if (background1Yposition == 350) {
    background1Yposition = -1650;
  }
  if (background2Yposition == 350) {
    background2Yposition = -1650;
  }
}

function updateScore() {
  playScreenScore.innerHTML = "Score: " + killCount;
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
  //All asteroids and bullets are removed from the canvas
  for (let asteroidIndex in asteroidBaseGroup) {
    asteroidBaseGroup[asteroidIndex].remove();
    asteroidFlameGroup[asteroidIndex].remove();
    asteroidColliderGroup[asteroidIndex].remove();
  }
  for (let bulletIndex in bulletGroup) {
    bulletGroup[bulletIndex].remove();
  }
  //Arrays are emptied.
  asteroidBaseGroup = [];
  asteroidColliderGroup = [];
  asteroidFlameGroup = [];
  asteroidHealthGroup = [];
  bulletGroup = [];
  highScore();
}

//Highscore is set if the player has a higher score than the current highscore
function highScore() {
  if (killCount > progress.highscore) {
    progress.highscore = killCount;
  }
}

//If game has not been launched, the launch game screen is displayed
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
    mainMenuSong.setVolume(0.3);
    playScreenSong.setVolume(0.3);
    cancelSound.setVolume(0.2);
    confirmSound.setVolume(0.2);
    gameOverSound.setVolume(0.1);
    creditsValue = 200;
  }
}

function toggleResetAlertBox() {
  if (alertResetBoxIsVisible) {
    alertResetBox.style.display = "none";
    alertResetBoxIsVisible = false;
  } else if (!alertResetBoxIsVisible) {
    alertResetBox.style.display = "block";
    alertResetBoxIsVisible = true;
  }
}

//If reset button is clicked, all progress is reset and localstorage is cleared
function resetProgress() {
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

window.addEventListener("load", function () {
  //Check if there is any progress saved in the local storage, if so, load it.
  if (localStorage.progress) {
    progress = JSON.parse(localStorage.progress);
  }
  
});