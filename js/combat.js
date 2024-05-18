function asteroidCollision() {
  for (let asteroidIndex in asteroidBaseGroup) {
    if (player.sprite.overlaps(asteroidColliderGroup[asteroidIndex])) {
      if (player.sprite.overlaps(asteroidColliderGroup[asteroidIndex])) {
        playerHealth -= 25;
        asteroidBaseGroup[asteroidIndex].changeAni("explosion");
        killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
        asteroidBaseGroup.splice(asteroidIndex, 1);
        asteroidFlameGroup.splice(asteroidIndex, 1);
        asteroidColliderGroup.splice(asteroidIndex, 1);
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
      asteroidBaseGroup[asteroidIndex].changeAni("explosion");
      killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
      asteroidBaseGroup.splice(asteroidIndex, 1);
      asteroidFlameGroup.splice(asteroidIndex, 1);
      asteroidColliderGroup.splice(asteroidIndex, 1);
      creditsValue = creditsValue + 1;
      killCount = killCount + 1;
      asteroidExplosionSound.play();
      difficultyKillCounter = difficultyKillCounter + 1;
    }
  }
}

async function killAsteroid(base, flame, collider) {
  flame.remove();
  collider.remove();
  await delay(600);
  base.remove();
}
