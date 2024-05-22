//Buttons Class is created
class Button {
  
    constructor(width, height, text, type, onclick, sound) { //Constructor method
      this.width = width;
      this.height = height;
      this.text = text;
      this.type = type;
      this.onclick = onclick;
      this.backgroundColor = "rgba(0,0,0,0)";
      this.sound = sound;
    }
  
    //draw method is created to draw different buttons depending on which type they're set as
    draw() {
      //A standard div and p element is created for the button
      let button = document.createElement("div");
      let textElement = document.createElement("p");
      textElement.innerHTML = this.text;
  
      //Depending on the type of button it is assigned different css classes and appended to different containers
      if (this.type === "startScreenButton") {
        document.querySelector("#startButtonGridContainer").appendChild(button);
        button.classList.add("startScreenButton");
      }
      if (this.type === "pauseScreenButton") {
        //draw pause screen button
        document.querySelector("#pauseButtonGridContainer").appendChild(button);
        button.classList.add("pauseScreenButton");
        button.style.backgroundColor = this.backgroundColor;
      }
      if (this.type === "alertScreenExitButton") {
        //draw exit button
        document.querySelector("#alertBoxExitButtonGrid").appendChild(button);
        button.classList.add("alertBoxButton");
        button.style.backgroundColor = this.backgroundColor;
      }
      if (this.type === "alertScreenResetButton") {
        //draw reset button
        document.querySelector("#alertBoxResetButtonGrid").appendChild(button);
        button.classList.add("alertBoxButton");
        button.style.backgroundColor = this.backgroundColor;
      }
      if (this.type === "gameOverButton") {
        //draw exit button
        document.querySelector("#gameOverContainer").appendChild(button);
        button.classList.add("gameOverButton");
        button.style.backgroundColor = this.backgroundColor;
      }
      if (this.type === "launchButton") {
        //draw launch game button
        document.querySelector("#launchButtonGridContainer").appendChild(button);
        button.classList.add("startScreenButton");
      }
  
      if (this.type == "shopButton") {
        document.querySelector("#shopGrid").appendChild(button);
        button.classList.add("shopScreenButton");
        button.style.backgroundColor = this.backgroundColor;
      }
      if (this.type == "exitShopButton") {
        document.querySelector("#shopScreenContainer").appendChild(button);
        button.classList.add("shopExitButton");
        button.style.backgroundColor = this.backgroundColor;
      }
      if (this.type == "resetProgress") {
        document.querySelector("#startButtonGridContainer").appendChild(button);
        button.classList.add("startScreenButton");
      }
  
      //The button is styled and assigned an onclick function
      button.setAttribute("onclick", this.onclick);
      button.appendChild(textElement);
      button.style.width = this.width + "px";
      button.style.height = this.height + "px";
    }
  }
  //A redbutton class is created that extends the button class, this is for buttons that have the unique red background color.
  class Redbutton extends Button { 
    constructor(width, height, text, type, onclick) {
      super(width, height, text, type, onclick);
      this.backgroundColor = "rgba(255,0,0,1)";
    }
  }