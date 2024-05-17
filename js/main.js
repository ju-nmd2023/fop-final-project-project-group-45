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
let asteroidObject = { base: "", flame: "", collider: "", group: "", velY: 3, velX: 0, health: 50, spawnRate: 90 };
let killCount = 0;
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

let startMenuContainer;
let mainMenuStartButton;
let mainMenuShopButton;
let alertBox;
let alertBoxYesButton;
let alertBoxNoButton;
let alertAnswer = "";
let alertBoxIsVisible = false;

let startButton, resumeButton, exitButton, shopButton;

//Buttons Class
class Button{
  constructor(width,height,text,type,onclick){
    this.width = width;
    this.height = height;
    this.text = text;
    this.type = type;
    this.onclick = onclick;
    this.backgroundColor = "rgba(0,0,0,0)";
  }
  
  draw(){

    if(this.type === "startScreenButton"){
      let button = document.createElement("div");
      let textElement = document.createElement("p");
      textElement.innerHTML = this.text;
      document.querySelector("#startButtonGridContainer").appendChild(button);
      button.classList.add("startScreenButton");
      button.setAttribute("onclick", this.onclick);
      button.appendChild(textElement);
      button.style.width = this.width + "px";
      button.style.height = this.height + "px";
    }

    if(this.type === "pauseScreenButton"){
      //draw pause screen button
      let button = document.createElement("div");
      let textElement = document.createElement("p");
      textElement.innerHTML = this.text;
      document.querySelector("#pauseButtonGridContainer").appendChild(button);
      button.classList.add("pauseScreenButton");
      button.setAttribute("onclick", this.onclick);
      button.appendChild(textElement);
      button.style.width = this.width + "px";
      button.style.height = this.height + "px";
      button.style.backgroundColor = this.backgroundColor;
    }
  }
}
class Redbutton extends Button{
  constructor(width, height, text, type, onclick, backgroundColor){
    super(width, height, text, type, onclick);
    this.backgroundColor = "rgba(255,0,0,1)";
}}

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
  resumeButton = document.querySelector("#resumeButton"); //defining the resume button
  resumeButton.addEventListener("click", function () {
    //adding an event listener to the resume button
    gameIsPaused = false;
    unpauseGame();
  });
  exitButton = document.querySelector("#exitButton"); //defining the exit button
  alertBox = document.querySelector("#alertBoxContainer"); //defining the alert box
  alertBoxYesButton = document.querySelector("#yesButton"); //defining the yes button
  alertBoxNoButton = document.querySelector("#noButton"); //defining the no button
  exitButton.addEventListener("click", function () {
    //adding an event listener to the exit button
    alertBox.style.display = "block";
    alertBoxIsVisible = true;
    alertBoxYesButton.addEventListener("click", function () {
      gameIsRunning = false;
      gameIsPaused = false;
      toggleMainMenu();
      alertBox.style.display = "none";
      alertBoxIsVisible = false;
    });
    alertBoxNoButton.addEventListener("click", function () {
      alertBox.style.display = "none";
      alertBoxIsVisible = false;
    });
  });
  mainMenuStartButton = document.querySelector("#startButton"); //defining the start button
  mainMenuStartButton.addEventListener("click", function () {
    //adding an event listener to the start button
    startGame();
  });
  mainMenuShopButton = document.querySelector("#shopButton"); //defining the shop button
  mainMenuShopButton.addEventListener("click", function () {
    //adding an event listener to the shop button
    console.log("shop");
  });

  startButton = new Button(250,50,"Start","startScreenButton", "startGame();");
  shopButton = new Button(250,50,"Shop","startScreenButton", "console.log('shop');");
  resumeButton = new Button(150, 30, "Resume", "pauseScreenButton","gameIsPaused = false; unpauseGame();");
  exitButton = new Redbutton(150, 30, "Exit", "pauseScreenButton", "gameIsRunning = false; gameIsPaused = false;");

  resumeButton.draw();
  exitButton.draw();
  startButton.draw();
  shopButton.draw();
  

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
    if (gameIsRunning) {
      gameIsPaused = !gameIsPaused;
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
  toggleMainMenu();
}

function playscreen() {
  backgroundMovement();
  playerMovement();
  enemySpawner();
  asteroidCollision();
  document.getElementById("credits-playscreen").style.display = "block";
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
}
function toggleMainMenu() {
  image(startscreenBackground, 0, 0, 225, 350);
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
  startMenuContainer = document.querySelector("#startScreenContainer");
  startMenuContainer.style.display = "flex";
  creditText.style.opacity = "100%";
  
}
function startGame() {
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
  player.sprite.img = playerFullHealthImg;
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
  if (killCount % 5 === 0 && killCount !== 0) {
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
    killCount = 0; //reset the kill count
  }
  console.log(asteroidObject.velX);
}
