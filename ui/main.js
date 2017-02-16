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
        if(marginLeft == 650){
            clearInterval(interval); //Stop the timer
        }else{
            marginLeft = marginLeft + 5;
            img.style.marginLeft = marginLeft + 'px';
        }
    } // End of moveRight fucntion
}; // End of function