function bulletCollision() {
  bulletObject.group.debug = true;
  asteroidObject.group.debug = true;
  if(asteroidObject.group.overlaps(bulletObject.group)){
    console.log("coll");
    asteroidObject.base.changeAni("explosion");
    asteroidObject.base.anis.looping = false;
    asteroidObject.base.anis.frameDelay = 6;
    killAsteroid(asteroidObject.base, asteroidObject.collider, asteroidObject.flame);
  }

}
