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
        progress.creditsValue = progress.creditsValue + 1;
        killCount = killCount + 1;
        asteroidExplosionSound.setVolume(0.3);
        asteroidExplosionSound.play();
        difficultyKillCounter = difficultyKillCounter + 1;
      } else {
        asteroidBaseGroup[asteroidIndex].changeAni("hit");
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
