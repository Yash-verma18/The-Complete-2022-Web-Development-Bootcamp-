// Detecting Buttons based on which button you Clicked on.

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);

        buttonAnimation(buttonInnerHTML);
    });

}

// Detecting Keyboard Press based on which button you pressed on your keyboard.
// If keyboard pressed is detected i will trigger this anonymous function. which
// is going to call the makeSound function where its gonna pass the key that i have pressed.


document.addEventListener("keydown", function(event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "w":
            var tom1 = new Audio('./sounds/tom-1.mp3');
            tom1.play();
            break;

        case "a":
            var tom2 = new Audio('./sounds/tom-2.mp3');
            tom2.play();
            break;

        case "s":
            var tom3 = new Audio('./sounds/tom-3.mp3');
            tom3.play();
            break;

        case "d":
            var tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;

        case "j":
            var snare = new Audio('./sounds/snare.mp3');
            snare.play();
            break;

        case "k":
            var crash = new Audio('./sounds/crash.mp3');
            crash.play();
            break;

        case "l":
            var kick = new Audio('./sounds/kick-bass.mp3');
            kick.play();
            break;


        default:
            console.log(buttonInnerHTML);

    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function() { activeButton.classList.remove("pressed"); }, 100);
}





// constructor function
// function BellBoy(name, age, hasWorkPermit, languages) {
//   this.name = name;
//   this.age = age;
//   this.hasWorkPermit = hasWorkPermit;
//   this.languages = languages;
// }
//
// var bellBoy1 = new BellBoy("timmy", 19,true,["French","English"]);
//
// constructor function
// function HouseKeeper(yearsOfExperience, name, cleaningRepertoire) {
//   this.yearsOfExperience = yearsOfExperience;
//   this.name = name;
//   this.cleaningRepertoire = cleaningRepertoire;
//   this.cleaningFunc = function(){
//     alert("Cleaning in progress");
//   }
// }

// var houseKeeper1 = new HouseKeeper(19, "kantaBai", ["bedroom","utensils","moping","clothes"] );


// function anotherAddEventListener(typeOfEvent, callback){
//
//   // Now this function detects what type of event happened and how i am gonna respond to it.
//   // This object "eventThatHapened" will capture number of things about that event
//   var eventThatHappened = {
//     eventType : "keydown",
//     key : "p",
//     durationOfKeypress : 2
//   }
//
// if(eventThatHappened.eventType == typeOfEvent){
//     callback(eventThatHappened);
// }
// }
//
// anotherAddEventListener("keydown", function(event){
//   console.log(event);
// })
//
//
// documnent.addEventListener("keydown", function(event){
//   console.log(event)
// })