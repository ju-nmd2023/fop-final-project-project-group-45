function playerMovement() {
    player.sprite.rotationLock = true;
    player.sprite.moveTowards(mouse, 0.1);
  
    //shooting
  
    
  }

  function playerCollision() {
    asteroidObject.base.vel.y = 1.6;
    if (player.sprite.overlaps(asteroidObject.collider)) {
      console.log("collision");
      asteroidObject.base.changeAni("explosion");
      asteroidObject.base.anis.looping = false;
      asteroidObject.base.anis.frameDelay = 6;
      killAsteroid(asteroidObject.base, asteroidObject.collider, asteroidObject.flame);
      playerHealth -= 25;
    }
    if (canvasBottomCollider.overlapped(asteroidObject.collider)) {
      asteroidObject.base.remove();
      asteroidObject.collider.remove();
      asteroidObject.flame.remove();
      print("hit");
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