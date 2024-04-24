function asteroidCollision() {
  
  //Go through each bullet and check with each asteroid if a collision occured.
  
    for(let asteroidIndex in asteroidColliderGroup){
      if(bulletObject.group.overlaps(asteroidColliderGroup[asteroidIndex])){
        asteroidBaseGroup[asteroidIndex].changeAni("explosion");
        killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
        asteroidBaseGroup.splice(asteroidIndex, 1);
        asteroidFlameGroup.splice(asteroidIndex, 1);
        asteroidColliderGroup.splice(asteroidIndex, 1);
    
        creditsValue = creditsValue+1;
      }
    }
  
  
  for(let asteroidIndex in asteroidBaseGroup){
    if(player.sprite.overlaps(asteroidColliderGroup[asteroidIndex])){
      if(player.sprite.overlaps(asteroidColliderGroup[asteroidIndex])){
        playerHealth -= 25;
        asteroidBaseGroup[asteroidIndex].changeAni("explosion");
        killAsteroid(asteroidBaseGroup[asteroidIndex], asteroidFlameGroup[asteroidIndex], asteroidColliderGroup[asteroidIndex]);
        asteroidBaseGroup.splice(asteroidIndex, 1);
        asteroidFlameGroup.splice(asteroidIndex, 1);
        asteroidColliderGroup.splice(asteroidIndex, 1);
       
      }
    }
}


}