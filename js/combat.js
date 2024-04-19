function bulletCollision() {
  if (bulletObject.collider.overlaps(asteroidObject.collider)) {
    console.log("collision");
    asteroidObject.base.changeAni("explosion");
    asteroidObject.base.anis.looping = false;
    asteroidObject.base.anis.frameDelay = 6;
    killAsteroid(asteroidObject.base, asteroidObject.collider, asteroidObject.flame);
  }
}
