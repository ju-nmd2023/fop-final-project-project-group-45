// function that runs once when the game starts. Used to create the player sprite.
function loadPlayer() {
  shipBaseEngine = new Sprite(32, 32, 32, 32); //loads the engine sprite before the player sprite to make sure the engine is behind the player
  shipBaseEngine.img = shipBaseEngineImg;
  shipBaseEngine.offset.y = 2;

  player.sprite = new Sprite(32, 32, 32, 32);
  player.sprite.img = playerFullHealthImg;

  playerEngineFireIdle = new Sprite(32, 32, 48, 48);
  playerEngineFireIdle.spriteSheet = "./assets/sprites/player/engine/engine_idle.png";
  playerEngineFireIdle.anis.frameDelay = 8;
  playerEngineFireIdle.anis.looping = true;
  playerEngineFireIdle.addAnis({
    idle: { row: 0, frames: 4 },
  });
  playerEngineFireIdle.overlaps(allSprites); //makes the engine sprite overlap with all sprites. To make sure that there a no physics to the ship to not ruin hitboxes.

  new GlueJoint(player.sprite, playerEngineFireIdle); //glues the engine sprite to the player sprite
  new GlueJoint(player.sprite, shipBaseEngine); //glues the engine sprite to the player sprite

  playerHealth = player.maxHealth; //sets the player health to the max health.
  player.sprite.layer = 101; //sets the player sprite layer to 101 to make sure it is above the asteroid sprites.

  createBullet(500, 500); //to make sure there is a bullet in the bulletGroup array from the start to avoid crashes
}

//Used to move the player sprite and create bullets.
function playerMovement() {
  player.sprite.rotationLock = true; //locks the rotation of the player sprite to make sure it does not rotate.
  player.sprite.moveTowards(mouse, 0.1); //makes the player sprite move towards the mouse with a delay of 0.1s

  createBullet(player.sprite.x, player.sprite.y); //runs the createBullet function each frame.
}

//Function that creates a bullet.
function createBullet(x, y) {
  if (frameCount % player.reloadspeed === 0) {
    //checks if the framecount is divisible by the reloadspeed of the player. If so, it creates a bullet.
    bulletObject.base = new Sprite(x, y, 32, 32, "none");
    bulletObject.base.spriteSheet = mainProjectileImg;
    bulletObject.base.addAnis({
      base: { col: 1, frames: 4 },
    });
    bulletObject.base.vel.y = -3;

    bulletObject.group.add(bulletObject.base);
    bulletObject.group.width = 12;
    bulletObject.group.height = 16;
    bulletObject.base.life = 100;
    bulletObject.base.layer = 100;
    bulletGroup.push(bulletObject.base);
    gunShotSound.setVolume(0.3);
    gunShotSound.play();

    //Check if the bullet overlaps with any collider in the asteroid group
    bulletObject.base.overlaps(asteroidObject.group, bulletCollision);
  }
}

//Calculates what health sprite to show for the healthbar.
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
  } else if (healthProcent <= 0) {
    healthProcent = 0.06;
    updateLives(); //decreases the lives of the player by 1 when the health reaches 0 health.
  }

  healthBarSprite.changeAni("health" + healthProcent * 100); //changes the healthbar animation based on the health procent.
}

//Function that updates the lives of the player. Runs when the player health reaches 0.
//Also checks if the player has any lives left, otherwise gamOver() is ran.
function updateLives() {
  playerHealth = player.maxHealth;
  if (player.lives === 3) {
    player.lives = 2;
    livesSprite.changeAni("lives2");
    playerLoseLifeSound.play();
    player.sprite.img = playerMediumHealthImg;
  } else if (player.lives === 2) {
    player.lives = 1;
    livesSprite.changeAni("lives1");
    playerLoseLifeSound.play();
    player.sprite.img = playerLowHealthImg;
  } else {
    gameOver();
  }
}

//Check for what upgrades are bought and update the player stats accordingly
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
//Apply the new max health to the player
  playerHealth = player.maxHealth;
}
