console.log('Loaded!');

// Code to change the HTML content from Javascript

var element = document.getElementById('body-text');
element.innerHTML = 'New Text changed by JavaScript';

//Code to move the Image to right..when it is clicked on

var img = document.getElementById('body-img');
var marginLeft =0;

img.onclick = function(){
    var interval = setInterval(moveRight,50);  // call the moveRight funtion every 50ms
    function moveRight(){
        if(marginLeft <=50){
            marginLeft = marginLeft + 5;
            img.style.marginLeft = marginLeft + 'px';
        }else{
            clearInterval(interval); //Stop the timer
        }
    } // End of moveRight fucntion
}; // End of function