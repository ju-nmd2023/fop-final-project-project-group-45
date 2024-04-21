function loadPlayer() {
  shipBaseEngine = new Sprite(32, 32, 32, 32);
  shipBaseEngine.img = shipBaseEngineImg;
  shipBaseEngine.offset.y = 2;

  player.sprite = new Sprite(32, 32, 32, 32); //creates the sprite object
  player.sprite.img = playerBaseShipImg; //loads the sprite image
  
  //player.sprite.debug = true; //turns on the debug mode for the sprite

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

  playerHealth = player.maxHealth; // This varible shows how much HP the player currently has. Player starts with max health
  player.sprite.layer = 101;
  
}

function playerMovement() {
  player.sprite.rotationLock = true;
  player.sprite.moveTowards(mouse, 0.1);

  //shooting
  if (frameCount % 30 === 0) {
    createBullet(player.sprite.x, player.sprite.y);
  }

  
}
function createBullet(x, y) {
  bulletObject.base = new Sprite(x, y, 32, 32, "none");
  bulletObject.base.spriteSheet = mainProjectileImg;
  bulletObject.base.addAnis({
    base: { col: 1, frames: 4 },
  });
  bulletObject.base.changeAni("base");
  bulletObject.base.vel.y = -4;
  bulletObject.base.layer = 100;
  bulletObject.collider = new Sprite(x, y, 16, 16, "dynamic");
  bulletObject.collider.overlaps(allSprites);
  bulletObject.collider.color = "blue";
  bulletObject.collider.visible = false;
  new GlueJoint(bulletObject.base, bulletObject.collider);
  bulletObject.collider.layer = 101;
  bulletObject.collider.debug = true;

  /*if (bulletObject.base.overlaps(asteroidObject.collider)) {
    console.log("collision");
    asteroidObject.base.changeAni("explosion");
    asteroidObject.base.anis.looping = false;
    asteroidObject.base.anis.frameDelay = 6;
    killAsteroid(asteroidObject.base, asteroidObject.collider, asteroidObject.flame);
}
*/}

function playerCollision() {
  if (player.sprite.overlaps(asteroidObject.collider)) {
    console.log("collision");
    asteroidObject.base.changeAni("explosion");
    asteroidObject.base.anis.looping = false;
    asteroidObject.base.anis.frameDelay = 6;
    killAsteroid(asteroidObject.base, asteroidObject.collider, asteroidObject.flame);
    playerHealth -= 25;
  }
  if (canvasBottomCollider.overlap(asteroidObject.collider)) {
    asteroidObject.base.remove();
    asteroidObject.collider.remove();
    asteroidObject.flame.remove();
    
  }
}

function updateHealth() {
  let healthProcent = 1 - (player.maxHealth - playerHealth) / player.maxHealth; //calculates the health procent based on the current health and max health.
  //if statements to calculate the correct value for the healthbar animation names.
  if (healthProcent > 0.94 && healthProcent < 1) {
    healthProcent = 1;
  } else if (healthProcent < 0.94 && healthProcent > 0.88) {
    healthProcent = 0.94;
  } else if (healthProcent < 0.88 && healthProcent > 0.81) {
    healthProcent = 0.88;
  } else if (healthProcent < 0.81 && healthProcent > 0.75) {
    healthProcent = 0.81;
  } else if (healthProcent < 0.75 && healthProcent > 0.69) {
    healthProcent = 0.75;
  } else if (healthProcent < 0.69 && healthProcent > 0.63) {
    healthProcent = 0.69;
  } else if (healthProcent < 0.63 && healthProcent > 0.56) {
    healthProcent = 0.63;
  } else if (healthProcent < 0.56 && healthProcent > 0.5) {
    healthProcent = 0.56;
  } else if (healthProcent < 0.5 && healthProcent > 0.44) {
    healthProcent = 0.5;
  } else if (healthProcent < 0.44 && healthProcent > 0.38) {
    healthProcent = 0.44;
  } else if (healthProcent < 0.38 && healthProcent > 0.31) {
    healthProcent = 0.38;
  } else if (healthProcent < 0.31 && healthProcent > 0.25) {
    healthProcent = 0.31;
  } else if (healthProcent < 0.25 && healthProcent > 0.19) {
    healthProcent = 0.25;
  } else if (healthProcent < 0.19 && healthProcent > 0.13) {
    healthProcent = 0.19;
  } else if (healthProcent < 0.13 && healthProcent > 0.0) {
    healthProcent = 0.13;
  } else if (healthProcent == 0) {
    healthProcent = 0.06;
  }
  healthBarSprite.changeAni("health" + healthProcent * 100); //changes the healthbar animation based on the health procent.
}
