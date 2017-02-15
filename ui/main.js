console.log('Loaded!');

// Code to change the HTML content from Javascript

var element = document.getElementById('body-text');
element.innerHTML = 'New Text changed by JavaScript';

//Code to move the Image to right..when it is clicked on

var img = document.getElementById('body-img');
img.onclick = function(){
    img.style.marginLeft = '150px';
};