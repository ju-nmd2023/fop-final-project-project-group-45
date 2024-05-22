function toggleShop() {
    if (shopIsOpen) {
      shopIsOpen = false;
      bulletDamageLevelSprite.visible = false;
      bulletReloadSpeedLevelSprite.visible = false;
      playerHealthLevelSprite.visible = false;
      creditLevelSprite.visible = false;
    } else {
      shopIsOpen = true;
      bulletDamageLevelSprite.visible = true;
      bulletReloadSpeedLevelSprite.visible = true;
      playerHealthLevelSprite.visible = true;
      creditLevelSprite.visible = true;
    }
  }
  
  //Change prices depending on what upgrade level that player has
  function updatePrices() {
    if (progress.bulletDamageLevel === 0) {
      bulletDamageLevelSprite.changeAni("level0");
      priceDamageLevel = 10;
      priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
      console.log(progress.creditsLevel);
    }
    if (progress.bulletDamageLevel === 1) {
      bulletDamageLevelSprite.changeAni("level1");
      priceDamageLevel = 20;
      priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
    }
    if (progress.bulletDamageLevel === 2) {
      bulletDamageLevelSprite.changeAni("level2");
      priceDamageLevel = 30;
      priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
    }
    if (progress.bulletDamageLevel === 3) {
      bulletDamageLevelSprite.changeAni("level3");
      priceDamageLevel = 40;
      priceDamageLevelTextElement.innerHTML = "Price: " + priceDamageLevel;
    }
    if (progress.bulletDamageLevel === 4) {
      bulletDamageLevelSprite.changeAni("level4");
      priceDamageLevelTextElement.innerHTML = "MAX";
    }
    if (progress.bulletReloadSpeedLevel === 0) {
      bulletReloadSpeedLevelSprite.changeAni("level0");
      priceReloadSpeedLevel = 10;
      priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
    }
    if (progress.bulletReloadSpeedLevel === 1) {
      bulletReloadSpeedLevelSprite.changeAni("level1");
      priceReloadSpeedLevel = 20;
      priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
    }
    if (progress.bulletReloadSpeedLevel === 2) {
      bulletReloadSpeedLevelSprite.changeAni("level2");
      priceReloadSpeedLevel = 30;
      priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
    }
    if (progress.bulletReloadSpeedLevel === 3) {
      bulletReloadSpeedLevelSprite.changeAni("level3");
      priceReloadSpeedLevel = 40;
      priceReloadSpeedLevelTextElement.innerHTML = "Price: " + priceReloadSpeedLevel;
    }
    if (progress.bulletReloadSpeedLevel === 4) {
      bulletReloadSpeedLevelSprite.changeAni("level4");
      priceReloadSpeedLevelTextElement.innerHTML = "MAX";
    }
    if (progress.playerHealthLevel === 0) {
      playerHealthLevelSprite.changeAni("level0");
      priceHealthLevel = 10;
      priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
    }
    if (progress.playerHealthLevel === 1) {
      playerHealthLevelSprite.changeAni("level1");
      priceHealthLevel = 20;
      priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
    }
    if (progress.playerHealthLevel === 2) {
      playerHealthLevelSprite.changeAni("level2");
      priceHealthLevel = 30;
      priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
    }
    if (progress.playerHealthLevel === 3) {
      playerHealthLevelSprite.changeAni("level3");
      priceHealthLevel = 40;
      priceHealthLevelTextElement.innerHTML = "Price: " + priceHealthLevel;
    }
    if (progress.playerHealthLevel === 4) {
      playerHealthLevelSprite.changeAni("level4");
      priceHealthLevelTextElement.innerHTML = "MAX";
    }
    if (progress.creditsLevel === 0) {
      creditLevelSprite.changeAni("level0");
      priceCreditsLevel = 100;
      priceCreditsLevelTextElement.innerHTML = "Price: " + priceCreditsLevel;
    }
    if (progress.creditsLevel === 1) {
      creditLevelSprite.changeAni("level1");
      priceCreditsLevelTextElement.innerHTML = "MAX";
    }
  }
  
  //Depending on what upgrade button is pressed, the function recieves a string and checks if the player has enough credits to buy the upgrade.
  function upgradeButton(upgrade) {
    if (upgrade === "damage") {
      if (progress.creditsValue >= priceDamageLevel && progress.bulletDamageLevel < 4) {
        progress.bulletDamageLevel++;
        progress.creditsValue = progress.creditsValue - priceDamageLevel;
      }
    }
    if (upgrade === "firerate") {
      if (progress.creditsValue >= priceReloadSpeedLevel && progress.bulletReloadSpeedLevel < 4) {
        progress.bulletReloadSpeedLevel++;
        progress.creditsValue = progress.creditsValue - priceReloadSpeedLevel;
      }
    }
    if (upgrade === "health") {
      if (progress.creditsValue >= priceHealthLevel && progress.playerHealthLevel < 4) {
        progress.playerHealthLevel++;
        progress.creditsValue = progress.creditsValue - priceHealthLevel;
      }
    }
    if (upgrade === "doubleCredits") {
      if (progress.creditsValue >= priceCreditsLevel && progress.creditsLevel < 1) {
        progress.creditsLevel++;
        progress.creditsValue = progress.creditsValue - priceCreditsLevel;
      }
    }
  }