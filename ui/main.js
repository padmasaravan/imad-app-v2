console.log('Loaded!');

// Code to change the HTML content from Javascript

var element = document.getElementById('body-text');
element.innerHTML = 'New Text changed by JavaScript';

//Code to move the Image to right..when it is clicked on

var img = document.getElementById('body-img');
var marginLeft =0;
var moveRight = function(){
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
};
img.onclick = function()
    var interval = setInterval(moveRight,5);
    //img.style.marginLeft = '150px';
}