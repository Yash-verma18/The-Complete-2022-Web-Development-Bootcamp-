
document.querySelector("button").addEventListener("click", diceGame);


function diceGame(){
  var randomnum1 = Math.floor(Math.random() * 6) + 1;

  var randomDiceImage = "dice"+ randomnum1 + ".png"; // "dice1.png"

  var randomImageSrc = "./images/" + randomDiceImage; // "./images/dice1.png"

  document.querySelector(".dice .img1").setAttribute("src", randomImageSrc);

  // For dice 2
  var randomnum2 = Math.floor(Math.random() * 6) + 1;

  document.querySelector(".dice .img2").setAttribute("src", "./images/dice"+ randomnum2 + ".png");


  if(randomnum1==randomnum2){
    document.querySelector("h1").innerHTML = "DRAW!"
  }
  else if(randomnum1>randomnum2){
    document.querySelector("h1").innerHTML = "PLAYER 1 WINS"
  }
  else{
    document.querySelector("h1").innerHTML = "PLAYER 2 WINS"
  }
}
