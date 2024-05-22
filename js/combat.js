//Player collision with asteroid and bottom collider collision with asteroid
function asteroidCollision() {
  //assign asteroidindex to all asteroids and loop through
  for (let asteroidIndex in asteroidBaseGroup) {
    //If the player collides with an asteroid, reduce the player's health and remove the asteroid.
    if (player.sprite.overlaps(asteroidColliderGroup[asteroidIndex])) {
      if (player.sprite.overlaps(asteroidColliderGroup[asteroidIndex])) {
        playerHealth -= 50;
        asteroidBaseGroup[asteroidIndex].changeAni("explosion");
        killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
        asteroidBaseGroup.splice(asteroidIndex, 1);
        asteroidFlameGroup.splice(asteroidIndex, 1);
        asteroidColliderGroup.splice(asteroidIndex, 1);
        asteroidHealthGroup.splice(asteroidIndex, 1);
        if (playerHealth > 0) {
          playerDamageSound.play();
        }
      }
    }
  }
  //If the asteroid collides with the bottom collider, remove the asteroid.
  for (let asteroidIndex in asteroidBaseGroup) {
    if (asteroidBottomCollider.overlaps(asteroidColliderGroup[asteroidIndex])) {
      killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
      playerHealth -= 10;
      asteroidBaseGroup.splice(asteroidIndex, 1);
      asteroidFlameGroup.splice(asteroidIndex, 1);
      asteroidColliderGroup.splice(asteroidIndex, 1);
      asteroidHealthGroup.splice(asteroidIndex, 1);
      if (playerHealth > 0) {
        playerDamageSound.play();
      }
    }
  }
}

//Bulletcollision recieves the bullet and the asteroid that collided with the bullet.
function bulletCollision(hitBullet, hitAsteroid) {
  //Remove the bullet
  hitBullet.remove();

  //Look for the collider in the group of all asteroids colliders and remove the asteroid it belongs to.
  for (let asteroidIndex in asteroidBaseGroup) {
    if (hitAsteroid === asteroidColliderGroup[asteroidIndex]) {
      asteroidHealthGroup[asteroidIndex] -= player.damage;
      if (asteroidHealthGroup[asteroidIndex] <= 0) {
        asteroidBaseGroup[asteroidIndex].changeAni("explosion");
        //remove the asteroid Sprites from their groups
        killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
        //Splice the arrays
        asteroidBaseGroup.splice(asteroidIndex, 1);
        asteroidFlameGroup.splice(asteroidIndex, 1);
        asteroidColliderGroup.splice(asteroidIndex, 1);
        asteroidHealthGroup.splice(asteroidIndex, 1);
        progress.creditsValue = progress.creditsValue + creditGain;
        killCount = killCount + 1;
        asteroidExplosionSound.setVolume(0.1);
        asteroidExplosionSound.play();
        difficultyKillCounter = difficultyKillCounter + 1;
      } else {
        asteroidHitSound.play();
      }
    }
  }
}

//Function to kill the asteroid, it removes the base, flame and collider of the asteroid. Delay is added for animation to properly play.
async function killAsteroid(base, flame, collider) {
  flame.remove();
  collider.remove();
  await delay(600);
  base.remove();
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
  asteroidObject.collider.color = "blue";
  asteroidObject.collider.visible = false;

  asteroidObject.collider.overlaps(allSprites);
  let glue = new GlueJoint(asteroidObject.base, asteroidObject.collider);
  glue.visible = false;
  asteroidObject.base.vel.y = 6;

  asteroidObject.base.life = 1000;
  asteroidObject.flame.life = 1000;
  asteroidObject.collider.life = 1000;
  asteroidObject.base.layer = 99;
  asteroidObject.collider.layer = 99;
  asteroidObject.flame.layer = 99;

  asteroidBottomCollider = new Sprite(112, 360, 225, 1, "static");
  asteroidBottomCollider.overlaps(allSprites);
}
