console.log('Loaded!');

var counter = 0;
var button = document.getElementById('count-button');

button.onclick = function()
{
    
    // Create a request
    var request = new XMLHttpRequest();
    
    // Get the response and store it in a variable
    request.onreadystatechange = function(){
        if (request.readyState === XMLHttpRequest.DONE){
            if (request.status === 200){
                //Take action
                var counter = request.responseText; // Response value accessed as Text
                var span = document.getElementById('count-span');
                span.innerHTML = counter.toString();  // Update the value of the Span element in the page
            }
        }
    };
    
    //Make the request
    
    request.open('GET', 'http://padmasaravan.imad.hasura-app.io/counter', true);
    request.send(null);
 };

/* Code to change the HTML content from Javascript

var element = document.getElementById('body-text');
element.innerHTML = 'New Text changed by JavaScript';

*/

/* Code to move the Image to right..when it is clicked on

var img = document.getElementById('body-img');
var marginLeft =0;

img.onclick = function(){
    var interval = setInterval(moveRight,50);  // call the moveRight funtion every 50ms
    function moveRight(){
        if(marginLeft == 900){
            clearInterval(interval); //Stop the timer
        }else{
            marginLeft = marginLeft + 1;
            img.style.marginLeft = marginLeft + 'px';
        }
    } // End of moveRight fucntion
}; // End of function
*/