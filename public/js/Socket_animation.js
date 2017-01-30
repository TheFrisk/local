var myElement = document.getElementById('gesture_zone');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// listen to events...
mc.on("panleft panright tap press", function(ev) {
    myElement.textContent = ev.type +" gesture detected.";
    console.log(myElement.textContent);
});
